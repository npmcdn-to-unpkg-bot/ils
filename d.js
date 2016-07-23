"use strict"
const J = require("./common")
const async = require("async")
const R = require("ramda")
const fs = require("fs-extra")
const translate = require("./admin/_inc/translate.js")
const scrapedParse = require("./_inc/scrapedParse.js")
let words = require("./words")
let arr = R.splitEvery(30, words)
let willSave = {}
let index = 1
let willMap = words.map(val=>{
    return function(callback){
        J.log(val)
        translate.deEnSave(val).then(incoming=>{
            
            callback(null)
            willSave[val]=scrapedParse.main(incoming)
        })
    }
})
async.series(willMap,
function(err, results) {
    fs.writeJson(`data.json`,willSave,()=>{
      J.log(1)  
    })
})
