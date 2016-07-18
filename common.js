"use strict"
const exec = require("child_process").exec
const request = require("request")
const R = require("ramda")
const db = require("proud-db")
const J = require("justdo")
const fs = require("fs-extra")
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
let takeName = R.compose(R.takeLast(1), R.split("/"))
let anyRaw = R.flip(R.any)
let anyFn = R.curry(anyRaw)

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
