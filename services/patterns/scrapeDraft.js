"use strict"
const fs = require("fs-extra")
const scrapeIt = require("scrape-it")
const cheerio = require("cheerio")
const fetch = require("node-fetch")
const request = require("request")
const J = require("justdo")
const R = require("ramda")
const dbPath = "/home/just/ils/hapi/public/_db.json"
const dbPathRaw = "/home/just/ils/hapi/public/_dbRaw.json"
function test(id = 10000) {
    return new Promise((resolve) => {
        fetch("http://www.dict.cc/?s=mehrere").then((res)=>{
            if (res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
                let $ = cheerio.load(data)
                let willReturn = {}
                let stateArr = []
                let statePartialArr = []
                let selector = "tr"
                let flagNumber = 0
                $(selector).each(function(i) {
                    let state = $(this).text().trim()

                    if (state.includes("Andere")) {
                        flagNumber = i - 4
                        J.lg(state, "flag")
                    }
                })
                selector = "td.td7nl"
                let enPart
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    if (flagNumber <= i && i % 2 === 0) {
                        enPart = state
                    }
                    if (flagNumber <= i && i % 2 === 1) {
                        willReturn[ id ] = {
                            dePart: state,
                            enPart: enPart,
                            category: "preDraft",
                            id: id
                        }
                        id++
                    }
                })
                resolve({willReturn, id})
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
test().then(console.log)
//fs.readJson(dbPath, (err, dbState)=> {
//test(dbState.nextIndex).then((incoming)=>{
//dbState.data = R.merge(dbState.data, incoming.willReturn)
//dbState.nextIndex = incoming.id
//fs.writeJsonSync(dbPath, dbState)
//})
//})
