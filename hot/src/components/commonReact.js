"use strict"
const R = require("ramda")
const reqwest = require("reqwest")

function getData(url) {
    return new Promise((resolve)=>{
        reqwest({
            url:  url,
            method:  "get",
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

function postData(url, data) {
    return new Promise((resolve)=>{
        reqwest({
            url:  url,
            data: {data: data},
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

const winWidthIs = window.innerWidth
const winHeightIs = window.innerHeight

function getHeightPx(incomingPercent = 1) {
    return Math.floor(R.divide(winHeightIs, 100) * incomingPercent)
}
function getWidthPx(incomingPercent = 1) {
    return Math.floor(R.divide(winWidthIs, 100) * incomingPercent)
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
function isUniq(obj) {
    let arr = R.split(" ", obj[ "dePart" ])
    return R.uniq(arr).length === arr.length
}
function log(data) {
    if (typeof data === "string") {
        console.log(`||| ${data} |||`)
    } else {
        console.log(data)
    }
}
function addProp(singleProp, defaultValue, arr) {
    return R.compose(R.map(val=>{
        val[ singleProp ] = defaultValue
        return val
    }))(arr)
}
let fontValueFn = R.cond([
    [R.gte(30), R.always(250)],
    [R.both(R.lt(30), R.gte(48)), R.always(185)],
    [R.T, R.always(125)]
])
let lineHeightFn = R.cond([
    [R.equals(250), R.always(1.5)],
    [R.equals(185), R.always(2)],
    [R.T, R.always(3)]
])
function hideTail(str) {
    return `${R.head(str)}${R.compose(R.join(""), R.repeat("."), R.length, R.tail)(str)}`
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
        return false
    }
}
module.exports.returnOldStyleGerman = returnOldStyleGerman
module.exports.easyGermanSymbol = easyGermanSymbol
module.exports.hideTail = hideTail
module.exports.fontValueFn = fontValueFn
module.exports.lineHeightFn = lineHeightFn
module.exports.addProp = addProp
module.exports.log = log
module.exports.getData = getData
module.exports.postData = postData
module.exports.shuffle = shuffle
module.exports.getPercentRaw = getPercentRaw
module.exports.getPercent = getPercent
module.exports.getPart = getPart
module.exports.divide = divide
module.exports.isUniq = isUniq
module.exports.emitter = emitter
module.exports.getHeightPx = getHeightPx
module.exports.getWidthPx = getWidthPx
module.exports.randomSeed = randomSeed
module.exports.winWidthIs = winWidthIs
module.exports.winHeightIs = winHeightIs

module.exports.bulButtonInit = "button"
module.exports.categoryOptions = [
    { value: "quotes", label: "quotes" },
    //{ value: "jokes", label: "jokes" },
    { value: "derProcess", label: "derProcess" },
    { value: "draft", label: "draft" },
    { value: "preDraft", label: "preDraft" }
]
module.exports.bulButtonNext = "button is-success"
module.exports.buttonTextShowAnswer = "Show Answer"
module.exports.buttonTextNext = "Next"
module.exports.bulMobileBoxOuter = "columns box is-hidden-desktop-only is-hidden-tablet-only is-hidden-widescreen"
module.exports.bulMobileOuter = "columns is-hidden-desktop-only is-hidden-tablet-only is-hidden-widescreen"
module.exports.bulMobileBox = "column box is-hidden-desktop-only is-hidden-tablet-only is-hidden-widescreen"
module.exports.bulMobileBoxHalf = "column box is-half is-offset-one-quarter is-hidden-desktop-only is-hidden-tablet-only is-hidden-widescreen"
module.exports.bulBoxOuter = "columns box is-hidden-mobile"
module.exports.bulBox = "column box"
module.exports.bulBoxHalf = "column box is-half is-offset-one-quarter"
