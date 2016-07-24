"use strict"
const fs = require("fs-extra")
const R = require("ramda")
const scrapedParse = require("./scrapedParse.js")
//const data = require("./data.json")
const data = require("./words.js")
console.log(R.values(data).length)
