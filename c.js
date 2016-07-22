"use strict"
const J = require("./common")
const R = require("ramda")
const fs = require("fs-extra")
const translated = require("./temp.json").data
let willSave = {}
function pluckFn(prop, obj) {
    return R.compose(R.flatten, R.filter(val=>val !== false), R.values, R.mapObjIndexed((val, key)=>{
        J.log(key)
        if (key.includes(prop)) {
            return val
        } else {return false}
    }))(obj)
}
let deEnArr = pluckFn("deEn", translated)
let synonymArr = pluckFn("phrase", translated)
let phraseArr = pluckFn("phrase", translated)
J.log(deEnArr)
