"use strict"
const J = require("justdo")
const R = require("ramda")
const mongoose = require("mongoose")
function gitHookTokenRead() {
    return new Promise(resolve=>{
        mongoose.model("GitHookToken").findOne().exec((err, result)=>{
            resolve(result)
        })
    })
}
function gitHookTokenWrite(data) {
    return new Promise(resolve=>{
        mongoose.model("GitHookToken").findOneAndUpdate({}, data, {new: true, upsert: true}).exec((err, result)=>{
            resolve(result)
        })
    })
}
async function random(modelName = "Main") {
    let willReturn = {}
    willReturn.count = await count(modelName)
    let rand = Math.floor(Math.random() * willReturn.count)
    willReturn.main = await findOneSkip(modelName, rand)
    return willReturn.main
}
async function randomCondition(modelName = "Main", condition = "this.imageSrc===undefined") {
    let willReturn = {}
    willReturn.count = await countCondition(modelName, condition)
    let rand = Math.floor(Math.random() * willReturn.count)
    willReturn.main = await findOneSkipCondition(modelName, rand, condition)
    return willReturn.main
}
function count(modelName = "Main") {
    return new Promise(resolve=>{
        mongoose.model(modelName).count().exec((err, count) =>{
            resolve(count)
        })
    })
}
function countCondition(modelName, condition) {
    return new Promise(resolve=>{
        mongoose.model(modelName).count({$where: condition}).exec((err, count) =>{
            resolve(count)
        })
    })
}
function findOneSkip(modelName = "Main", skipValue = 0) {
    return new Promise(resolve=>{
        mongoose.model(modelName).findOne().skip(skipValue).exec((err, result)=>{
            resolve(result)
        })
    })
}
function findOneSkipCondition(modelName = "Main", skipValue = 0, condition) {
    return new Promise(resolve=>{
        mongoose.model(modelName).findOne({$where: condition}).skip(skipValue).exec((err, result)=>{
            resolve(result)
        })
    })
}
function findOneAndUpdateMain(data) {
    return new Promise(resolve=>{
        mongoose.model("Main").findOneAndUpdate({id: data.id}, data, {new: true}).exec((err, result)=>{
            resolve(result)
        })
    })
}
function counter() {
    return new Promise(resolve=>{
        mongoose.model("Counter").find({}, (error, incoming)=>{
            resolve(incoming[ 0 ].counter)
        })
    })
}
function load(modelName, key, keyValue) {
    return new Promise(resolve=>{
        let obj = {}
        obj[ key ] = keyValue
        mongoose.model(modelName).find(obj, (error, incoming)=>{
            resolve(incoming)
        })
    })
}
function save(modelName = "Main", saveData = {}) {
    return new Promise(resolve=>{
        let Model = mongoose.model(modelName)
        Model(saveData).save((err, incoming)=>{
            resolve(incoming)
        })
    })
}
function increaseCounterFn(counterValue) {
    return new Promise(resolve=>{
        mongoose.model("Counter").findOneAndUpdate({$where: "this.counter>0"}, {counter: counterValue + 1}, (error, incoming)=>{
            resolve(incoming)
        })
    })
}
async function increaseCounter() {
    let willReturn = {}
    willReturn.counterValue = await counter()
    willReturn.counter = await increaseCounterFn(willReturn.counterValue)
    return willReturn.counter
}
async function addMain(saveData) {
    let willReturn = {}
    willReturn.counter = await counter()
    willReturn.main = await save("Main", R.merge(saveData, {id: willReturn.counter}))
    J.log(willReturn.main)
    willReturn.holder = await increaseCounter()
    return willReturn.main
}
module.exports.addMain = (data)=>{return addMain(data)}
module.exports.random = (modelName)=>{
    return new Promise(resolve=>{
        random(modelName).then(data=>{
            resolve(data)
        })
    })
}
module.exports.randomCondition = (modelName, condition)=>{return randomCondition(modelName, condition)}
module.exports.increaseCounter = ()=>{return increaseCounter()}
module.exports.findOneAndUpdateMain = findOneAndUpdateMain
module.exports.findOneSkip = findOneSkip
module.exports.findOneSkipCondition = findOneSkipCondition
module.exports.count = count
module.exports.addMain = addMain
module.exports.save = save
module.exports.load = load
module.exports.countCondition = countCondition
module.exports.gitHookTokenWrite = gitHookTokenWrite
module.exports.gitHookTokenRead = gitHookTokenRead
