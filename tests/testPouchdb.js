"use strict"
// CAN BE COMMENTED OUT
const exec = require("child_process").exec
const fs = require("fs-extra")
const request = require("request")
const env = require("dotenv-helper")
const R = require("ramda")

const databaseFactory = require("pouchdb",{adapter: "leveldb"})
let db = new databaseFactory("./_db")
// DONT MOVE
const J = require("justdo")
const expect = require("unexpected")
const tested = require("./common")

describe("common",()=>{
    it.skip("db - save new",(done)=>{
        dbSaveNew("GermanOverall","abkommen",{dePart: "here"}).then((incoming)=>{
            J.lg(incoming)
            expect(true,"to be",true)
            done()
        })
    })
    it.skip("db - save ",(done)=>{
        dbSave("GermanOverall","ttt",{dePart: "yyy"}).then((incoming)=>{
            J.lg(incoming)
            expect(true,"to be",true)
            done()
        })
    })
    it("db - delete",(done)=>{
        dbDelete("1").then((incoming)=>{
            J.lg(incoming)
            expect(true,"to be",true)
            done()
        })
    })
    it("db - load all",(done)=>{
        dbLoadAll().then((incoming)=>{
            J.lg(incoming)
            expect(true,"to be",true)
            done()
        })
    })
    it.skip("db - load",(done)=>{
        dbLoad("GermanOverall").then((incoming)=>{
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
function dbLoadAll() {
    return new Promise((resolve)=>{
        db.allDocs({include_docs: true,descending: true},function(err,doc) {
            resolve(doc.rows)
        })
    })
}

function dbLoad(parent) {
    return new Promise((resolve)=>{
        db.get(parent).then(resolve).catch(resolve)
    })
}

function dbDelete(parent) {
    return new Promise((resolve)=>{
        db.get(parent).then((parentIs)=>{
            return db.remove(parentIs)
        }).then(resolve).catch(resolve)
    })
}

function dbSave(parent,key,value) {
    return new Promise((resolve)=>{
        db.get(parent).then((dbCurrentState)=>{
            let dbFutureState = {}
            dbFutureState[ key ] = value
            return db.put(R.merge(dbFutureState,dbCurrentState))
        }).then(resolve).catch(resolve)
    })
}

function dbSaveNew(parent,key,value) {
    return new Promise((resolve)=>{
        let willSave = {}
        willSave[ "_id" ] = parent
        willSave[ key ] = value
        J.log(willSave)
        db.put(willSave).then(resolve).catch(resolve)
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
