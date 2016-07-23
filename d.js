"use strict"
const J = require("./common")
const async = require("async")
const R = require("ramda")
const fs = require("fs")
const db = require("proud-db")
const translate = require("./admin/_inc/translate.js")
const scrapedParse = require("./_inc/scrapedParse.js")
let words = require("./words")
let arr = R.splitEvery(30, words)

let willMap = arr[0].map(val=>{
    return function(callback){
        J.log(val)
        translate.deEnSave(val).then(incoming=>{
            fs.writeFile(`/home/just/ils/_inc/words/${val}.txt`, JSON.stringify(scrapedParse.main(incoming)), (err) => {
                J.log(err)
                callback(null)
            })
        })
    }
})
async.series(willMap,
function(err, results) {
J.log(1)
})
