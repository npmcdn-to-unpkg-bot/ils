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
let removeLongSentences = R.compose(R.lt(R.__, 3), R.length, R.split("."))
let id = fs.readJsonSync(dbPath).nextIndex
let willSave = {}
function will(pagination) {
    return new Promise((resolve) => {
        fetch(`http://www.gratis-spruch.de/sprueche/Zitate-Leben/kid/15/ukid/104/${pagination}`).then((res)=>{
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
                let selector = "div.spruch a"
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    if (removeLongSentences(state) && state.length < 80 && state.length > 40) {
                        willSave[ id ] = {
                            dePart: state,
                            enPart: "",
                            category: "preDraft",
                            id: id
                        }
                        id++
                    }
                })
                resolve(true)
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
async function scrape(paginationArr) {
    let willReturn = []
    let result
    for (let paginationIndex of paginationArr) {
        J.log(paginationIndex)
        result = await will(paginationIndex)
        willReturn.push(result)
        J.lg(result)
    }
    return willReturn
}
scrape(R.range(2, 331)).then((data)=>{
    fs.writeJsonSync(dbPathRaw, {data: willSave})
})

//fs.readJson(dbPath, (err, dbState)=> {
//test(dbState.nextIndex).then((incoming)=>{
//dbState.data = R.merge(dbState.data, incoming.willReturn)
//dbState.nextIndex = incoming.id
