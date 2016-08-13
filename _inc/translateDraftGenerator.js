"use strict"
const J = require("../common")
const async = require("async")
const R = require("ramda")
const translate = require("./translate.js")
const scrapedParse = require("./scrapedParse.js")
let words = require("./translateDraftGeneratorWords")

let willMap = words.map(val=>{
    return function(callback) {
        translate.deEnTimer(val).then(incoming=>{
            callback(null, {word:val, data:incoming})
        })
    }
})
async.series(willMap,
function(err, results) {
    let willSave = {}
    results.map(val=>{
        willSave[ val.word ] = scrapedParse.main(val.word, val.data)
    })
    fs.writeJson("dataFile.json", willSave, ()=>{
        J.log(1)
    })
})
