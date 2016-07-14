"use strict"
const fs = require("fs-extra")
const scrapeIt = require("scrape-it")
const cheerio = require("cheerio")
const fetch = require("node-fetch")
const request = require("request")
const J = require("justdo")
const R = require("ramda")
const lwip = require("lwip")
const download = require("download")
const imgur = require("imgur")
const imageSize = require("image-size")
const imageSavePath = "/home/just/Dropbox/images"
//lwip.open("hot/inc/cat.jpg", function(err, image) {
//image.batch()
////.resize(1400)
////.contain(1000, 700, {r: 128, g: 128, b: 128, a: 100})
//.writeFile("output.jpg", function(err) {
//J.log(err)
//})
//})
let imageUrl = "http://i.imgur.com/mx9H9VY.png"
function imageDestination(url, name) {
    return R.compose(R.apply(val => `${imageSavePath}/${name}.${val}`), R.of, R.last, R.split("."))(url)
}
let newImageName = "cat-a-rey"
download(imageUrl).pipe(fs.createWriteStream(imageDestination(imageUrl, newImageName)))
