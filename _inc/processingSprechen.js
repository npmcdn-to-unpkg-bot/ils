"use strict"
const fetch = require("node-fetch")
const cheerio = require("cheerio")
const fs = require("fs-extra")
const R = require("ramda")
const J = require("justdo")
const tested = require("./hapi/public/sprechen.json")
let stateFn = R.compose(R.drop(1), R.head, R.split(".\""))

let keyword = "zSprechen"
let willSave = {}
let willWork = R.compose(R.map(fixing), R.filter(filtering))
willSave.data = willWork(tested.main)
function filtering(data) {
    return R.prop("enPart", data).trim().length > 0
}
function fixing(data) {
    let localObj = {
        dePart: `${R.compose(R.toUpper, R.head, R.trim, R.prop("dePart"))(data)}${R.compose(R.replace(/(\.)|,|\!|\?/g, ""), R.tail, R.trim, R.prop("dePart"))(data)}`,
        enPart: `${R.compose(R.toUpper, R.head, R.trim, R.prop("enPart"))(data)}${R.compose(R.replace(/,\.\?!/g, ""), R.tail, R.trim, R.prop("enPart"))(data)}`
    }
    J.lg(localObj)
    return R.merge(data, localObj)
}
fs.writeJsonSync("hapi/public/db.json", willSave)
