"use strict"
const fs = require("fs-extra")
const scrapeIt = require("scrape-it")
const cheerio = require("cheerio")
const fetch = require("node-fetch")
const request = require("request")
const J = require("justdo")
const R = require("ramda")

//const probe = require("probe-image-size") probe(url).then(imageSize=>{})
const env = require("dotenv-helper")
const imgur = require("imgur")
const download = require("download")
imgur.setCredentials("deyan8284@gmail.com", env.getEnv("imgurPassword"), env.getEnv("imgur"))
const uploadDir = "/home/just/Dropbox/images"
download("http://i.imgur.com/mx9H9VY.png", uploadDir).then((a) => {
    console.log(a, "done!")
})
function imageFirst(keyword) {
    //http://images.freeimages.com/images/previews/763/sniffing-cat-1398165.jpg
    //http://images.freeimages.com/images/thumbs/763/sniffing-cat-1398165.jpg
    return new Promise((resolve) => {
        fetch(`http://www.freeimages.com/search/${keyword}?free=1`).then((res)=>{
            if (res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
                let $ = cheerio.load(data)
                let willReturn = []
                let selector = ".thumb-img img"
                $(selector).each(function(i) {
                    willReturn.push($(this).attr("src"))
                })
                resolve(willReturn)
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
function upload(url) {
    return new Promise(resolve=>{
        imgur.uploadUrl(url).then(function (json) {
            resolve(json.data.link)
        })
    })
}
function imageSecond(keyword) {
    //https://static.pexels.com/photos/4602/jumping-cute-playing-animals-medium.jpg
    //https://static.pexels.com/photos/4602/jumping-cute-playing-animals-large.jpg
    return new Promise((resolve)=>{
        fetch(`https://www.pexels.com/search/${keyword}`).then((res)=>{
            if (res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
                let $ = cheerio.load(data)
                let willReturn = []
                let selector = "article.photo-item a img"
                $(selector).each(function(i) {
                    J.lg($(this).attr("src"))
                    J.log($(this).html())
                    willReturn.push($(this).attr("src"))
                })
                resolve(willReturn)
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
function will() {
    return new Promise((resolve)=>{

    })
}
