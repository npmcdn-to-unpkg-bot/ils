"use strict"
const J = require("./common")
const R = require("ramda")
const RFantasy = require("ramda-fantasy")
const Either = RFantasy.Either
const Future = RFantasy.Future
const Identity = RFantasy.Identity
const Maybe = RFantasy.Maybe
const Just = RFantasy.Just

let commands = ["ls","free"]

function promiseWrapper(command){
    return new Promise((resolve)=>{
        J.willRunFixedCommand(command).then(resolve)
    })
}
let promisedCommand = R.composeP(promiseWrapper)
let commandAsync = R.compose(R.map((val)=>{
    return promisedCommand(val) 
}))

commandAsync(commands)