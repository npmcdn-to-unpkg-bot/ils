"use strict"
const J = require("../common")
const async = require("async")
const R = require("ramda")
const fs = require("fs-extra")
const translate = require("../admin/_inc/translate.js")
const scrapedParse = require("./scrapedParse.js")
let words = require("./words")
let arr = R.splitEvery(50, words)

let index = 0
let willMap = words.map(val=>{
//let willMap = arr[index].map(val=>{
    return function(callback) {
        J.log(val)
        translate.deEnTimer(val).then(incoming=>{
            callback(null,{word:val, data:incoming})
        })
    }
})
async.series(willMap,
function(err, results) {
    let willSave = {}
    results.map(val=>{
        willSave[val.word]=scrapedParse.main(val.word,val.data)
    })
    fs.writeJson(`dataFile.json`, willSave, ()=>{
        J.log(1)
    })
})
