"use strict"
const browserPerf = require("./browserPerf")
const pageSpeedInsights = require("./pageSpeedInsights")
const yellowLab = require("./yellowLab")
const fs = require("fs-extra")
async function mainAsync(url) {
    let willReturn = {}
    willReturn.browserPerf = await browserPerf.main(url)
    if (!url.includes("localhost")) {
        willReturn.pageSpeedInsights = await pageSpeedInsights.main(url)
    }
    willReturn.yellowLab = await yellowLab.main(url)
    return willReturn
}
function main(url) {
    return new Promise(resolve=>{
        mainAsync(`https://ilearnsmarter.com/${url}`).then(ilsData=>{
            mainAsync(`http://localhost:3000/${url}`).then(localhostData=>{
                resolve({ils:ilsData, localhost:localhostData})
            })
        })
    })
}
function ils(url) {
    return mainAsync(`https://ilearnsmarter.com/${url}`)
}
function localhost(url) {
    return mainAsync(`http://localhost:3000/${url}`)
}
module.exports.main = main
module.exports.ils = ils
module.exports.localhost = localhost
