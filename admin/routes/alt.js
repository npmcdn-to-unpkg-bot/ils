"use strict"
const express = require("express")
const router = express.Router()
const fs = require("fs-extra")
const R = require("ramda")
const env = require("dotenv-helper")
const J = require("../../common.js")
const translate = require("../_inc/translate")
const bringOrderTranslation = require("../_inc/bringOrderTranslation")
const proudDb = require("../_inc/proud-db")
const Bing = require("node-bing-api")({ accKey: env.getEnv("bing") })
function bingImages(keyword, marker = 5) {
    return new Promise((resolve)=>{
        Bing.images(keyword, {
            top: marker,
            imageFilters: {
                size: "large",
                color: "color",
                style: "photo",
                aspect : "wide"
            }
        }, (error, res, body)=>{
            J.log(body)
            if (R.path(["d", "results"], body)) {
                let willReturn = []
                body.d.results.map((val)=>{
                    J.log(val)
                    willReturn.push({
                        src: val.MediaUrl,
                        width: val.Width,
                        height: val.Height
                    })
                })
                resolve(willReturn)
            } else {
                resolve(null)
            }
        })
    })
}
function imageFirst(keyword) {
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
router.post("/", (req, res) =>{
    let imageSearch = JSON.parse(req.body.data).imageSearch
    bingImages(imageSearch).then(incoming =>{
        res.send(incoming)
    })
})

module.exports = router
