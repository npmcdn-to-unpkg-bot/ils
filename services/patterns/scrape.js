"use strict"
const fs = require("fs-extra")
const scrapeIt = require("scrape-it")
const cheerio = require("cheerio")
const fetch = require("node-fetch")
const request = require("request")
const J = require("justdo")
const R = require("ramda")
function will(pagination = 27) {
    return new Promise((resolve) => {
        fetch(`https://www.reddit.com/r/javascript/`).then((res)=>{
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

function will(subreddit="javascript") {
    return new Promise(resolve => {
        let flag = false
        let counter = 0
        let willReturn = []
        let url = `https://www.reddit.com/r/${subreddit}/`
        scrapeIt(url, {
            examples: {
                listItem: "p.title",
                data: {
                    itemHref: {
                        selector: "a",
                        attr: "href",
                        convert: (incoming) => {
                            if(R.take(3,incoming)!=="/r/"){
                                //J.box(incoming)
                            }
                            //return incoming
                        }
                    },
                    item: {
                        selector: "a",
                        attr: "href",
                        convert: (wordIs) => {
                            if(wordIs.includes(`reddit.com/r/${subreddit}/new/?count=`)){
                                J.lg(wordIs)
                            }else{J.log(wordIs)}
                            //return wordIs
                        }
                    }
                }
            },
            navigation: {
                selector: "span.nextprev a",
                attr: "href"
            }
        }).then(data => {
            resolve(data)
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
will().then(J.log)
