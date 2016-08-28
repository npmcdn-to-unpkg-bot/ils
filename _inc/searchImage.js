"use strict"
const scrapeIt = require("scrape-it")
const cheerio = require("cheerio")
const fetch = require("node-fetch")
const request = require("request")
const J = require("../common.js")
const R = require("ramda")
const env = require("dotenv-helper")
const Bing = require("node-bing-api")({ accKey: env.getEnv("bing") })
function imageFirst(keyword, searchLimit = 30) {
    return new Promise((resolve)=>{
        Bing.images(keyword, {
            top: searchLimit,
            imageFilters: {
                size: "large",
                color: "color",
                aspect : "wide"
            }
        }, (error, res, body)=>{
            if (R.path(["d", "results"], body)) {
                let willReturn = []
                body.d.results.map((val)=>{
                    willReturn.push({
                        imageThumb: val.MediaUrl,
                        imageSrc: val.MediaUrl
                    })
                })
                resolve(willReturn)
            } else {
                resolve(null)
            }
        })
    })
}
function imageSecond(keyword, searchLimit = 40) {
    return new Promise((resolve)=>{
        Bing.images(keyword, {
            top: searchLimit,
            imageFilters: {
                size: "large",
                color: "color"
            }
        }, (error, res, body)=>{
            if (R.path(["d", "results"], body)) {
                let willReturn = []
                body.d.results.map((val)=>{
                    willReturn.push({
                        imageThumb: val.MediaUrl,
                        imageSrc: val.MediaUrl
                    })
                })
                resolve(willReturn)
            } else {
                resolve(null)
            }
        })
    })
}
function not(keyword) {
    //http://images.freeimages.com/images/previews/763/sniffing-cat-1398165.jpg
    //http://images.freeimages.com/images/thumbs/763/sniffing-cat-1398165.jpg
    return new Promise((resolve) => {
        fetch(`http://www.freeimages.com/search/${encodeURI(keyword)}?free=1`).then((res)=>{
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
                    let imageThumb = $(this).attr("src")
                    willReturn.push({
                        imageThumb: imageThumb,
                        imageSrc: R.replace("thumbs", "previews", imageThumb)
                    })
                })
                resolve(willReturn)
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
function alsoNot(keyword) {
    //https://static.pexels.com/photos/4602/jumping-cute-playing-animals-medium.jpg
    //https://static.pexels.com/photos/4602/jumping-cute-playing-animals-large.jpg
    return new Promise((resolve)=>{
        fetch(`https://www.pexels.com/search/${encodeURI(keyword)}`).then((res)=>{
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
                    let imageThumb = $(this).attr("src")
                    willReturn.push({
                        imageThumb: imageThumb,
                        imageSrc: R.replace("meduim", "large", imageThumb)
                    })
                })
                resolve(willReturn)
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
function main(keyword) {
    return new Promise(resolve=>{
        imageFirst(keyword).then(imageFirstData =>{
            imageSecond(keyword).then(imageSecondData=>{
                resolve(J.shuffle(R.flatten([imageFirstData, imageSecondData])))
            })
        })
    })
}
module.exports.main = main
module.exports.imageFirst = imageFirst
module.exports.imageSecond = imageSecond
