"use strict"
const common = require("../../common")
const generateSitemap = require("./generateSitemap")
function main() {
    return new Promise((resolve)=>{
        generateSitemap.main().then(()=>{
            common.saveLog("sitemap generated")
        })
    })
}
module.exports.main = main
