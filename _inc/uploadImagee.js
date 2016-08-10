"use strict"
const fs = require("fs-extra")
const J = require("../common.js")
const R = require("ramda")
const lwip = require("lwip")
const download = require("download")
const imgur = require("imgur")
const env = require("dotenv-helper")
const memeMaker = require("meme-maker")
function nameFn(str) {
    return R.compose(R.toLower, R.join("-"), R.take(4), J.shuffle, R.filter(val=>val.length > 2), R.split(" "), J.removePunctuation)(str)
}
function createMeme(srcPath, topText, bottomText) {
    return new Promise(resolve =>{
        let fontSize = topText.length > 50 || bottomText.length > 50 ? 30 : 46
        let options = {
            image: srcPath,
            outfile: R.replace("Dropbox/images", "Dropbox/memes", srcPath),
            topText,
            bottomText,
            fontSize,
            fontFill: "#FFF",
            textPos: "center",
            strokeColor: "#000",
            strokeWeight: 2
        }
        memeMaker(options, (error)=>{
            if (error) {console.error(error)}
            resolve(true)
        })
    })
}

const imageSize = require("probe-image-size")
const imageSavePath = "/home/just/Dropbox/images"
const memeSavePath = "/home/just/Dropbox/memes"
imgur.setCredentials("deyan8284@gmail.com", env.getEnv("imgurPassword"), env.getEnv("imgur"))
function imageDestination(url, name) {
    return R.compose(R.apply(val => `${imageSavePath}/${name}.${val}`), R.of, R.last, R.split("."))(url)
}
function uploadImgur(fileLocation) {
    return new Promise(resolve=>{
        imgur.uploadFile(fileLocation).then(incoming=>{
            resolve(incoming.data.link)
        }).catch(()=> {resolve(null)})
    })
}
function main(dataObj) {
    let imageSrc = dataObj.imageSrc
    let newImageName = nameFn(dataObj.enPart)
    J.log(imageSrc)
    J.log(newImageName)
    return new Promise(resolve =>{
        let width
        let height
        if (!imageSrc.includes(".jpg") && !imageSrc.includes(".png")) {resolve(null)}
        imageSize(imageSrc, (err, result) =>{
            J.log(result)
            if (result === undefined) {return resolve(false)}
            width = result.width
            height = result.height
            download(imageSrc).then(data=>{
                let currentDestination = imageDestination(imageSrc, `${newImageName}Pre`)
                let finalDestination = imageDestination(imageSrc, newImageName)
                fs.writeFileSync(currentDestination, data)
                lwip.open(currentDestination, (err, image)=>{
                    if (width >= 1000) {
                        image.batch()
                        .contain(1000, 750, {r: 176, g: 190, b: 197, a: 100})
                        .writeFile(finalDestination, (err)=>{
                            fs.removeSync(currentDestination)
                            uploadImgur(finalDestination).then(incoming =>{
                                createMeme(finalDestination, dataObj.enPart, dataObj.dePart).then(()=>{
                                    resolve({imageSrc: incoming, imageName: newImageName})
                                })
                            })
                        })
                    } else {
                        let scaleX = 1000 / width
                        let scaleY = 750 / height
                        if (scaleX < scaleY) {
                            image.batch()
                            .resize(1000, scaleX * height)
                            .contain(1000, 750, {r: 176, g: 190, b: 197, a: 100})
                            .writeFile(finalDestination, (err)=>{
                                fs.removeSync(currentDestination)
                                uploadImgur(finalDestination).then(incoming =>{
                                    createMeme(finalDestination, dataObj.enPart, dataObj.dePart).then(()=>{
                                        resolve({imageSrc: incoming, imageName: newImageName})
                                    })
                                })
                            })
                        } else {
                            image.batch()
                            .resize(scaleY * width, 750)
                            .contain(1000, 750, {r: 176, g: 190, b: 197, a: 100})
                            .writeFile(finalDestination, (err)=>{
                                fs.removeSync(currentDestination)
                                uploadImgur(finalDestination).then(incoming =>{
                                    createMeme(finalDestination, dataObj.enPart, dataObj.dePart).then(()=>{
                                        resolve({imageSrc: incoming, imageName: newImageName})
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
