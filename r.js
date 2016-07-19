"use strict"
const J = require("./common")
const R = require("ramda")
const RFantasy = require("ramda-fantasy")
const fs = require("fs-extra")
const Either = RFantasy.Either
const Future = RFantasy.Future
const Identity = RFantasy.Identity
const Maybe = RFantasy.Maybe
const Just = RFantasy.Just
var lineReader = require("line-reader")

let willSave = []
lineReader.eachLine("_inc/inc/wordsDeEnScore.txt", function(line, last, cb) {
    //console.log(line)
    let word = R.compose(R.head, R.split(/\s/))(line)
    let score = R.match(/[0-9]+/, line)
    J.lg(word)
    if (word.length > 3) {
        willSave.push({word, score})
    }
    if (last) {
        fs.writeFileSync("temp2.txt", JSON.stringify(R.flatten([willSave])))
        cb(false)
    } else {cb()}
})
