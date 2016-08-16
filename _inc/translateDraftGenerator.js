"use strict"
const J = require("../common")
const async = require("async")
const R = require("ramda")
const translate = require("./translate.js")
const scrapedParse = require("./scrapedParse.js")
const LineByLineReader = require("line-by-line")
function getWords() {
    return new Promise(resolve=>{
        let willReturn = []
        let rl = new LineByLineReader(`${__dirname}/translateDraftGeneratorWords.txt`)
        rl.on("line", function(line, lineCount, byteCount) {
            if (line.trim() !== "") {
                willReturn.push(line)
            }
        })
        rl.on("end", function(line, lineCount, byteCount) {
            resolve(willReturn)
        })
    })
}
function main() {
    return new Promise(resolve=>{
        getWords().then(words=>{
            let willMap = words.map(val=>{
                return function(callback) {
                    translate.deEnTimer(val).then(data=>{
                        let obj = scrapedParse.main(data)
                        callback(null, obj)
                    })
                }
            })
            async.series(willMap, (err, results)=>{
                resolve(results)
            })
        })
    })
}
function alt() {
    return new Promise(resolve=>{
        getWords().then(words=>{
            let willMap = words.map(val=>{
                return function(callback) {
                    translate.deEnTimer(val).then(data=>{
                        let stringified = JSON.stringify(scrapedParse.main(data))
                        J.postData(`${J.hapi}/addTranslateDraft`, {stringified}).then(saveResult=>{
                            J.lg(saveResult)
                            callback(null, obj)
                        })
                    })
                }
            })
            async.series(willMap, (err, results)=>{
                resolve(results)
            })
        })
    })
}
function partial(index = 0, limit = 50) {
    return new Promise(resolve=>{
        getWords().then(words=>{
            let wordsArr = R.splitEvery(limit, words)
            let willMap = wordsArr[ index ].map(val=>{
                return function(callback) {
                    translate.deEnTimer(val).then(data=>{
                        let obj = scrapedParse.main(data)
                        callback(null, obj)
                    })
                }
            })
            async.series(willMap, (err, results)=>{
                resolve(results)
            })
        })
    })
}
module.exports.main = main
module.exports.alt = alt
module.exports.partial = partial
