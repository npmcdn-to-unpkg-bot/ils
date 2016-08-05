"use strict"
const J = require("justdo")
const R = require("ramda")
const mongoose = require("mongoose")
async function random(modelName = "Main") {
    let willReturn = {}
    willReturn.count = await count(modelName)
    let rand = Math.floor(Math.random() * willReturn.count)
    willReturn.main = await findOneSkip(modelName, rand)
    return willReturn.main
}
function count(modelName = "Main") {
    return new Promise(resolve=>{
        mongoose.model(modelName).count().exec((err, count) =>{
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
function counter() {
    return new Promise(resolve=>{
        mongoose.model("Counter").find({}, (error, incoming)=>{
            resolve(incoming[ 0 ].counter)
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
async function addMain(saveData = {}) {
    let willReturn = {}
    willReturn.counter = await counter()
    willReturn.main = await save("Main", R.merge(saveData, {id: willReturn.counter}))
    willReturn.holder = await increaseCounter()
    return willReturn.main
}
module.exports.addMain = (data)=>{return addMain(data)}
module.exports.random = (data)=>{return random(data)}
module.exports.counter = counter
module.exports.increaseCounter = ()=>{return increaseCounter()}
