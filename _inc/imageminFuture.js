const imagemin = require("imagemin")
const imageminMozjpeg = require("imagemin-mozjpeg")
const imageminPngquant = require("imagemin-pngquant")
const imageminJpegoptim = require("imagemin-jpegoptim")
const imageminWebp = require("imagemin-webp")
const imageminJpegtran = require('imagemin-jpegtran')
const imageminOptipng = require('imagemin-optipng')
const imageminPngcrush = require('imagemin-pngcrush')
const J = require("../common")
let defaults = {
    jpegoptim: {progressive:true, max:80, size: "80%"},
    webp: {present:"photo", alphaQuality:80, method: 6, lossless:true},
    jpegtran: {progressive:true, arithmetic:true},
    optipng: {optimizationLevel:7},
    pngcrush: {reduce:true}
}
function main(imagePath) {
    return new Promise(resolve=>{
        imagemin([imagePath], J.getFileDirectory(imagePath), {
            plugins: [
                imageminMozjpeg({progressive: true, notrellis: true, fastcrush:true, quality:100}),
                imageminPngquant({quality: "65-80"})
            ]
        }).then(() => {
            resolve(true)
        })
    })
}
function all(imagePath, destination = J.getFileDirectory(imagePath)) {
    return new Promise(resolve=>{
        imagemin([imagePath], destination, {
            plugins: [
                imageminMozjpeg({progressive: true, notrellis: true, fastcrush:true, quality:100}),
                imageminPngquant({quality: "65-80"}),
                imageminJpegoptim(defaults.jpegoptim),
                imageminWebp(defaults.webp),
                imageminJpegtran(defaults.jpegtran),
                imageminOptipng(defaults.optipng),
                imageminPngcrush(defaults.pngcrush)
            ]
        }).then(() => {
            resolve(true)
        })
    })
}
function jpegoptim(imagePath, options = defaults.jpegoptim, destination = J.getFileDirectory(imagePath)) {
    return new Promise(resolve=>{
        imagemin([imagePath], destination, {
            plugins: [
                imageminJpegoptim(options)
            ]
        }).then(() => {
            resolve(true)
        })
    })
}
function webp(imagePath, options = defaults.webp, destination = J.getFileDirectory(imagePath)) {
    return new Promise(resolve=>{
        imagemin([imagePath], destination, {
            plugins: [
                imageminWebp(options)
            ]
        }).then(() => {
            resolve(true)
        })
    })
}
function jpegtran(imagePath, options = defaults.jpegtran,destination = J.getFileDirectory(imagePath)) {
    return new Promise(resolve=>{
        imagemin([imagePath], destination, {
            plugins: [
                imageminJpegtran(options)
            ]
        }).then(() => {
            resolve(true)
        })
    })
}
function optipng(imagePath, options = defaults.optipng,destination = J.getFileDirectory(imagePath)) {
    return new Promise(resolve=>{
        imagemin([imagePath], destination, {
            plugins: [
                imageminOptipng(options)
            ]
        }).then(() => {
            resolve(true)
        })
    })
}
function pngcrush(imagePath, options = defaults.pngcrush,destination = J.getFileDirectory(imagePath)) {
    return new Promise(resolve=>{
        imagemin([imagePath], destination, {
            plugins: [
                imageminPngcrush(options)
            ]
        }).then(() => {
            resolve(true)
        })
    })
}
module.exports.main = main
module.exports.all = all
module.exports.jpegoptim = jpegoptim
module.exports.webp = webp
module.exports.jpegtran = jpegtran
module.exports.optipng = optipng
module.exports.pngcrush = pngcrush
