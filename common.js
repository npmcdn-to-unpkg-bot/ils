"use strict"
const config = require("./_inc/config.js")
const exec = require("child_process").exec
const request = require("request")
const R = require("ramda")
const db = require("proud-db")
const J = require("justdo")
const fs = require("fs-extra")
const env = require("dotenv-helper")
const reqwest = require("reqwest")
let store = {endMarker: "default"}
function timer(startMarker = "default") {
    console.timeEnd(store.endMarker)
    console.time(startMarker)
    store.endMarker = startMarker
}
function auth(ip) {
    let flag = false
    env.getEnv("adminIp").map(val=>{
        if (ip.includes(val)) {
            flag = true
        }
    })
    return flag
}
function randomSeed(limit = 10) {
    let willReturn = ""
    let data = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (let i = 0; i < limit; i++) {
        willReturn += data.charAt(Math.floor(Math.random() * data.length))
    }
    return willReturn
}
function firstLetterCapital(str) {
    return `${R.compose(R.toUpper, R.head)(str)}${R.tail(str)}`
}
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
            data: data,
            method:  "post",
            error: (err) => {
                console.error(err)
                console.log("REQWEST ERROR")
                resolve(null)
            },
            success: (incoming)=> {
                resolve(incoming)
            }
        })
    })
}
function randomIndex(arr) {
    let index = Math.floor(Math.random() * arr.length)
    return arr[ index ]
}
function willRequest(url) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            "rejectUnauthorized": false
        }, (error, response, body) => {
            if (response.statusCode === 200) {
                resolve(body)
            } else {
                reject(error)
            }
        })
    })
}
/**
 * willRunFixedCommand - will execute shell command from the directory of this file
 *
 * @param  {type} commandIs - example values: "ls", "free", "node thisFile.js"
 * @return {Promise} Promise => true
 */
function willRunFixedCommand(commandIs) {
    return new Promise(function(resolve) {
        let proc = exec(commandIs, {
            "cwd": __dirname
        })
        proc.stdout.on("data", function(chunk) {
            console.log(chunk.toString())
        })
        proc.stdout.on("end", function() {
            resolve(true)
        })
        proc.stdout.on("error", function(error) {
            console.error(error)
            resolve(error)
        })
    })
}
function isEmpty(question) {
    return R.isEmpty(question) || question === null || question === undefined
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
function stop() {
    return new Promise(resolve=>{
        willRunFixedCommand("npm stop")
        .then(()=>{
            resolve(true)
        })
    })
}
function isType(obj, arr) {
    let willReturn = true
    arr.map(val=>{
        if (willReturn) {
            willReturn = !isEmpty(R.prop(val, obj))
        }
    })
    return willReturn
}
function isTypeLoose(obj, arr) {
    let willReturn = true
    arr.map(val=>{
        if (willReturn) {
            willReturn = R.prop(val, obj) !== undefined
        }
    })
    return willReturn
}
function isMainType(obj) {
    return !isEmpty(R.prop("dePart", obj)) && !isEmpty(R.prop("enPart", obj))
}
function isTranslateDraftType(obj) {
    return isType(obj, ["word", "deEn", "synonym", "synonymTranslated", "phrase", "phraseTranslated"])
}
function isBlogType(obj) {
    return isType(obj, ["title", "category", "content", "canonical"])
}
function isBlogUrl(keyword) {
    let countSeparator = R.unless(R.compose(R.lte(2), R.length, R.split("-")), R.F)
    let lengthFn = R.unless(R.compose(R.gt(80), R.length, R.split("")), R.F)
    let categoryInUrl = R.unless(R.compose(val=>{
        return R.any(value=>{
            return val.includes("Category") && R.replace("Category", "", val) === value
        })(["nodejs", "reactjs", "javascript"])
    }, R.head, R.split("-")), R.F)
    if (R.allPass([countSeparator, categoryInUrl, lengthFn])(keyword)) {
        let canonical = R.replace(/nodejsCategory-|reactjsCategory-|javascriptCategory-/, "", keyword)
        if (R.compose(R.all(R.test(/[a-z]|-/)), R.split(""))(canonical)) {
            return canonical
        } else {
            return false
        }
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
        return keyIs
    }
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
let removePunctuation = R.compose(R.replace(/\.|\!|\,|\-|\?/, ""))
let takeName = R.compose(R.takeLast(1), R.split("/"))
let anyRaw = R.flip(R.any)
let anyFn = R.curry(anyRaw)
module.exports.emitter = emitter
module.exports.oneLevelUp = R.compose(R.join("/"), R.dropLast(1), R.split("/"))
module.exports.twoLevelUp = R.compose(R.join("/"), R.dropLast(2), R.split("/"))
module.exports.normalizeGermanWord = R.compose(R.join(""), R.map(val=>returnOldStyleGerman(val)), R.splitEvery(1), R.toLower, R.trim)
module.exports.returnOldStyleGerman = returnOldStyleGerman
module.exports.isMainType = isMainType
module.exports.isTranslateDraftType = isTranslateDraftType
module.exports.isBlogType = isBlogType
module.exports.isBlogUrl = isBlogUrl
module.exports.firstLetterCapital = firstLetterCapital
module.exports.stop = stop
module.exports.auth = auth
module.exports.removePunctuation = removePunctuation
module.exports.timer = timer
module.exports.shuffle = shuffle
module.exports.postData = postData
module.exports.getData = getData
module.exports.isEmpty = isEmpty
module.exports.takeName = takeName
module.exports.anyFn = anyFn
module.exports.willRunFixedCommand = willRunFixedCommand
module.exports.randomIndex = randomIndex
module.exports.willRequest = willRequest
module.exports.log = J.log
module.exports.lg = J.lg
module.exports.box = J.box
module.exports.save = db.save
module.exports.load = db.load
module.exports.loadParent = db.loadParent
module.exports.remove = db.remove
module.exports.removeParent = db.removeParent
module.exports.config = config
module.exports.getFileDirectory = R.compose(R.join("/"), R.init, R.split("/"))
module.exports.hapi = "http://localhost:3000"
module.exports.ils = "https://ilearnsmarter.com"
module.exports.randomSeed = randomSeed
