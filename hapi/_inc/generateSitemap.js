"use strict"
const sitemapFactory = require("sitemap")
const fs = require("fs-extra")
const R = require("ramda")

const sitemapData = require("./sitemap.json").main

let oneLevelUp = R.compose(R.join("/"),R.dropLast(1),R.split("/"))

let sitemap = sitemapFactory.createSitemap({
    hostname: "http://ilearnsmarter.com",
    cacheTime: 600000
})
sitemap.add({url: "/"})
sitemapData.map((val)=>{
    sitemap.add({url: `/${val}/`})
})
function main() {
    return new Promise((resolve)=>{
        fs.outputFile(`${oneLevelUp(__dirname)}/public/sitemap.xml`,sitemap.toString(),()=> {
            resolve(true)
        })
    })
}
module.exports.main = main
