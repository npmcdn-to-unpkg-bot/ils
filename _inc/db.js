"use strict"
const db = `${__dirname}/_db.json`
const fs = require("fs-extra")
const R = require("ramda")
const J = require("justdo")

function save(parent,childKey,childValue,overwriteFlag) {
    return new Promise((resolve)=>{
        fs.readJson(db,function (err,dbState) {
            let parentState = R.prop(parent,dbState)
            if(isEmpty(parentState)) {
                dbState[ parent ] = {}
                parentState = {}
            }
            let childState = R.prop(childKey,parentState)
            if(isEmpty(childState)) {
                parentState[ childKey ] = childValue
                dbState[ parent ] = parentState
            } else{
                if(overwriteFlag === true) {
                    delete dbState[ parent ][ childKey ]
                    let local = {}
                    local[ childKey ] = childValue
                    dbState[ parent ] = local
                } else{
                    return resolve(null)
                }
            }
            fs.outputJson(db,dbState,()=>{
                resolve(true)
            })
        })
    })
}

function load(parent,childKey) {
    return new Promise((resolve)=>{
        fs.readJson(db,(err,dbState)=>{
            if(dbState === undefined) {
                return resolve(null)
            }
            let parentState = R.prop(parent,dbState)
            if(parentState === undefined) {
                return resolve(null)
            }
            let childState = R.prop(childKey,parentState)
            if(childState === undefined) {
                return resolve(null)
            }
            resolve(childState)
        })
    })
}

function loadParent(parent) {
    return new Promise((resolve)=>{
        fs.readJson(db,(err,dbState)=>{
            if(dbState === undefined) {
                return resolve(null)
            }
            let parentState = R.prop(parent,dbState)
            J.lg(parentState)
            resolve(parentState)
        })
    })
}

function remove(parent,childKey) {
    return new Promise((resolve)=>{
        fs.readJson(db,(err,dbState)=>{
            let parentState = R.prop(parent,dbState)
            if(parentState === undefined) {
                return resolve(null)
            }
            let childState = R.prop(childKey,parentState)
            if(childState === undefined) {
                return resolve(null)
            }
            else{
                delete dbState[ parent ][ childKey ]
                fs.outputJson(db,dbState,()=>{
                    resolve(true)
                })
            }
        })
    })
}
function removeParent(parent) {
    return new Promise((resolve)=>{
        fs.readJson(db,(err,dbState)=>{
            let parentState = R.prop(parent,dbState)
            if(parentState === undefined) {
                return resolve(null)
            } else{
                delete dbState[ parent ]
                fs.outputJson(db,dbState,()=>{
                    resolve(true)
                })
            }
        })
    })
}

function isEmpty(question) {
    return R.isEmpty(question) || question === null || question === undefined
}

module.exports.save = save
module.exports.load = load
module.exports.loadParent = loadParent
module.exports.remove = remove
module.exports.removeParent = removeParent
