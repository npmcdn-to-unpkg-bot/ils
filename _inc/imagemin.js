const imagemin = require("imagemin")
const imageminMozjpeg = require("imagemin-mozjpeg")
const imageminPngquant = require("imagemin-pngquant")
const J = require("../common")

function main(imagePath) {
    return new Promise(resolve=>{
        imagemin([imagePath], J.getFileDirectory(imagePath), {
            plugins: [
                imageminMozjpeg({progressive: true, notrellis: true, fastcrush:true, quality:85}),
                imageminPngquant({quality: "65-80"})
            ]
        }).then(() => {
            resolve(true)
        })
    })
}

module.exports.main = main
