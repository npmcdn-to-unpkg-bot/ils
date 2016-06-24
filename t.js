"use strict"
// CAN BE COMMENTED OUT
const exec = require("child_process").exec
const fs = require("fs-extra")
const request = require("request")
const env = require("dotenv-helper")
const R = require("ramda")
// DONT MOVE
const J = require("justdo")
const expect = require("unexpected")
const tested = require("./common")
// const tested = require("./admin/_inc/a")
// const tested = require("./a")
// const tested = require("./b")
describe("proud-db",()=>{
    it("should work",(done)=>{
        willBe("parent","key","value").then((incoming)=>{
            J.lg(incoming)
            expect(true,"to be",true)
            done()
        })
    })
})
// WILLEXPORT
function will(moreIsLess) {
    return new Promise((resolve)=>{
        resolve(true)
    })
}
function willBe(moreIsLess) {
    let options = {clobber: true}
    return new Promise((resolve)=>{
        fs.copy(`${__dirname}/node_modules/proud-db/_db.json`,`${__dirname}/_inc/_db.json`,options,()=>{
            resolve(true)
        })
    })
}

// TESTING BOILERPLATE
function willRunFixedCommand(commandIs) {
    J.log(commandIs)
    return new Promise(function(resolve,reject) {
        let proc = exec(commandIs,{
            "cwd": __dirname
        })
        proc.stdout.on("data",function(chunk) {
            J.lg(chunk)
        })
        proc.stdout.on("error",function(error) {
            console.error(error)
        })
        proc.stdout.on("end",function() {
            resolve(true)
        })
        proc.stdout.on("error",function(error) {
            console.error(error)
            reject(error)
        })
    })
}

function randomIndex(arr) {
    let index = Math.floor(Math.random() * arr.length)
    return arr[ index ]
}

function isEmpty(question) {
    return R.isEmpty(question) || question === null || question === undefined
}
