"use strict"
const fetch = require("node-fetch")
const cheerio = require("cheerio")
const fs = require("fs-extra")
const R = require("ramda")
const J = require("justdo")
let stateFn = R.compose(R.drop(3), R.dropLast(1))

function will(wordRaw) {
    return new Promise((resolve) => {
        fetch(`http://witze-und-spass.de/${wordRaw}`).then((res) => {
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
                let selector = "div.entry-content p"
                let willReturn = {}
                willReturn.main = []
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    J.log(stateFn(state))
                    willReturn.main.push({
                        dePart: stateFn(state),
                        enPart: " "
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
let keyword = "kellnerwitze"
will(keyword).then((data) => {
    
    fs.writeJsonSync(`${keyword}.json`,data)
})