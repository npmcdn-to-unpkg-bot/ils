"use strict"
const J = require("../common")
const async = require("async")
const R = require("ramda")
const translate = require("./translate.js")
const scrapedParse = require("./scrapedParse.js")
let words = require("./translateDraftGeneratorWords")
function main() {
    let willMap = words.map(val=>{
        return function(callback) {
            translate.deEnTimer(val).then(data=>{
                let obj = scrapedParse.main(data)
                callback(null, obj)
            })
        }
    })
    return new Promise(resolve=>{
        async.series(willMap,
        function(err, results) {
            resolve(results)
        })
    })
}
function partial(index = 0, limit = 50) {
    let wordsArr = R.splitEvery(limit, words)
    let willMap = wordsArr[ index ].map(val=>{
        return function(callback) {
            translate.deEnTimer(val).then(data=>{
                let obj = scrapedParse.main(data)
                callback(null, obj)
            })
        }
    })
    return new Promise(resolve=>{
        async.series(willMap,
        function(err, results) {
            resolve(results)
        })
    })
}
module.exports.main = main
module.exports.partial = partial
