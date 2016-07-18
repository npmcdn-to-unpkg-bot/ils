"use strict"
const fs = require("fs-extra")
const scrapeIt = require("scrape-it")
const cheerio = require("cheerio")
const fetch = require("node-fetch")
const request = require("request")
const J = require("../../common.js")
const R = require("ramda")
const env = require("dotenv-helper")
const Bing = require("node-bing-api")({ accKey: env.getEnv("bing") })
function imageFirst(keyword, searchLimit = 5) {
    return new Promise((resolve)=>{
        Bing.images(keyword, {
            top: searchLimit,
            imageFilters: {
                size: "large",
                color: "color",
                style: "photo",
                aspect : "wide"
            }
        }, (error, res, body)=>{
            if (R.path(["d", "results"], body)) {
                let willReturn = []
                body.d.results.map((val)=>{
                    willReturn.push({
                        imageThumb: val.MediaUrl,
                        imageSrc: val.MediaUrl
                        //width: val.Width,
                        //height: val.Height
                    })
                })
                resolve(willReturn)
            } else {
                resolve(null)
            }
        })
    })
}
function imageSecond(keyword, searchLimit = false) {
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
                    let imageThumb = $(this).attr("src")
                    willReturn.push({
                        imageThumb: imageThumb,
                        imageSrc: R.replace("thumbs", "previews", imageThumb)
                    })
                })
                if (!searchLimit) {
                    resolve(willReturn)
                } else {
                    resolve(R.take(searchLimit, willReturn))
                }
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
function imageThird(keyword, searchLimit = false) {
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
                    let imageThumb = $(this).attr("src")
                    willReturn.push({
                        imageThumb: imageThumb,
                        imageSrc: R.replace("meduim", "large", imageThumb)
                    })
                })
                if (!searchLimit) {
                    resolve(willReturn)
                } else {
                    resolve(R.take(searchLimit, willReturn))
                }
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}

function main(keyword, searchLimit = false) {
    J.box(keyword)
    return new Promise(resolve=>{
        let imageFirstLimit = searchLimit === false ? 5 : searchLimit
        imageFirst(keyword, imageFirstLimit).then(imageFirstData =>{
            imageSecond(keyword, searchLimit).then(imageSecondData=>{
                imageThird(keyword, searchLimit).then(imageThirdData=>{
                    resolve(J.shuffle(R.flatten([imageFirstData, imageSecondData, imageThirdData])))
                })
            })
        })
    })
}


module.exports.main = main
module.exports.imageFirst = imageFirst
module.exports.imageSecond = imageSecond
module.exports.imageThird = imageThird
