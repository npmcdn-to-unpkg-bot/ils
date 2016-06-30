"use strict"
const cheerio = require("cheerio")
const request = require("request")
const R = require("ramda")

function willRequest(url) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            "rejectUnauthorized": false
        }, (error, response, body) => {
            if (response.statusCode === 200) {
                resolve(body)
            } else {
                reject(error)
            }
        })
    })
}

function getData(url) {
    return new Promise((resolve) => {
        willRequest('https://allorigins.pw/get?url=' + encodeURIComponent(url)).then(function (incoming) {
            let willSend = JSON.parse(incoming)
            if(willSend.contents){
                resolve(willSend.contents)
            }else{
                resolve(null)
            }
        })
    })
}

function will(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        getData(`http://dictionary.cambridge.org/dictionary/german-english/${word}`).then((data)=>{
            let $ = cheerio.load(data)
            let selector = ".di-body"
            let willReturn = []
            $(selector).each(function(i) {
                let state = $(this).text().trim()
                R.split(",", state).map((val) => {
                    willReturn.push({
                        dePart: word,
                        enPart: val
                    })
                })
            })
            resolve(willReturn)
        })
    })
}

//will("mehrere").then(console.log)

const keyboard = new window.keypress.Listener();

keyboard.simple_combo("alt z", function() {
 let word = "mehrere"

will("mehrere").then(console.log)
})
