"use strict"
import * as R   from"ramda"
const reqwest  = require("reqwest")
const request  = require("request")
const cheerio  = require("cheerio")
import React,{ Component } from"react"
const ReactDOM     = require("react-dom")
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
function uniq(arr, flag) {
    let holder = []
    return R.compose(R.sort((a, b)=> b.enPart.length - a.enPart.length), R.filter(val=>{
        if (val.dePart!==undefined&&val.enPart!==undefined&&
            R.indexOf(val.dePart, holder) === -1 && val.dePart.length > 2&&
            val.dePart.length < 100&&R.indexOf("�",val.dePart) === -1) {
            holder.push(val.dePart)
            return true
        } else {return false}
    }), R.map(val=>{
        return R.merge(val, {dePart: R.replace(/[0-9]/g, "", val.dePart)})
    }))(arr)
}
function willRequest(url) {
    return new Promise((resolve) => {
        requestFn(`http://allorigins.pw/get?url=${encodeURIComponent(url)}`).then(function (incoming) {
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
function first(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
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
        willRequest(`http://www.uitmuntend.de/woerterbuch/${word}/`).then(function(data) {
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
	let flagReact    = !!document.querySelector(selector)
	if(!flagReact) {
		let divFirst  = document.createElement("div")
		let divSecond = document.createElement("div")
		divFirst.id   = "reactContainer"
		divSecond.id  = "reactContainerNotify"
		document.body.appendChild(divFirst)
		document.body.appendChild(divSecond)
		class WillNotify extends Component {
		    constructor (props) {
		        super(props)
		    }
		    static get defaultProps () {
		        return{
		            "message": "dummy message",
					"duration": 1000
		        }
		    }
		    componentDidMount () {
				setTimeout(()=>{
					ReactDOM.unmountComponentAtNode(document.getElementById("reactContainerNotify"))
				},this.props.duration*1)
		    }
			render(){
				let containerStyle = {
					position:        "fixed",
					zIndex:          "90",
					width:           `${widthIs}px`,
					height:          `${heightState*17}px`,
					backgroundColor: "#f8f8f8",
					left:            "0px",
					top:             "0px"
				}
				let innerStyle = {
					color: "#332120",
					marginLeft: `${widthState*20}px`,
					marginTop: `${heightState*3}px`,
					padding: "20px"
				}
				let buttonStyle = {
					marginLeft:   "5px !important",
					paddingLeft:  "10px !important",
					paddingRight: "10px !important",
					zIndex:       "100",
					display:      "inline"
				}
				return(
					<div>
						<div style={containerStyle}>
							<div style={innerStyle}>
								{this.props.message}
							</div>
						</div>
					</div>
				)
			}
		}
		class GermanOverall extends Component {
		    constructor (props) {
		        super(props)
		    }
		    static get defaultProps () {
		        return{
					incomingData: {}
		        }
		    }
			render(){
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
					margin: "3vh"
				}
				return(
					<div style={containerStyle}>
						<div style={innerStyle}>
							<Griddle results={this.props.incomingData} tableClassName="table" resultsPerPage={20} columns={["dePart","enPart"]}/>
						</div>
					</div>
				)
			}
		}
		emitter.on("removeGermanOverall",function () {
			ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
		})
		emitter.on("notify",()=>{
			ReactDOM.render(<WillNotify message={messageState}/>,document.getElementById("reactContainerNotify"))
		})
		emitter.on("translate",()=>{
            Promise.all([first(wordState), second(wordState), third(wordState), fourth(wordState)])
            .then(incoming => {
                let willDisplay = uniq(R.flatten([incoming]))
                dataState = willDisplay
                displayFlag = true
                ReactDOM.render(<GermanOverall incomingData={willDisplay}/>,document.getElementById("reactContainer"))
            })
		})
        keyHandler.simple_combo("alt w", ()=>{
            ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
			displayFlag = false
        })
        keyHandler.simple_combo("alt r", ()=>{
            ReactDOM.render(<GermanOverall incomingData={dataState}/>,document.getElementById("reactContainer"))
			displayFlag = true
        })
	}

keyHandler.simple_combo("alt q", ()=>{
    if(flag){
        messageState = "Extended German-English Translation is turned OFF"
    }else{
        messageState = "Extended German-English Translation is turned ON"
    }
    flag = !flag
    emitter.emit("notify")
})
document.ondblclick = function () {
    if(flag){
        let word = (document.selection && document.selection.createRange().text) ||
                  (window.getSelection && window.getSelection().toString())
        if(word.trim().length>40){
            console.log("this is long")
            console.log(R.take(40),word.trim())
        } else{
            if(displayFlag){
                ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
            }
            wordState = word.trim().toLowerCase()
            messageState = word.trim().toLowerCase()
            emitter.emit("notify")
            emitter.emit("translate")
        }
    }
}

function Events(target){
  let events = {},empty = []
  target = target || this
  target.on = function(type,func,ctx){
    (events[ type ] = events[ type ] || []).push([func,ctx])
  }
  target.off = function(type,func){
    type || (events = {})
    var list = events[ type ] || empty,
        i = list.length = func ? list.length : 0
    while(i--) func == list[ i ][ 0 ] && list.splice(i,1)
  }
  target.emit = function(type){
    let e = events[ type ] || empty,list = e.length > 0 ? e.slice(0,e.length) : e,i=0,j
    while(j=list[ i++ ]) j[ 0 ].apply(j[ 1 ],empty.slice.call(arguments,1))
  }
}
