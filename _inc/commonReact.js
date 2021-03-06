"use strict"
const R = require("ramda")
const React = require("react")
const ReactDOM = require("react-dom")
const reqwest = require("reqwest")
const localforage = require("localforage")
const config = require("./config")
const stopWords = require("./stopWords.js")
let emitter = new Events()
function Events(target) {
    let events = {}, empty = []
    target = target || this
    target.on = function(type, func, ctx) {
        (events[ type ] = events[ type ] || []).push([func, ctx])
    }
    target.off = function(type, func) {
        type || (events = {})
        var list = events[ type ] || empty,
            i = list.length = func ? list.length : 0
        while (i--) func == list[ i ][ 0 ] && list.splice(i, 1)
    }
    target.emit = function(type) {
        let e = events[ type ] || empty, list = e.length > 0 ? e.slice(0, e.length) : e, i = 0, j
        while (j = list[ i++ ]) j[ 0 ].apply(j[ 1 ], empty.slice.call(arguments, 1))
    }
}
function loadTime() {
    let now = new Date().getTime()
    let page_load_time = now - performance.timing.navigationStart
    console.log("User-perceived page loading time: " + page_load_time)
}
function getData(url) {
    return new Promise((resolve)=>{
        reqwest({
            url:  url,
            method:  "get",
            error: err => {
                console.log(err)
                resolve(null)
            },
            success: incoming=> {
                resolve(incoming)
            }
        })
    })
}
function postData(url, data) {
    return new Promise((resolve)=>{
        reqwest({
            url,
            data,
            method:  "post",
            error: (err) => {
                console.log(err)
                resolve(null)
            },
            success: (incoming)=> {
                resolve(incoming)
            }
        })
    })
}
function getHeightPx(incomingPercent = 1, window = {}) {
    return Math.floor(R.divide(window.innerHeight, 100) * incomingPercent)
}
function getWidthPx(incomingPercent = 1) {
    return Math.floor(R.divide(window.innerWidth, 100) * incomingPercent)
}
function getPercent(incomingPercent, whole) {
    return Math.floor(R.divide(whole, 100) * incomingPercent)
}
function getPercentRaw(incomingPercent, whole) {
    return Math.floor(R.divide(whole, 100) * incomingPercent)
}
function divide(part, whole) {
    return Math.floor(R.divide(part, whole))
}
function getPart(part, whole) {
    return Math.floor(R.divide(part, whole) * 100)
}
function randomSeed() {
    let willReturn = ""
    let data = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < 3; i++) {
        willReturn += data.charAt(Math.floor(Math.random() * data.length))
    }
    return willReturn
}
function shuffle(array) {
    let counter = array.length
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter)
        counter--
        let temp = array[ counter ]
        array[ counter ] = array[ index ]
        array[ index ] = temp
    }
    return array
}
function isUniq(obj) {
    let arr = R.split(" ", obj[ "dePart" ])
    return R.uniq(arr).length === arr.length
}
function log(data) {
    switch (R.type(data)) {
    case "String":
        console.log(`||| ${data} |||`)
        break
    case "Object":
        console.dir(data)
        break
    default:
        console.log(data)
    }
}
function addProp(singleProp, defaultValue, arr) {
    return R.compose(R.map(val=>{
        if (val[ singleProp ] === undefined) {
            val[ singleProp ] = defaultValue
        }
        return val
    }))(arr)
}
function addSingleProp(singleProp, defaultValue, obj) {
    if (obj.singleProp === undefined) {
        let localObj = {}
        localObj[ singleProp ] = defaultValue
        return R.merge(obj, localObj)
    } else {
        return obj
    }
}
function setProp(singleProp, value, arr) {
    return R.compose(R.map(val=>{
        val[ singleProp ] = value
        return val
    }))(arr)
}
let fontValueFn = R.cond([
    [R.gte(30), R.always(5.2)],
    [R.both(R.lt(30), R.gte(48)), R.always(3.5)],
    [R.both(R.lt(48), R.gte(60)), R.always(3.2)],
    [R.T, R.always(2)]
])
let lineHeightFn = R.cond([
    [R.equals(5.2), R.always(1.8)],
    [R.equals(3.5), R.always(2.7)],
    [R.equals(3.2), R.always(3.1)],
    [R.T, R.always(4.7)]
])
function hideTail(str) {
    return `${R.head(str)}${R.compose(R.join(""), R.repeat("_"), R.length, R.tail)(str)}`
}
function easyGermanSymbol(keyIs) {
    if (keyIs === "ä") {
        return "a"
    } else if (keyIs === "ö") {
        return "o"
    } else if (keyIs === "ü") {
        return "u"
    } else if (keyIs === "ß") {
        return "s"
    } else {
        return false
    }
}
function returnEasyStyleGerman(keyIs) {
    if (keyIs === "ä") {
        return "a"
    } else if (keyIs === "ö") {
        return "o"
    } else if (keyIs === "ü") {
        return "u"
    } else if (keyIs === "ß") {
        return "s"
    } else {
        return keyIs
    }
}
function returnOldStyleGerman(keyIs) {
    if (keyIs === "ä") {
        return "ae"
    } else if (keyIs === "ö") {
        return "oe"
    } else if (keyIs === "ü") {
        return "ue"
    } else if (keyIs === "ß") {
        return "ss"
    } else {
        return keyIs
    }
}
function stopWordsFilter(sentence) {
    return R.compose(R.filter(val=> {
        return R.indexOf(val, stopWords) === -1 && val.length > 3
    }), R.split(" "), R.toLower)(sentence)
}
function randomIndex(arr) {
    if (R.type(arr) === "Array" && arr.length > 0) {
        return shuffle(arr)[ 0 ]
    } else {return null}
}
function addFullstop(str) {
    let lastChar = R.last(str.trim())
    let punctuationArr = [".", "?", "!"]
    if (R.indexOf(lastChar, punctuationArr) === -1 && lastChar !== "") {
        return `${str.trim()}.`
    } else {
        return str.trim()
    }
}
function removePunctuation(str) {
    return {cleanStr: R.replace(/\.|\!|\,|\-|\?|\"|\'/g, "", str), removedChar:  R.match(/\.|\!|\,|\-|\?|\"|\'/g, str)}
}
function addWhitespace(str, length) {
    if (str.length < length) {
        return `${str}${R.compose(R.join(""), R.repeat("_"))(length - str.length)}|`
    } else {return str}
}
function convertImgToBase64(url) {
    return new Promise(resolve=>{
        var img = new Image()
        img.crossOrigin = "Anonymous"
        img.onload = function() {
            let canvas = document.createElement("CANVAS")
            let ctx = canvas.getContext("2d")
            canvas.height = this.height
            canvas.width = this.width
            ctx.drawImage(this, 0, 0)
            let dataURL = canvas.toDataURL("image/png")
            canvas = null
            resolve(dataURL)
        }
        img.src = url
    })
}
function nextState(arr, index) {
    if (arr.length - 1 === index + 1) {
        return arr[ 0 ]
    } else {
        return arr[ index + 1 ]
    }
}
function performanceMemory() {
    console.log(performance.memory)
}
function performanceStats() {
    var p = performance.getEntries()
    for (var i = 0; i < p.length; i++) {
        console.log("PerformanceEntry[" + i + "]")
        printPerformanceEntry(p[ i ])
    }
}
function printPerformanceEntry(perfEntry) {
    var properties = ["name",
    "entryType",
    "startTime",
    "duration"]

    for (var i = 0; i < properties.length; i++) {
        var supported = properties[ i ] in perfEntry
        if (supported) {
            var value = perfEntry[ properties[ i ] ]
            console.log("... " + properties[ i ] + " = " + value)
        } else {
            console.log("... " + properties[ i ] + " = NOT supported")
        }
    }
}
function diffObject(a, b) {
    return Object.keys(a).reduce(function(map, k) {
        if (a[ k ] !== b[ k ]) map[ k ] = b[ k ]
        return map
    }, {})
}
let alertModeArr = ["warning", "error", "info", "success"]
let alertModePlainArr = ["warning", "info", "success"]
let alertEffectArr = ["slide", "scale", "bouncyflip", "flip", "genie", "jelly", "stackslide"]
function alertRandom() {
    let effect = R.head(shuffle(alertEffectArr))
    let mode = R.head(shuffle(alertModeArr))
    return {effect, mode}
}
function alertRandomPlain() {
    let effect = R.head(shuffle(alertEffectArr))
    let mode = R.head(shuffle(alertModePlainArr))
    return {effect, mode}
}
module.exports.addFullstop = addFullstop
module.exports.addProp = addProp
module.exports.addSingleProp = addSingleProp
module.exports.addWhitespace = addWhitespace
module.exports.alertRandom = alertRandom
module.exports.alertRandomPlain = alertRandomPlain
module.exports.bulBox = "column box"
module.exports.bulBoxHalf = "column box is-half is-offset-one-quarter"
module.exports.bulBoxOuter = "columns box is-hidden-mobile"
module.exports.bulButtonInit = "button"
module.exports.bulButtonNext = "button is-success"
module.exports.bulMobileBox = "column box is-hidden-desktop-only is-hidden-tablet-only is-hidden-widescreen"
module.exports.bulMobileBoxHalf = "column box is-half is-offset-one-quarter is-hidden-desktop-only is-hidden-tablet-only is-hidden-widescreen"
module.exports.bulMobileBoxOuter = "columns box is-hidden-desktop-only is-hidden-tablet-only is-hidden-widescreen"
module.exports.bulMobileOuter = "columns is-hidden-desktop-only is-hidden-tablet-only is-hidden-widescreen"
module.exports.buttonTextNext = "Next"
module.exports.buttonTextShowAnswer = "Show Answer"
module.exports.categoryOptions = [{ value: "quotes", label: "quotes" }, { value: "plain", label: "plain" }, { value: "draft", label: "draft" }, { value: "preDraft", label: "preDraft" }]
module.exports.config = config
module.exports.convertImgToBase64 = convertImgToBase64
module.exports.diffObject = diffObject
module.exports.divide = divide
module.exports.easyGermanSymbol = easyGermanSymbol
module.exports.emitter = emitter
module.exports.empty = ""
module.exports.fontValueFn = fontValueFn
module.exports.getData = getData
module.exports.getHeightPx = getHeightPx
module.exports.getItem = localforage.getItem
module.exports.getPart = getPart
module.exports.getPercent = getPercent
module.exports.getPercentRaw = getPercentRaw
module.exports.getWidthPx = getWidthPx
module.exports.hapi = "http://localhost:3000"
module.exports.hideTail = hideTail
module.exports.httpsFn = R.replace("http://", "https://", R.__)
module.exports.ils = "https://ilearnsmarter.com"
module.exports.isUniq = isUniq
module.exports.lineHeightFn = lineHeightFn
module.exports.loadTime = loadTime
module.exports.log = log
module.exports.nextState = nextState
module.exports.performanceMemory = performanceMemory
module.exports.performanceStats = performanceStats
module.exports.postData = postData
module.exports.randomIndex = randomIndex
module.exports.randomSeed = randomSeed
module.exports.React = React
module.exports.ReactDOM = ReactDOM
module.exports.removePunctuation = removePunctuation
module.exports.returnEasyStyleGerman = returnEasyStyleGerman
module.exports.returnOldStyleGerman = returnOldStyleGerman
module.exports.setItem = localforage.setItem
module.exports.setProp = setProp
module.exports.shuffle = shuffle
module.exports.stopWordsFilter = stopWordsFilter
