"use strict"
const J = require("./common")
const async = require("async")
const R = require("ramda")
const fs = require("fs")
const db = require("proud-db")
const translate = require("./admin/_inc/translate.js")
const scrapedParse = require("./_inc/scrapedParse.js")
const testData = require("./data0.json")
let words = require("./words")
let arr = R.splitEvery(30, words)
let willSave = {}
let index = 0
let willMap = arr[index].map(val=>{
    return function(callback){
        J.log(val)
        translate.deEnSave(val).then(incoming=>{
            willSave[val]=scrapedParse.main(incoming)    
            callback(null)
        })
    }
})
let willMapSecond = arr[index].map(val=>{
    return function(callback){
        J.log(val)
        
                promised().then(()=>{
                     fs.writeFile(`/home/ubuntu/workspace/ils/_inc/words/${val}.txt`, JSON.stringify(testData), (err) => {
                J.log(err)
                promised().then(()=>{
                callback(null)    
                })
                
            })
                })
           
    }
})
function promised(){
    return new Promise(resolve =>{
        setTimeout(resolve,2000)
    })
}
async.series(willMapSecond,
function(err, results) {
    //fs.writeJsonSync(`data${index}.json`,willSave)
J.log(1)
})
