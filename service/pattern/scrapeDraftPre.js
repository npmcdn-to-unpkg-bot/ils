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
let filterFn = R.compose(R.lt(R.__, 3), R.length, R.split("."))
let id
function test(pagination = 27) {
    return new Promise((resolve) => {
        fetch(`http://www.zitate-online.de/sprueche/kino-tv/seite${pagination}.html`).then((res)=>{
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
                let selector = ".witztext"
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    if (filterFn(state)) {
                        willReturn.push({
                            dePart: state,
                            enPart: "",
                            category: "preDraft",
                            id: id
                        })
                        id++
                    }
                })
                resolve(willReturn)
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
async function scrape(paginationArr) {
    let result
    let willReturn = []
    fs.readJson(dbPath, (err, dbState)=> {
        id = dbState.nextIndex
        for (let paginationIndex of paginationArr) {
            J.log(paginationIndex)
            result = await test(paginationIndex)
            willReturn.push(result)
        }
        return willReturn
    })

}

scrape(R.range(1, 27)).then((data)=>{
    fs.writeJsonSync(dbPathRaw, {data: R.flatten(data)})
})
//fs.readJson(dbPath, (err, dbState)=> {
//test(dbState.nextIndex).then((incoming)=>{
//dbState.data = R.merge(dbState.data, incoming.willReturn)
//dbState.nextIndex = incoming.id
//
//})
//})
