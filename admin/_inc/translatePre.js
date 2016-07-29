"use strict"
const scrapeIt = require("scrape-it")
const cheerio = require("cheerio")
const fetch = require("node-fetch")
const request = require("request")
const R = require("ramda")
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
            if (res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
                let $ = cheerio.load(data)
                let selector = ".di-body"
                let willReturn = []
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    R.split(",", state).map((val)=>{
                        willReturn.push({
                            dePart: word,
                            enPart: val
                        })
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
function deEnThird(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        fetch(`http://www.fremdwort.de/suchen/uebersetzung/${word}`).then((res)=>{
            if (res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
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
            } else {resolve(null)}
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
            if (res.status !== 200) {
                console.log("response code error")
                resolve("response code error")
            } else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
                let $ = cheerio.load(data)
                let willReturn = []
                let selector = ".synonymeGroup"
                $(selector).each(function(i) {
                    let localWord = $(this).text().trim()
                    localWord.substring(1).split("\n").map(function(val) {
                        if (val.trim() !== "") {
                            willReturn.push({
                                dePart: val.trim(),
                                enPart: ""
                            })
                        }
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
function synonymSecond(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        fetch(`http://synonyme.woxikon.de/synonyme/${word}.php`).then(function(res) {
            if (res.status !== 200) {
                console.log("response code error")
                resolve("response code error")
            } else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
                let $ = cheerio.load(data)
                let counter = 0
                let willReturn = []
                let selector = ".inner"
                $(selector).each(function() {
                    let currentWord = $(this).text().trim()
                    if (counter == 0) {
                        let arr = currentWord.split("\n")
                        arr.map(function(value, key) {
                            let just = value.trim()
                            let localWord
                            if (key == arr.length - 1) {
                                localWord = just
                            } else {
                                localWord = just.substring(0, just.length - 1)
                            }
                            if (localWord !== currentWord && localWord !== "") {
                                willReturn.push({
                                    dePart: localWord,
                                    enPart: ""
                                })
                            }
                        })
                    }
                    counter++
                })
                resolve(willReturn)
            } else {resolve(null)}
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
            if (res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
                let willReturn = []
                let $ = cheerio.load(data)
                let selector = "#content .section ul li"
                $(selector).each(function(i) {
                    let localWord = $(this).text().trim()
                    willReturn.push({
                        dePart: localWord,
                        enPart: ""
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
function synonymFourth(word) {
    return new Promise((resolve) => {
        willRequest(`https://www.openthesaurus.de/synonyme/search?q=${word}&format=application/json`)
        .then(dataRaw=>{
            let data = JSON.parse(dataRaw)
            let willReturn = []
            data.synsets.map(val=>{
                willReturn = R.flatten([willReturn, R.pluck("term", val.terms)])
            })
            resolve(R.compose(R.map(val=>{return {dePart:val, enPart:""}}), R.sort((a, b)=>b.length - a.length))(willReturn))
        })
    })
}
function synonymFifth(word) {
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
                    willReturn.push(state)
                })
                if (willReturn.length > 11) {
                    resolve(R.compose(R.map(val=>{return {dePart:val, enPart:""}}), R.filter(val=> val.length > 3), R.sort((a, b)=>{return b.length - a.length}), R.drop(2), R.dropLast(9))(willReturn))
                } else {
                    resolve(null)
                }
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
function synonymSixth(word) {
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
                if (willReturn.length > 44) {
                    resolve(R.compose(R.map(val=>{return {dePart:val, enPart:""}}), R.filter(val=> R.indexOf("(", val) === -1 && R.indexOf(")", val) === -1 && val.length > 3), R.sort((a, b)=>{return b.length - a.length}), R.drop(10), R.dropLast(33))(willReturn))
                } else {
                    resolve(null)
                }

            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
function phraseFirst(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        let url = `http://de.langenscheidt.com/deutsch-englisch/${word}`
        let flag = false
        scrapeIt(url, {
            willReturn: {
                listItem: ".lemma-example",
                data: {
                    dePart: {
                        selector: ".col1 span span.text",
                        convert: state => {
                            flag = true
                            return state.trim()
                        }
                    },
                    enPart: {
                        selector: ".trans-line span.trans",
                        convert: state => {
                            if (flag) {
                                flag = false
                                return state.trim()
                            }
                        }
                    }
                }
            }
        }).then(incoming => {
            resolve(incoming.willReturn)
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
        scrapeIt(url, {
            data: {
                listItem: ".cit-type-example",
                data: {
                    dePart: {
                        selector: ".orth",
                        convert: (wordIs) => {
                            let localWord = R.replace("⇒", "", wordIs)
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
            if (res.status !== 200) {
                console.log("response code error")
                resolve(null)
            } else {
                return res.text()
            }
        }).then(function(data) {
            if (data) {
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
                        enPart: ""
                    })
                })
                let sortByLength = R.sortBy(R.compose((a)=>{return -a.length}, R.prop("dePart")))
                let sortByLengthLess = R.sortBy(R.compose((a)=>{return a.length}, R.prop("dePart")))
                let local = R.take(20, sortByLength(willReturn))
                let localSecond = R.take(10, sortByLengthLess(willReturn))
                resolve(R.flatten([local, localSecond]))
            } else {resolve(null)}
        }).catch((error) => {
            console.log(error)
            resolve(null)
        })
    })
}
function phraseFourth(word) {
    return new Promise((resolve) => {
        fetch(`http://www.dict.cc/?s=${word}`).then((res)=>{
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
                let selector = "tr"
                let flagNumber = 0
                let enPart
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    if (state.includes("Andere")) {
                        flagNumber = i - 4
                    }
                })
                selector = "td.td7nl"
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    if (flagNumber <= i && i % 2 === 0) {
                        enPart = state
                    }
                    if (flagNumber <= i && i % 2 === 1) {
                        willReturn.push({
                            dePart: state,
                            enPart: enPart
                        })
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
function phraseFifth(word) {
    return new Promise((resolve) => {
        fetch(`http://zitate.net/zitate/suche.html?query=${word}`).then((res)=>{
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
                let selector = "span.quote"
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    willReturn.push({
                        dePart: state,
                        enPart: ""
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
function phraseSixth(word) {
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
                let trimFn = R.compose(R.trim, R.head, R.split("["))
                let filterFn = R.compose(R.uniq, R.filter(val=>{
                    return val.length > 3 && val.length < 130
                }), R.map(val => trimFn(val)))
                let id = 0
                let flag = false
                let selector = "tr"
                $(selector).each(function(i) {
                    let state = $(this).text().trim()
                    switch (state) {
                    case "Zusammensetzungen":
                    case "Sprichwörter & Zitate":
                    case "Beispiele":
                        flag = true
                        break
                    case "Title":
                        flag = false
                        break
                    }
                    if (flag) {
                        willReturn.push($(this).find("td[lang=\"de\"]").text().trim())
                    }
                })
                willReturn = R.sort((a, b)=>a.length - b.length, filterFn(willReturn))
                resolve(R.map(val =>{return {dePart: val, enPart:""}}, willReturn))
            } else {resolve(null)}
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
            if (R.prop("dict", data) && R.prop("dict", data).length > 0) {
                let state = R.prop("dict", data)[ 0 ]
                if (R.prop("terms", state)) {
                    let local = R.prop("terms", state)
                    local.map((localState)=>{
                        willReturnTranslation.push({
                            dePart: word,
                            enPart: localState
                        })
                    })
                }
                if (R.prop("entry", state)) {
                    let local = R.prop("entry", state)
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
async function deEnTimerAsync(wordRaw) {
    let willReturn = {}
    let word = wordRaw.trim().toLowerCase()
    console.time("mixed")
    let local = await mixed(word)
    willReturn.deEnFirst = local.translation
    console.timeEnd("mixed")
    console.time("phraseFirst")
    willReturn.phraseFirst = await phraseFirst(word)
    console.timeEnd("phraseFirst")
    console.time("phraseSecond")
    willReturn.phraseSecond = await phraseSecond(word)
    console.timeEnd("phraseSecond")
    console.time("phraseThird")
    willReturn.phraseThird = await phraseThird(word)
    console.timeEnd("phraseThird")
    console.time("phraseFourth")
    willReturn.phraseFourth = await phraseFourth(word)
    console.timeEnd("phraseFourth")
    console.time("phraseFifth")
    willReturn.phraseFifth = await phraseFifth(word)
    console.timeEnd("phraseFifth")
    console.time("phraseSixth")
    willReturn.phraseSixth = await phraseSixth(word)
    console.timeEnd("phraseSixth")
    console.time("synonymFirst")
    willReturn.synonymFirst = await synonymFirst(word)
    console.timeEnd("synonymFirst")
    console.time("synonymSecond")
    willReturn.synonymSecond = await synonymSecond(word)
    console.timeEnd("synonymSecond")
    console.time("synonymThird")
    willReturn.synonymThird = await synonymThird(word)
    console.timeEnd("synonymThird")
    console.time("synonymFourth")
    willReturn.synonymFourth = await synonymFourth(word)
    console.timeEnd("synonymFourth")
    console.time("synonymFifth")
    willReturn.synonymFifth = await synonymFifth(word)
    console.timeEnd("synonymFifth")
    console.time("synonymSixth")
    willReturn.synonymSixth = await synonymSixth(word)
    console.timeEnd("synonymSixth")
    willReturn.synonymSeventh = local.related
    willReturn.word = word
    return willReturn
}

async function deEnAsync(wordRaw) {
    let willReturn = {}
    let word = wordRaw.trim().toLowerCase()
    let local = await mixed(word)
    willReturn.deEnFirst = local.translation
    willReturn.phraseFirst = await phraseFirst(word)
    willReturn.phraseSecond = await phraseSecond(word)
    willReturn.phraseThird = await phraseThird(word)
    willReturn.phraseFourth = await phraseFourth(word)
    willReturn.phraseFifth = await phraseFifth(word)
    willReturn.phraseSixth = await phraseSixth(word)
    willReturn.synonymFirst = await synonymFirst(word)
    willReturn.synonymSecond = await synonymSecond(word)
    willReturn.synonymThird = await synonymThird(word)
    willReturn.synonymFourth = await synonymFourth(word)
    willReturn.synonymFifth = await synonymFifth(word)
    willReturn.synonymSixth = await synonymSixth(word)
    willReturn.synonymSeventh = local.related
    willReturn.word = word
    return willReturn
}
async function deEnShortAsync(wordRaw) {
    let willReturn = {}
    let word = wordRaw.trim().toLowerCase()
    let mixedResult = await mixed(word)
    willReturn.deEnFirst = mixedResult.translation
    willReturn.synonymFirst = await synonymFirst(word)
    willReturn.synonymSecond = await synonymSecond(word)
    willReturn.synonymThird = mixedResult.related
    willReturn.synonymFourth = await synonymFourth(word)
    willReturn.synonymFifth = await synonymFifth(word)
    willReturn.phraseSecond = await phraseSecond(word)
    willReturn.phraseThird = await phraseThird(word)
    willReturn.phraseFourth = await phraseFourth(word)
    willReturn.phraseSixth = await phraseSixth(word)
    willReturn.word = word
    return willReturn
}
async function deEnArrAsync(arr) {
    let willMap = arr.map(val=>deEnSave(val))
    let willReturn = await Promise.all(willMap)
    return willReturn
}
function deEn(word) {
    return deEnAsync(word)
}
function deEnShort(word) {
    return deEnShortAsync(word)
}
function deEnTimer(word) {
    return new Promise(resolve=>{
        deEnTimerAsync(word).then(incoming=>{
            resolve(incoming)
        })
    })
}
function willRequest(url) {
    return new Promise((resolve, reject) => {
        request({
            url: url,
            "rejectUnauthorized": false
        }, (error, response, body) =>{
            if (response.statusCode === 200) {
                resolve(body)
            } else {
                reject(error)
            }
        })
    })
}
module.exports.deEn = deEn
module.exports.deEnShort = deEnShort
module.exports.deEnTimer = deEnTimer
module.exports.deEnFirst = deEnFirst
module.exports.deEnSecond = deEnSecond
module.exports.deEnThird = deEnThird
module.exports.mixed = mixed
module.exports.synonymFirst = synonymFirst
module.exports.synonymSecond = synonymSecond
module.exports.synonymThird = synonymThird
module.exports.synonymFourth = synonymFourth
module.exports.synonymFifth = synonymFifth
module.exports.synonymSixth = synonymSixth
module.exports.phraseFirst = phraseFirst
module.exports.phraseSecond = phraseSecond
module.exports.phraseThird = phraseThird
module.exports.phraseFourth = phraseFourth
module.exports.phraseFifth = phraseFifth
module.exports.phraseSixth = phraseSixth
