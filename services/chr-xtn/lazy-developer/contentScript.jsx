"use strict"
import * as R from "ramda"
import {getData} from "../../../common.js"
const reqwest = require("reqwest")
const request = require("request")
const cheerio = require("cheerio")
import React, { Component } from "react"
const ReactDOM = require("react-dom")
const Griddle = require("griddle-react")
let keyHandler = new window.keypress.Listener()
let emitter = new Events()
const heightIs = window.innerHeight * 1
const widthIs = window.innerWidth * 1
const heightState = Math.floor(heightIs / 100)
const widthState = Math.floor(widthIs / 100)
let displayFlag = false
let flag = false
let messageState = ""
let dataState = {}
let wordState = ""
function returnOldStyleGerman(keyIs) {
    if (keyIs === "ä") {
        return "ae"
    } else if (keyIs === "ö") {
        return "oe"
    } else if (keyIs === "ü") {
        return "ue"
    } else if (keyIs === "ß") {
        return "ss"
    } else {
        return keyIs
    }
}
let sortDeFn = R.sortBy(R.compose(val=>{
    if (val === undefined) {
        return 0
    } else {return -val.length}
}, R.prop("dePart")))
let sortEnFn = R.sortBy(R.compose(val=>{
    if (val === undefined) {
        return 0
    } else {return -val.length}
}, R.prop("enPart")))
function uniq(arr, flag) {
    let holder = []
    let state = R.compose(R.map(val=>{
        return R.merge(val, {dePart: R.replace(/[0-9]/g, "", val.dePart)})
    }), R.filter(val=>{
        if (val !== null && val !== undefined && R.indexOf(val.dePart, holder) === -1 && val.dePart.length > 2 && val.dePart.length < 100 && R.indexOf("�", val.dePart) === -1) {
            holder.push(val.dePart)
            return true
        } else {return false}
    }))(arr)
    let dePart = R.compose(sortDeFn, R.filter(val=>{return val.enPart === ""}))(state)
    let enPart = R.compose(sortEnFn, R.filter(val=>{return val.enPart !== ""}))(state)
    return {dePart, enPart}
}
function willRequest(url) {
    return new Promise((resolve) => {
        let urlValue = `http://allorigins.pw/get?url=${encodeURIComponent(url)}`
        requestFn(urlValue).then(function (incoming) {
            let willSend = JSON.parse(incoming)
            if (willSend.contents) {
                resolve(willSend.contents)
            } else {
                resolve(null)
            }
        })
    })
}
function requestFn(url) {
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
function eighth(word) {
    return new Promise((resolve) => {
        willRequest(`http://ein.anderes-wort.de/fuer/${word}`).then(function(data) {
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
function seventh(word) {
    return new Promise((resolve) => {
        willRequest(`http://ein-anderes-wort.com/ein_anderes_wort_fuer_${word}.html`)
        .then(function(data) {
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
function sixth(word) {
    return new Promise((resolve) => {
        willRequest(`http://de.langenscheidt.com/deutsch-englisch/${word}`)
        .then((data)=>{
            if (data) {
                let willReturn = []
                let $ = cheerio.load(data)
                let selector = ".lemma-example .col1 span span.text"
                $(selector).each(function(i) {
                    let localWord = $(this).text().trim()
                    willReturn.push({
                        dePart: localWord.trim(),
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
function fifth(word) {
    return new Promise((resolve) => {
        willRequest(`http://www.collinsdictionary.com/dictionary/german-english/${word}`)
        .then((data)=>{
            if (data) {
                let willReturn = []
                let holderDePart = []
                let holderEnPart = []
                let $ = cheerio.load(data)
                let selector = ".cit-type-example .orth"
                $(selector).each(function(key) {
                    let localWord = $(this).text().trim()
                    localWord = R.replace("⇒", "", localWord)
                    holderDePart.push({val: localWord.trim(), key})
                })
                selector = ".cit-type-example .cit-type-translation"
                $(selector).each(function(key) {
                    let localWord = $(this).text().trim()
                    holderEnPart.push({val: localWord, key})
                })
                holderDePart.map(val=>{
                    let found = R.find(R.propEq("key", val.key))(holderEnPart)
                    if (found !== undefined) {
                        willReturn.push({
                            dePart: val.val,
                            enPart: found.val
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

function first(word) {
    return new Promise((resolve) => {
        willRequest(`http://www.phrasen.com/index.php?do=suche&q=${word}`).then((data)=>{
            if (data) {
                let willReturn = []
                let $ = cheerio.load(data)
                let selector = "a.zeile"
                $(selector).each(function(i) {
                    let localWord = $(this).text().trim()
                    willReturn.push({
                        dePart: localWord,
                        enPart: ""
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
function second(word) {
    return new Promise((resolve) => {
        willRequest(`http://www.dict.cc/?s=${word}`).then(function(data) {
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
function third(word) {
    return new Promise((resolve) => {
        willRequest(`http://zitate.net/zitate/suche.html?query=${word}`).then(function(data) {
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
function fourth(word) {
    return new Promise((resolve) => {
        willRequest(`http://www.uitmuntend.de/woerterbuch/${word}`).then(function(data) {
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
let selector = "[data-reactroot], [data-reactid]"
let flagReact = !!document.querySelector(selector)
//if (!flagReact) {
if (true) {
    let divFirst = document.createElement("div")
    let divSecond = document.createElement("div")
    divFirst.id = "reactContainer"
    divSecond.id = "reactContainerNotify"
    document.body.appendChild(divFirst)
    document.body.appendChild(divSecond)
    class WillNotify extends Component {
        constructor (props) {
            super(props)
        }
        static get defaultProps () {
            return {
                "message": "dummy message",
                "duration": 1000
            }
        }
        componentDidMount () {
            setTimeout(()=>{
                ReactDOM.unmountComponentAtNode(document.getElementById("reactContainerNotify"))
            }, this.props.duration * 1)
        }
        render() {
            let containerStyle = {
                position:        "fixed",
                zIndex:          "90",
                width:           `${widthIs}px`,
                height:          `${heightState * 17}px`,
                backgroundColor: "#f8f8f8",
                left:            "0px",
                top:             "0px"
            }
            let innerStyle = {
                color: "#332120",
                marginLeft: `${widthState * 20}px`,
                marginTop: `${heightState * 3}px`,
                padding: "20px"
            }
            let buttonStyle = {
                marginLeft:   "5px !important",
                paddingLeft:  "10px !important",
                paddingRight: "10px !important",
                zIndex:       "100",
                display:      "inline"
            }
            return (
        <div>
            <div style={containerStyle}>
                <div style={innerStyle}>
                {this.props.message}
                </div>
            </div>
        </div>
        )}
    }
    class GermanOverall extends Component {
        constructor (props) {
            super(props)
        }
        static get defaultProps () {
            return {
                incomingData: []
            }
        }
        render() {
            let willDisplay
            if (R.isEmpty(this.props.incomingData.dePart)) {
                willDisplay = [{longPart:"", shortPart:""}]
            } else {
                let state = R.splitEvery(Math.round(this.props.incomingData.dePart.length / 2),
                this.props.incomingData.dePart)
                willDisplay = R.zipWith((longPart, shortPart)=>{
                    return {longPart: longPart.dePart, shortPart: shortPart.dePart}
                }, state[ 0 ], state[ 1 ])
            }
            let rows = Math.round(heightIs / 77)
            let containerStyle = {
                position:        "fixed",
                zIndex:          "90",
                width:           "100%",
                height:          "100%",
                backgroundColor: "#B0BEC5",
                left:            "0%",
                top:             "0%"
            }
            let innerStyle = {
                color: "#263238",
                marginTop: "1vh",
                marginLeft: "6vh",
                marginRight: "6vh",
                marginBottom: "3vh"
            }
            return (
        <div style={containerStyle}>
            <div style={innerStyle}>
                <Griddle results={this.props.incomingData.enPart} tableClassName="table" resultsPerPage={rows} columns={["dePart", "enPart"]}/>
                <Griddle results={willDisplay} tableClassName="tableSecond" resultsPerPage={rows} columns={["longPart", "shortPart"]}/>
            </div>
        </div>
    )}
    }
    emitter.on("removeGermanOverall", function () {
        ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
    })
    emitter.on("notify", ()=>{
        ReactDOM.render(<WillNotify message={messageState}/>, document.getElementById("reactContainerNotify"))
    })
    emitter.on("translate", ()=>{
        Promise.all([first(wordState), second(wordState), third(wordState), fourth(wordState), fifth(wordState), sixth(wordState), seventh(wordState), eighth(wordState)])
            .then(incoming => {
                let willDisplay = uniq(R.flatten([incoming]))
                if (incoming.length > 0) {
                    dataState = willDisplay
                    displayFlag = true
                    ReactDOM.render(<GermanOverall incomingData={willDisplay}/>, document.getElementById("reactContainer"))
                } else {
                    messageState = "No Results!"
                    emitter.emit("notify")
                }
            })
    })
    keyHandler.simple_combo("alt w", ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
        displayFlag = false
    })
    keyHandler.simple_combo("esc", ()=>{
        ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
        displayFlag = false
    })
    keyHandler.simple_combo("alt r", ()=>{
        ReactDOM.render(<GermanOverall incomingData={dataState}/>, document.getElementById("reactContainer"))
        displayFlag = true
    })
}

keyHandler.simple_combo("alt q", ()=>{
    if (flag) {
        messageState = "Extended German-English Translation is turned OFF"
    } else {
        messageState = "Extended German-English Translation is turned ON"
    }
    flag = !flag
    emitter.emit("notify")
})
document.ondblclick = function () {
    if (flag) {
        let word = (document.selection && document.selection.createRange().text) ||
                  (window.getSelection && window.getSelection().toString())
        if (word.trim().length > 40) {
            console.log("this is long")
            console.log(R.take(40), word.trim())
        } else {
            if (displayFlag) {
                ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
            }
            let wordStateFuture = R.compose(R.join(""), R.map(val=>returnOldStyleGerman(val)), R.splitEvery(1), R.toLower, R.trim)(word)
            wordState = wordStateFuture
            messageState = wordStateFuture
            emitter.emit("notify")
            emitter.emit("translate")
        }
    }
}

function Events(target) {
    let events = {}, empty = []
    target = target || this
    target.on = function(type, func, ctx) {
        (events[ type ] = events[ type ] || []).push([func, ctx])
    }
    target.off = function(type, func) {
        type || (events = {})
        var list = events[ type ] || empty,
            i = list.length = func ? list.length : 0
        while (i--) func == list[ i ][ 0 ] && list.splice(i, 1)
    }
    target.emit = function(type) {
        let e = events[ type ] || empty, list = e.length > 0 ? e.slice(0, e.length) : e, i = 0, j
        while (j = list[ i++ ]) j[ 0 ].apply(j[ 1 ], empty.slice.call(arguments, 1))
    }
}
