"use strict"
const J = require("justdo")
const R = require("ramda")
const mongoose = require("mongoose")
async function random() {
    let willReturn = {}
    willReturn.count = await countCondition(condition)
    let rand = Math.floor(Math.random() * willReturn.count)
    willReturn.main = await findOneSkipCondition(rand, condition)
    return willReturn.main
}
async function randomCondition(condition = "this.imageSrc===undefined") {
    let willReturn = {}
    willReturn.count = await countCondition(condition)
    let rand = Math.floor(Math.random() * willReturn.count)
    willReturn.main = await findOneSkipCondition(rand, condition)
    return willReturn.main
}
function count() {
    return new Promise(resolve=>{
        let model = mongoose.model("Main")
        model.count().exec((err, count) =>{
            resolve(count)
        })
    })
}
function countCondition(condition) {
    return new Promise(resolve=>{
        let model = mongoose.model("Main")
        model.count({$where: condition}).exec((err, count) =>{
            resolve(count)
        })
    })
}
function findOneSkip(skipValue = 0) {
    return new Promise(resolve=>{
        let model = mongoose.model("Main")
        model.findOne().skip(skipValue).exec((err, result)=>{
            resolve(result)
        })
    })
}
function findOneSkipCondition(skipValue = 0, condition) {
    return new Promise(resolve=>{
        let model = mongoose.model("Main")
        model.model(modelName).findOne({$where: condition}).skip(skipValue).exec((err, result)=>{
            resolve(result)
        })
    })
}
function counter() {
    return new Promise(resolve=>{
        let model = mongoose.model("Main")
        model.model("Counter").find({}, (error, incoming)=>{
            resolve(incoming[ 0 ].counter)
        })
    })
}
function save(saveData = {}) {
    return new Promise(resolve=>{
        let model = mongoose.model("Main")
        model(saveData).save((err, incoming)=>{
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
async function addMain(saveData = {}) {
    let willReturn = {}
    willReturn.counter = await counter()
    willReturn.main = await save("Main", R.merge(saveData, {id: willReturn.counter}))
    willReturn.holder = await increaseCounter()
    return willReturn.main
}
module.exports.addMain = (data)=>{return addMain(data)}
module.exports.random = (modelName)=>{return random(modelName)}
module.exports.randomCondition = (modelName, condition)=>{return randomCondition(modelName, condition)}
module.exports.increaseCounter = ()=>{return increaseCounter()}
module.exports.findOneSkip = findOneSkip
module.exports.findOneSkipCondition = findOneSkipCondition
module.exports.count = count
module.exports.addMain = addMain
module.exports.save = save
module.exports.countCondition = countCondition
