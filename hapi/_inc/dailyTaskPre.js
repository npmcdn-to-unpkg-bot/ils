"use strict"
const J = require("../../common")
const generateSitemap = require("./generateSitemap")
const R = require("ramda")
let deployCommands = ["git pull", "npm run deploy"]
let rootCommands = ["git pull", "npm run de"]

function sitemap() {
    return new Promise((resolve)=>{
        generateSitemap.main().then(()=>{
            J.saveLog("sitemap generated")
        })
    })
}

async function deployRootAsync() {
    let awaited
    for (let singleCommand of rootCommands) {
        awaited = await J.willRunFixedCommand(singleCommand)
    }
    return awaited
}
async function deployRoot() {
    return deployRootAsync()
}

async function deployAsync() {
    let awaited
    for (let singleCommand of deployCommands) {
        awaited = await J.willRunFixedCommand(singleCommand)
    }
    awaited = await sitemap()
    return awaited
}
async function deploy() {
    return deployAsync()
}

module.exports.deploy = deploy
module.exports.deployRoot = deployRoot
module.exports.sitemap = sitemap
