"use strict"
const J = require("./common")
const R = require("ramda")
const fs = require("fs-extra")
const db = require("proud-db")
const translate = require("./admin/_inc/translate.js")
const scrapedParse = require("./_inc/scrapedParse")
//let words = require("./words")
let words = ["mehr", "schuld"]
async function main(arr) {
    let willSave
    let willLog
    for (let val of arr) {
        willSave = await translate.deEnTimer(val)
        fs.writeJsonSync(`${val}.json`, {data: scrapedParse.main(willSave)})
    }
    return willSave
}
function promised(str) {
    return new Promise(resolve=>{
        setTimeout(()=>{
            resolve(`${str} == `)
        }, 1000)
    })
}
main(words).then(J.log)
//translate.deEnTimer("wenig").then(incoming=>{
//fs.writeJsonSync("temp.json", {data: incoming})
//})

//translate.deEn("wenig").then(incoming=>{
//db.saveParent("test",incoming).then(J.lg)
//fs.writeJsonSync("temp.json", {data: incoming})
//})
