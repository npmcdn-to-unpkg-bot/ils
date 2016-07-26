"use strict"
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
    let flag = false
    env.getEnv("adminIp").map(val=>{
        if (ip.includes(val)) {
            flag = true
        }
    })
    if (flag === false) {
        J.box(ip)
    }
    return flag
}
const logger = new (winston.Logger)({
    transports: [
        new (winston.transports.File)({
            name: "info-file",
            filename: "zMainLog.log",
            level: "info"
        }),
        new (winston.transports.File)({
            name: "error-file",
            filename: "zErrorLog.log",
            level: "error"
        }),
        new (winston.transports.Console)({
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
                console.log(err)
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
function start() {
    J.log("start")
    return new Promise(resolve=>{
        J.log("start")
        willRunFixedCommand("git pull")
        .then(()=>{
            J.log("start")
            willRunFixedCommand("pm2 start admin/ils.js").then(()=>{
                J.log("start")
                resolve(true)
            })
        })
    })
}
function stop() {
    return new Promise(resolve=>{
        willRunFixedCommand("npm stop")
        .then(()=>{
            willRunFixedCommand("pm2 stop 1").then(resolve)
        })
    })
}
let removePunctuation = R.compose(R.replace(/\.|\!|\,|\-|\?/, ""))
let takeName = R.compose(R.takeLast(1), R.split("/"))
let anyRaw = R.flip(R.any)
let anyFn = R.curry(anyRaw)
module.exports.twoLevelUp = R.compose(R.join("/"), R.dropLast(2), R.split("/"))
module.exports.start = start
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
