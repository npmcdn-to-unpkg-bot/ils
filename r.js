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
var arrRaw = require("/home/just/ils/deWordScore.js")
var arr2 = require("/home/just/ils/hot/src/components/stopWords.js")

let arr = R.compose(R.map(val => R.prop("word", val)), R.filter(val => {
    return val.score > 8153
    return val
}))(arrRaw)
J.log(R.flatten([arr, arr2]).length)
J.log(arr.length)
J.log(arr2.length)
//fs.writeFileSync("temp3.txt", JSON.stringify(R.flatten([arr, arr2])))
