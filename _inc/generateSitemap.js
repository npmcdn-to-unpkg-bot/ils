"use strict"
const sitemapFactory = require("sitemap")
const fs = require("fs-extra")
const R = require("ramda")
const J = require("../common")
const sitemapData = require("../hapi/sitemap.json").main
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
        fs.outputFile(`${J.oneLevelUp(__dirname)}/hapi/public/sitemap.xml`,sitemap.toString(),()=> {
            resolve(true)
        })
    })
}
module.exports.main = main
