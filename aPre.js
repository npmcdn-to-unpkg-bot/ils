"use strict"
const fs = require("fs-extra")
const scrapeIt = require("scrape-it")
const cheerio = require("cheerio")
const fetch = require("node-fetch")
const request = require("request")
const J = require("justdo")
const R = require("ramda")
const dbPath = "/home/just/ils/hapi/public/_db.json"
const dbPathRaw = "/home/just/ils/hapi/public/_dbRaw.json"
let removeLongSentences = R.compose(R.lt(R.__, 3), R.length, R.split("."))
let data = fs.readJsonSync(dbPath).data
let willSave = {}
    let dataState = await proudDb.loadParent("data")
    let predraftCategory = getPredraftCategory(dataState)
    let willRemoveIndexArr = []
    let dropByIndex = R.compose(R.set( R.lensProp('category'), "draft"), R.filter((val)=>{
        if (R.lte(R.prop("id", val), marker)) {
            if (R.prop("enPart", val).length > 1) {
                return true
            } else {
                willRemoveIndexArr.push(R.prop("id", val))
                return false
            }
        } else {
            return false
        }
    }))
