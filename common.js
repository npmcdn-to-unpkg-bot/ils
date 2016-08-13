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
const winston = require("winston")
let store = {endMarker: "default"}
function timer(startMarker = "default") {
    console.timeEnd(store.endMarker)
    console.time(startMarker)
    store.endMarker = startMarker
}
function auth(ip) {
    J.lg(ip)
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
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: "info-file",
            filename: `zMainLog${env.getEnv("hostTag")}.log`,
            level: "info"
        }),
        new (winston.transports.File)({
            name: "error-file",
            filename: `zErrorLog${env.getEnv("hostTag")}.log`,
            level: "error"
        }),
        new (winston.transports.File)({
            name: "debug-file",
            filename: `zDebugLog${env.getEnv("hostTag")}.log`,
            level: "debug"
        })
    ]
})
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
    return isTypeLoose(obj, ["word", "deEn", "synonym", "synonymTranslated", "phrase", "phraseTranslated"])
}
let removePunctuation = R.compose(R.replace(/\.|\!|\,|\-|\?/, ""))
let takeName = R.compose(R.takeLast(1), R.split("/"))
let anyRaw = R.flip(R.any)
let anyFn = R.curry(anyRaw)
module.exports.oneLevelUp = R.compose(R.join("/"), R.dropLast(1), R.split("/"))
module.exports.twoLevelUp = R.compose(R.join("/"), R.dropLast(2), R.split("/"))
module.exports.isMainType = isMainType
module.exports.isTranslateDraftType = isTranslateDraftType
module.exports.firstLetterCapital = firstLetterCapital
module.exports.stop = stop
module.exports.auth = auth
module.exports.removePunctuation = removePunctuation
module.exports.timer = timer
module.exports.logger = logger
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
