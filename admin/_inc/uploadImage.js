"use strict"
const fs = require("fs-extra")
const J = require("justdo")
const R = require("ramda")
const lwip = require("lwip")
const download = require("download")
const imgur = require("imgur")
const env = require("dotenv-helper")
const imageSize = require("probe-image-size")
const imageSavePath = "/home/just/Dropbox/images"
imgur.setCredentials("deyan8284@gmail.com", env.getEnv("imgurPassword"), env.getEnv("imgur"))
function imageDestination(url, name) {
    return R.compose(R.apply(val => `${imageSavePath}/${name}.${val}`), R.of, R.last, R.split("."))(url)
}
function uploadImgur(fileLocation){
    return new Promise(resolve=>{
        imgur.uploadFile(fileLocation).then(incoming=>{
            resolve(incoming.data.link)
        }).catch(()=> {resolve(null)})
    })
}
function main(imageUrl, newImageName = "iMeanNothing"){
    return new Promise(resolve =>{
        let width
        let height
        if(!imageUrl.includes(".jpg")&&!imageUrl.includes(".png")){resolve(null)}
        imageSize(imageUrl,  (err, result) =>{
            width= result.width
            height= result.height
            download(imageUrl).then(data=>{
                let currentDestination = imageDestination(imageUrl, `${newImageName}Pre`)
                let finalDestination = imageDestination(imageUrl, newImageName)
                J.log(currentDestination)
                J.log(finalDestination)
                fs.writeFileSync(currentDestination, data)
                lwip.open(currentDestination, (err, image)=>{
                    if(width>=1000){
                        image.batch()
                        .contain(1000, 750, {r: 176, g: 190, b: 197, a: 100})
                        .writeFile(finalDestination, (err)=>{
                            fs.removeSync(currentDestination)
                            J.log(err,"0")
                            uploadImgur(finalDestination).then(incoming =>{
                                J.log(incoming)
                                resolve({
                                    url: incoming,
                                    width: width,
                                    height: height
                                })
                            })
                        })
                    }else{
                        let scaleX = 1000/width
                        let scaleY = 750/height
                        if(scaleX<scaleY){
                            image.batch()
                            .resize(1000, scaleX*height)
                            .contain(1000, 750, {r: 176, g: 190, b: 197, a: 100})
                            .writeFile(finalDestination, (err)=>{
                                fs.removeSync(currentDestination)
                                J.log(err,"1")
                                uploadImgur(finalDestination).then(incoming =>{
                                    resolve({
                                        url: incoming,
                                        width: width,
                                        height: height
                                    })
                                })
                            })
                        }else{
                            image.batch()
                            .resize(scaleY*width,750)
                            .contain(1000, 750, {r: 176, g: 190, b: 197, a: 100})
                            .writeFile(finalDestination, (err)=>{
                                fs.removeSync(currentDestination)
                                J.log(err,"2")
                                uploadImgur(finalDestination).then(incoming =>{
                                    resolve({
                                        url: incoming,
                                        width: width,
                                        height: height
                                    })
                                })
                            })
                        }
                    }
                })
            })
        })
    })
}
module.exports.main = main
