"use strict"
const fs = require("fs-extra")
const J = require("../common.js")
const R = require("ramda")
const lwip = require("lwip")
const imagemin = require("./imagemin")
const download = require("download")
const env = require("dotenv-helper")
const imageSize = require("probe-image-size")
const imgur = require("imgur")
imgur.setCredentials("deyan8284@gmail.com", env.getEnv("imgurPassword"), env.getEnv("imgur"))
function nameFn(str, glue = "-") {
    return R.compose(R.toLower, R.join(glue), R.take(4),
    J.shuffle, R.map(val=>J.removePunctuation(val)),
    R.filter(val=>val.length > 2), R.split(" "), J.removePunctuation)(str)
}
function imageDestination(url, name) {
    return R.compose(R.apply(val => `${__dirname}/tmp/${name}.${val}`), R.of, R.last, R.split("."))(url)
}
function uploadImgur(fileLocation) {
    return new Promise(resolve=>{
        imgur.uploadFile(fileLocation).then(incoming=>{
            resolve(incoming.data.link)
        }).catch(()=> {resolve(null)})
    })
}
function main(data) {
    let imageSrc = data.imageSrc
    let newImageName = nameFn(data.enPart)
    let altTag = nameFn(data.enPart, " ")
    return new Promise(resolve =>{
        let width
        let height
        if (!imageSrc.includes(".jpg") && !imageSrc.includes(".png")) {resolve(null)}
        imageSize(imageSrc, (err, result) =>{
            if (result === undefined) {return resolve(null)}
            width = result.width
            height = result.height
            download(imageSrc).then(imageData=>{
                let currentDestination = imageDestination(imageSrc, `${newImageName}Pre`)
                let finalDestination = imageDestination(imageSrc, newImageName)
                fs.writeFileSync(currentDestination, imageData)
                imagemin.main(currentDestination).then(()=>{
                    lwip.open(currentDestination, (err, lwipImage)=>{
                        if (width >= 1000) {
                            console.log(7, width)
                            lwipImage.batch()
                            .contain(1000, 750, {r: 176, g: 190, b: 197, a: 100})
                            .writeFile(finalDestination, (err)=>{
                                uploadImgur(finalDestination).then(imageSrc =>{
                                    resolve({imageSrc, imageSrcOrigin: data.imageSrc, altTag})
                                    fs.removeSync(currentDestination)
                                    fs.removeSync(finalDestination)
                                })
                            })
                        } else {
                            let scaleX = 1000 / width
                            let scaleY = 750 / height
                            if (scaleX < scaleY) {
                                lwipImage.batch()
                                .resize(1000, scaleX * height)
                                .contain(1000, 750, {r: 176, g: 190, b: 197, a: 100})
                                .writeFile(finalDestination, (err)=>{
                                    uploadImgur(finalDestination).then(imageSrc =>{
                                        resolve({imageSrc, imageSrcOrigin: data.imageSrc, altTag})
                                        fs.removeSync(currentDestination)
                                        fs.removeSync(finalDestination)
                                    })
                                })
                            } else {
                                lwipImage.batch()
                                .resize(scaleY * width, 750)
                                .contain(1000, 750, {r: 176, g: 190, b: 197, a: 100})
                                .writeFile(finalDestination, (err)=>{
                                    uploadImgur(finalDestination).then(imageSrc =>{
                                        resolve({imageSrc, imageSrcOrigin: data.imageSrc, altTag})
                                        fs.removeSync(currentDestination)
                                        fs.removeSync(finalDestination)
                                    })
                                })
                            }
                        }
                    })
                })
            })
        })
    })
}

function blog(data) {
    let imageSrc = data.imageSrc
    let newImageName = data.altTag
    return new Promise(resolve =>{
        let width
        let height
        if (!imageSrc.includes(".jpg") && !imageSrc.includes(".png")) {resolve(null)}
        imageSize(imageSrc, (err, result) =>{
            if (result === undefined) {return resolve(null)}
            width = result.width
            height = result.height
            download(imageSrc).then(imageData=>{
                let currentDestination = imageDestination(imageSrc, `${newImageName}Pre`)
                let finalDestination = imageDestination(imageSrc, newImageName)
                fs.writeFileSync(currentDestination, imageData)
                imagemin.main(currentDestination).then(()=>{
                    if (width > 800) {
                        lwip.open(currentDestination, (err, lwipImage)=>{
                            lwipImage.batch().resize(800, Math.floor((800 / width) * height))
                            .writeFile(finalDestination, (err)=>{
                                uploadImgur(finalDestination).then(imageSrc =>{
                                    resolve({imageSrc, imageSrcOrigin: data.imageSrc, altTag: newImageName})
                                    fs.removeSync(currentDestination)
                                    fs.removeSync(finalDestination)
                                })
                            })
                        })
                    } else {
                        uploadImgur(currentDestination).then(imageSrc =>{
                            resolve({imageSrc, imageSrcOrigin: data.imageSrc, altTag: newImageName})
                            fs.removeSync(currentDestination)
                        })
                    }
                })
            })
        })
    })
}

module.exports.main = main
module.exports.blog = blog
