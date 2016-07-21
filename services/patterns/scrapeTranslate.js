"use strict"
const fs = require("fs-extra")
const scrapeIt = require("scrape-it")
const cheerio = require("cheerio")
const fetch = require("node-fetch")
const request = require("request")
const J = require("justdo")
const R = require("ramda")
let trimFn = R.compose(R.trim, R.head, R.split("["))
let filterFn = R.compose(R.uniq, R.filter(val=>{
    return val.length > 3 && val.length < 130
}), R.map(val => trimFn(val)))
function will(word) {
    return new Promise((resolve) => {
        fetch(`http://www.uitmuntend.de/woerterbuch/${word}/`).then((res)=>{
            if (res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
                let $ = cheerio.load(data)
                let willReturn = []
                let rawSelectionShort = []
                let rawSelectionLong = []
                let id = 0
                let flag = false
                let selector = "tr"
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    switch(state){
                        case "Zusammensetzungen":
                        case "Sprichwörter & Zitate":
                        case "Beispiele":
                        flag = true
                        break;
                        case "Title":
                        flag = false
                        break;
                    }
                    if(flag){
                        willReturn.push($(this).find(`td[lang="de"]`).text().trim())
                    }
                })
                resolve(R.sort((a,b)=>a.length-b.length,filterFn(willReturn)))
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
function willBe(word) {
    return new Promise((resolve) => {
        fetch(`http://ein-anderes-wort.com/ein_anderes_wort_fuer_${word}.html`).then((res)=>{
            if (res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
                let $ = cheerio.load(data)
                let willReturn = []
                let id = 0
                let flag = false
                let selector = "a"
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    willReturn.push(state)
                })
                //resolve(R.sort((a,b)=>a.length-b.length,filterFn(willReturn)))
                if(willReturn.lenght>44){
                    resolve(R.compose(R.drop(10),R.dropLast(33))(willReturn))
                }else{
                    resolve(null)
                }
                
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}

willBe("wenig").then(incoming=>{
    J.log(R.take(10,incoming))
    J.log(R.takeLast(10,incoming))
    
})
