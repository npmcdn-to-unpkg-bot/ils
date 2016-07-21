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
const translate = require("./admin/_inc/translate.js")
let words = require("./words")
translate.deEn("wenig").then(J.log)
//fs.writeFileSync("temp3.txt", JSON.stringify(R.flatten([arr, arr2])))
