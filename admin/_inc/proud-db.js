"use strict"
const J = require("../../common")
const db = `${J.twoLevelUp(__dirname)}/hapi/public/de.json`
const fs = require("fs-extra")
const R = require("ramda")

function loadAll(parent) {
    return new Promise((resolve)=>{
        fs.readJson(db, (err, dbState)=>{
            console.log(err, dbState)
            resolve(dbState)
        })
    })
}

function saveParent(parent, data) {
    return new Promise((resolve)=>{
        fs.readJson(db, function (err, dbState) {
            dbState[ parent ] = data
            fs.outputJson(db, dbState, ()=>{
                resolve(true)
            })
        })
    })
}

/**
 * save - store a record to the json file
 *
 * @param  {string} parent
 * @param  {string} childKey
 * @param  {any} childValue - can be object, array or just another string
 * @return {Promise} resolves to true when record is made and to null when something is amiss
 */
function save(parent, childKey, childValue) {
    return new Promise((resolve)=>{
        fs.readJson(db, function (err, dbState) {
            let parentState = R.prop(parent, dbState)
            if (isEmpty(parentState)) {
                dbState[ parent ] = {}
            }
            dbState[ parent ][ childKey ] = childValue
            fs.outputJson(db, dbState, ()=>{
                resolve(true)
            })
        })
    })
}

/**
 * load - fetch a record from the database
 *
 * @param  {string} parent
 * @param  {string} childKey description
 * @return {Promise} resolves to the record if loading is successfull or to null on missing record
 */
function load(parent, childKey) {
    return new Promise((resolve)=>{
        fs.readJson(db, (err, dbState)=>{
            if (dbState === undefined) {
                return resolve(null)
            }
            let parentState = R.prop(parent, dbState)
            if (parentState === undefined) {
                return resolve(null)
            }
            let childState = R.prop(childKey, parentState)
            if (childState === undefined) {
                return resolve(null)
            }
            resolve(childState)
        })
    })
}

/**
 * loadParent - fetch a parent record
 *
 * @param  {string} parent
 * @return {type} resolves to the record if loading is successfull or to null on a missing record
 */
function loadParent(parent) {
    return new Promise((resolve)=>{
        fs.readJson(db, (err, dbState)=>{
            if (dbState === undefined) {
                return resolve(null)
            }
            let parentState = R.prop(parent, dbState)
            resolve(parentState)
        })
    })
}

/**
 * remove - remove a record
 *
 * @param  {string} parent
 * @param  {string} childKey
 * @return {Promise} resolves to true on successfull removal or to null on an already missing record
 */
function remove(parent, childKey) {
    return new Promise((resolve)=>{
        fs.readJson(db, (err, dbState)=>{
            let parentState = R.prop(parent, dbState)
            if (parentState === undefined) {
                return resolve(null)
            }
            let childState = R.prop(childKey, parentState)
            if (childState === undefined) {
                return resolve(null)
            }
            else {
                delete dbState[ parent ][ childKey ]
                fs.outputJson(db, dbState, ()=>{
                    resolve(true)
                })
            }
        })
    })
}
/**
 * remove - remove a parent record
 *
 * @param  {string} parent
 * @param  {string} childKey
 * @return {Promise} resolves to true on successfull removal or to null on an already missing record
 */
function removeParent(parent) {
    return new Promise((resolve)=>{
        fs.readJson(db, (err, dbState)=>{
            let parentState = R.prop(parent, dbState)
            if (parentState === undefined) {
                return resolve(null)
            } else {
                delete dbState[ parent ]
                fs.outputJson(db, dbState, ()=>{
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
module.exports.saveParent = saveParent
module.exports.load = load
module.exports.loadAll = loadAll
module.exports.loadParent = loadParent
module.exports.remove = remove
module.exports.removeParent = removeParent
