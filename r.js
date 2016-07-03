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
///home/just/ils/hapi/public/db.json
let outputLocation = "/home/just/ils/_inc/inc/dbOut.json"
let sourceLocation = require("/home/just/ils/hapi/public/db.json").data
let ramdaMagic = R.compose(
    R.map((data)=>{
        return R.assoc('category', "quotes", data)
    })
)

fs.outputJsonSync(outputLocation, ramdaMagic(sourceLocation))
