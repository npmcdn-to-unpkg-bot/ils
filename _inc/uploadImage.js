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
    return R.compose(R.toLower, R.join("-"), R.take(4),
    J.shuffle, R.map(val=>J.removePunctuation(val)),
    R.filter(val=>val.length > 2), R.split(" "), J.removePunctuation)(str)
}
function createMeme(srcPath, outPath, topText, bottomText) {
    return new Promise(resolve =>{
        let fontSize = topText.length > 50 || bottomText.length > 50 ? 30 : 46
        let options = {
            image: srcPath,
            outfile: outPath,
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
const imageSavePath = `${__dirname}/tmp`
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
function main(data) {
    let imageSrc = data.imageSrc
    let newImageName = nameFn(data.enPart)
    return new Promise(resolve =>{
        let width
        let height
        if (!imageSrc.includes(".jpg") && !imageSrc.includes(".png")) {resolve(null)}
        imageSize(imageSrc, (err, result) =>{
            console.log(result)
            if (result === undefined) {return resolve(null)}
            width = result.width
            height = result.height
            download(imageSrc).then(imageData=>{
                console.log(width)
                let currentDestination = imageDestination(imageSrc, `${newImageName}Pre`)
                let finalDestination = imageDestination(imageSrc, newImageName)
                fs.writeFileSync(currentDestination, imageData)
                lwip.open(currentDestination, (err, lwipImage)=>{
                    if (width >= 1000) {
                        lwipImage.batch()
                        .contain(1000, 750, {r: 176, g: 190, b: 197, a: 100})
                        .writeFile(finalDestination, (err)=>{
                            uploadImgur(finalDestination).then(imageSrc =>{
                                resolve({imageSrc, originalSrc: data.imageSrc, name: newImageName})
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
                                    resolve({imageSrc, originalSrc: data.imageSrc, name: newImageName})
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
                                    resolve({imageSrc, originalSrc: data.imageSrc, name: newImageName})
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
}

module.exports.main = main
