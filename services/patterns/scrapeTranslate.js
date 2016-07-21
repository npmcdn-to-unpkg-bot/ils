"use strict"
const fs = require("fs-extra")
const scrapeIt = require("scrape-it")
const cheerio = require("cheerio")
const fetch = require("node-fetch")
const request = require("request")
const J = require("../../common")
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
function willB(word) {
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
                if(willReturn.length>44){
                    resolve(R.compose(R.map(val=>{return {dePart:val, enPart:""}}),R.filter(val=> R.indexOf("(",val)===-1&&R.indexOf(")",val)===-1&&val.length>3),R.sort((a,b)=>{return b.length-a.length}),R.drop(10),R.dropLast(33))(willReturn))
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
function willBee(word) {
    return new Promise((resolve) => {
        fetch(`http://ein.anderes-wort.de/fuer/${word}`).then((res)=>{
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
                let selector = "li a"
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    J.log(state,i)
                    willReturn.push(state)
                })
                if(willReturn.length>11){
                    resolve(R.compose(R.map(val=>{return {dePart:val, enPart:""}}),R.filter(val=> val.length>3),R.sort((a,b)=>{return b.length-a.length}),R.drop(2),R.dropLast(9))(willReturn))
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
function willBe(word) {
    return new Promise((resolve) => {
        fetch(`http://de.langenscheidt.com/deutsch-englisch/${word}`).then((res)=>{
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
                let selector = ".col1 span span.text"
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    willReturn.push({dePart: state})
                })
                selector = ".trans-line span.trans"
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    willReturn[i] = R.merge(willReturn[i],{enPart:state})
                })
                resolve(willReturn)
                // if(willReturn.length>11){
                //     resolve(R.compose(R.map(val=>{return {dePart:val, enPart:""}}),R.filter(val=> val.length>3),R.sort((a,b)=>{return b.length-a.length}),R.drop(2),R.dropLast(9))(willReturn))
                // }else{
                //     resolve(null)
                // }
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
function wil(word) {
    return new Promise((resolve) => {
        J.getData(`https://www.openthesaurus.de/synonyme/search?q=${word}&format=application/json`).then(data=>{
            let willReturn = []
            data.synsets.map(val=>{
                willReturn = R.flatten([willReturn,R.pluck("term",val.terms)])
            })
            resolve(R.compose(R.map(val=>{return {dePart:val,enPart:""}}),R.sort((a,b)=>b.length-a.length))(willReturn))
        })
    })
}
function phraseFifth(word) {
    return new Promise((resolve) => {
        fetch(`http://www.duden.de/rechtschreibung/${word}`).then((res)=>{
            if (res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
                let filterFn = R.compose(R.trim, R.join(" "), R.split(" "), R.ifElse((data)=>{R.length(data) === 1}, R.always, R.last), R.split(">:"))
                let $ = cheerio.load(data)
                let willReturn = []
                let selector = "#Bedeutung1 .term-section ul li"
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    willReturn.push({
                        dePart: filterFn(state),
                        enPart: word
                    })
                })

                resolve(willReturn)
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
phraseFifth("wenig").then(incoming=>{
    J.log(incoming)
})
