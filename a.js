"use strict"
const fetch = require("node-fetch")
const cheerio = require("cheerio")
const fs = require("fs-extra")
const R = require("ramda")
const J = require("justdo")
const tested = require("./hapi/public/sprechen.json")
let stateFn = R.compose(R.drop(1), R.head, R.split(".\""))

function will(wordRaw) {
    return new Promise((resolve) => {
        fetch("http://www.farkastranslations.com/books/Kafka_Franz-Prozess-en-de.html").then((res) => {
            if (res.status !== 200) {
                console.log("response code error")
                resolve(null)
            }
            else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
                let $ = cheerio.load(data)
                let selector = "tr td.col1"
                let willReturn = {}
                let willBeEn = []
                let willBeKeys = []
                let willBeDe = []
                willReturn.main = []
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    willBeEn.push(state)
                    if (i > 5 && state.length < 77) {
                        willBeKeys.push(i)
                    }
                })
                selector = "tr td.col2"
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    willBeDe.push(state)
                })
                willBeKeys.map((keyIs)=>{
                    willReturn.main.push({
                        dePart: willBeDe[ keyIs ],
                        enPart: willBeEn[ keyIs ]
                    })
                })
                resolve(willReturn)
            }
            else {
                resolve(null)
            }
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
let keyword = "zDerProcess"
let willSave = {}
willSave.data = R.filter(filtering, tested.main)
function filtering(data) {
    return R.prop("enPart", data).trim().length > 0
}
//fs.writeJsonSync(`hapi/public/db.json`, willSave)

will(keyword).then((data) => {
    fs.writeJsonSync(`${keyword}.json`, data)
})
