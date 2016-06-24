"use strict"
const scrapeIt = require("scrape-it")
const cheerio = require("cheerio")
const fetch = require("node-fetch")
const request = require("request")
const J = require("justdo")
const R = require("ramda")

function timeoutFn(ms = 5000) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve([])
        },ms)
    })
}

function deEnFirst(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        willRequest(`https://api.mymemory.translated.net/get?q=${word}&langpair=de|en`).then(function(dataRaw) {
            let willReturnRaw = []
            let willReturn = []
            let data = JSON.parse(dataRaw)
            let mainTranslation = data.responseData.translatedText
            resolve([{
                dePart: wordRaw,
                enPart: mainTranslation
            }])
        }).catch((error) => {
            console.error(error)
            resolve(null)
        })
    })
}

function deEnSecond(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        fetch(`http://dictionary.cambridge.org/dictionary/german-english/${word}`).then((res)=>{
            if(res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else{
                return res.text()
            }
        }).then(function(data) {
            if(data) {
                let $ = cheerio.load(data)
                let selector = ".di-body"
                let willReturn = []
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    R.split(",",state).map((val)=>{
                        willReturn.push({
                            dePart: word,
                            enPart: val
                        })
                    })
                })
                resolve(willReturn)
            } else{resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}

function deEnThird(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        fetch(`http://www.fremdwort.de/suchen/uebersetzung/${word}`).then((res)=>{
            if(res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else{
                return res.text()
            }
        }).then(function(data) {
            if(data) {
                let willReturn = []
                let $ = cheerio.load(data)
                let selector = "#content .section ul li"
                $(selector).each(function(i) {
                    let localWord = $(this).text().trim()
                    willReturn.push({
                        dePart: word,
                        enPart: localWord
                    })
                })
                resolve(willReturn)
            } else{resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}

function enDeFirst(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        willRequest(`https://api.mymemory.translated.net/get?q=${word}&langpair=en|de`).then(function(dataRaw) {
            let willReturnRaw = []
            let willReturn = []
            let data = JSON.parse(dataRaw)
            let mainTranslation = data.responseData.translatedText
            resolve({
                dePart: mainTranslation,
                enPart: wordRaw
            })
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}

function synonymFirst(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        fetch(`http://ein.anderes-wort.de/fuer/${word}`).then(function(res) {
            if(res.status !== 200) {
                console.log("response code error")
                resolve("response code error")
            } else{
                return res.text()
            }
        }).then(function(data) {
            if(data) {
                let $ = cheerio.load(data)
                let willReturn = []
                let selector = ".synonymeGroup"
                $(selector).each(function(i) {
                    let localWord = $(this).text().trim()
                    localWord.substring(1).split("\n").map(function(val) {
                        if(val.trim() !== "") {
                            willReturn.push({
                                dePart: val.trim(),
                                enPart: word
                            })
                        }
                    })
                })
                resolve(willReturn)
            } else{resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}

function synonymSecond(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        fetch(`http://synonyme.woxikon.de/synonyme/${word}.php`).then(function(res) {
            if(res.status !== 200) {
                console.log("response code error")
                resolve("response code error")
            } else{
                return res.text()
            }
        }).then(function(data) {
            if(data) {
                let $ = cheerio.load(data)
                let counter = 0
                let willReturn = []
                let selector = ".inner"
                $(selector).each(function() {
                    let currentWord = $(this).text().trim()
                    if(counter == 0) {
                        let arr = currentWord.split("\n")
                        arr.map(function(value,key) {
                            let just = value.trim()
                            let localWord
                            if(key == arr.length - 1) {
                                localWord = just
                            } else{
                                localWord = just.substring(0,just.length - 1)
                            }
                            if(localWord !== currentWord && localWord !== "") {
                                willReturn.push({
                                    dePart: localWord,
                                    enPart: word
                                })
                            }
                        })
                    }
                    counter++
                })
                resolve(willReturn)
            } else{resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}

function synonymThird(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        fetch(`http://www.fremdwort.de/suchen/synonym/${word}`).then(function(res) {
            if(res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else{
                return res.text()
            }
        }).then(function(data) {
            if(data) {
                let willReturn = []
                let $ = cheerio.load(data)
                let selector = "#content .section ul li"
                $(selector).each(function(i) {
                    let localWord = $(this).text().trim()
                    willReturn.push({
                        dePart: localWord,
                        enPart: word
                    })
                })
                resolve(willReturn)
            } else{resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}

function phraseFirst(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        let flag = false
        let willReturn = []
        let dePart
        let url = `http://de.langenscheidt.com/deutsch-englisch/${word}`
        scrapeIt(url,{
            examples: {
                listItem: ".row-fluid",
                data: {
                    dePart: {
                        selector: ".lkgEx",
                        convert: (wordIs) => {
                            if(wordIs.length > 0 && wordIs.length < 70) {
                                flag = true
                                dePart = wordIs
                            } else{
                                flag = false
                            }
                        }
                    },
                    enPart: {
                        selector: ".lkgExNormal",
                        convert: (wordIs) => {
                            if(flag && wordIs.length > 0 && wordIs.length < 70) {
                                let just = {}
                                just.dePart = dePart
                                just.enPart = wordIs
                                willReturn.push(just)
                            }
                        }
                    }
                }
            }
        }).then(() => {
            resolve(willReturn)
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}

function phraseSecond(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        let url = `http://www.collinsdictionary.com/dictionary/german-english/${word}`
        scrapeIt(url,{
            data: {
                listItem: ".cit-type-example",
                data: {
                    dePart: {
                        selector: ".orth",
                        convert: (wordIs) => {
                            let localWord = R.replace("⇒","",wordIs)
                            return localWord.trim()
                        }
                    },
                    enPart: {
                        selector: ".cit-type-translation",
                        convert: (wordIs) => {
                            return wordIs
                        }
                    }
                }
            }
        }).then((data) => {
            resolve(data.data)
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}

function phraseThird(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        fetch(`http://www.phrasen.com/index.php?do=suche&q=${word}`).then(function(res) {
            if(res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else{
                return res.text()
            }
        }).then(function(data) {
            if(data) {
                let willReturn = []
                let $ = cheerio.load(data)
                let selector = "a.zeile"
                $(selector).each(function(i) {
                    let localWord = $(this).text().trim()
                    willReturn.push({
                        dePart: localWord,
                        enPart: word
                    })
                })
                selector = "a.zeile1"
                $(selector).each(function(i) {
                    let localWord = $(this).text().trim()
                    willReturn.push({
                        dePart: localWord,
                        enPart: word
                    })
                })
                let sortByLength = R.sortBy(R.compose((a)=>{return-a.length},R.prop("dePart")))
                let sortByLengthLess = R.sortBy(R.compose((a)=>{return a.length},R.prop("dePart")))
                let local = R.take(20,sortByLength(willReturn))
                let localSecond = R.take(10,sortByLengthLess(willReturn))
                resolve(R.flatten([local,localSecond]))
            } else{resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}

function mixed(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve)=>{
        let url = `https://clients5.google.com/translate_a/t?client=dict-chrome-ex&sl=de&tl=en&q=${word}`
        willRequest(url).then((dataRaw)=>{
            let data = JSON.parse(dataRaw)
            let willReturn = {}
            let willReturnTranslation = []
            let willReturnRelated = []
            if(R.prop("dict",data) && R.prop("dict",data).length > 0) {
                let state = R.prop("dict",data)[ 0 ]
                if(R.prop("terms",state)) {
                    let local = R.prop("terms",state)
                    local.map((localState)=>{
                        willReturnTranslation.push({
                            dePart: word,
                            enPart: localState
                        })
                    })
                }
                if(R.prop("entry",state)) {
                    let local = R.prop("entry",state)
                    local.map((val)=>{
                        val.reverse_translation.map((value)=>{
                            willReturnRelated.push({
                                dePart: value,
                                enPart: val.word
                            })
                        })
                    })
                }
            }
            willReturn.translation = willReturnTranslation
            willReturn.related = willReturnRelated
            resolve(willReturn)
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}

let willReturnMain = {}

async function deEnAsync(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    let local = await mixed(word)
    willReturnMain.deEnFourth = local.translation
    willReturnMain.synonymFirst = await synonymFirst(word)
    willReturnMain.synonymFourth = local.related
    willReturnMain.phraseFirst = await phraseFirst(word)
    willReturnMain.phraseSecond = await phraseSecond(word)
    willReturnMain.phraseThird = await phraseThird(word)
    willReturn.synonymSecond = await synonymSecond(word)
    willReturnMain.synonymThird = await synonymThird(word)
    return willReturnMain
}


function deEn(word,ms = 10000) {
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve(willReturnMain)
        },ms)
        deEnAsync(word).then((result)=>{
            resolve(result)
        })
    })
}

function willRequest(url) {
    return new Promise((resolve,reject) => {
        request({
            url: url,
            "rejectUnauthorized": false
        },(error,response,body) =>{
            if(response.statusCode === 200) {
                resolve(body)
            } else{
                reject(error)
            }
        })
    })
}

module.exports.deEn = deEn

module.exports.timeoutFn = timeoutFn
module.exports.deEnFirst = deEnFirst
module.exports.deEnSecond = deEnSecond
module.exports.deEnThird = deEnThird
module.exports.mixed = mixed
module.exports.synonymFirst = synonymFirst
module.exports.synonymSecond = synonymSecond
module.exports.synonymThird = synonymThird
module.exports.phraseFirst = phraseFirst
module.exports.phraseSecond = phraseSecond
