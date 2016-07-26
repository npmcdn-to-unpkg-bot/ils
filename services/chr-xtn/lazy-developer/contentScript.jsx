"use strict"
import * as R   from"ramda"
const reqwest  = require("reqwest")
const request  = require("request")
const cheerio  = require("cheerio")
const bringOrderTranslation  = require("./bringOrderTranslation")
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
let messageState = ""
let dataState = {}
let wordState = ""
function getData(url) {
    return new Promise((resolve) => {
        willRequest("https://allorigins.pw/get?url=" + encodeURIComponent(url)).then(function (incoming) {
            let willSend = JSON.parse(incoming)
            if (willSend.contents) {
                resolve(willSend.contents)
            } else {
                resolve(null)
            }
        })
    })
}
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
function test(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        willRequest(`http://www.fremdwort.de/suchen/synonym/${word}`).then(function(data) {
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
function testt(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        willRequest(`http://www.fremdwort.de/suchen/synonym/${word}`).then(function(data) {
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
        let willReturnDe= []
        let willReturnKeys= []
        let dePart
        let url = `http://de.langenscheidt.com/deutsch-englisch/${word}`
        willRequest(url).then((data)=>{
            let $ = cheerio.load(data)
            let selector = ".row-fluid .lkgEx"
            $(selector).each(function(i) {
                let localWord = $(this).text().trim()
                if(localWord.length > 0 && localWord.length < 70) {
                    willReturnDe.push(localWord)
                    willReturnKeys.push(i)
                }
            })
            selector = ".row-fluid .lkgExNormal"
            $(selector).each(function(i) {
                let localWord = $(this).text().trim()
                if(willReturnKeys.indexOf(i)!==-1){
                    willReturn.push({
                        dePart: willReturnDe[i],
                        enPart: localWord
                    })
                }
            })
            resolve(willReturn)
        })
    })
}
function phraseThird(wordRaw) {
    let word = wordRaw.trim().toLowerCase()
    return new Promise((resolve) => {
        willRequest(`http://www.phrasen.com/index.php?do=suche&q=${word}`).then(function(data) {
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
        willRequest(url).then((data)=>{
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

chrome.storage.local.get(function (data) {
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
		        this.willHandleClick = this.willHandleClick.bind(this)
		    }
		    static get defaultProps () {
		        return{
					incomingData: {}
		        }
		    }
			willHandleClick(){
				displayFlag = false
				ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
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
					marginLeft: "3%",
					marginTop: "3%"
				}
				let buttonStyle = {
					right:   "3%",
					zIndex:  "100",
					display: "inline"
				}
				return(
					<div style={containerStyle}>
					<div style={buttonStyle}>
						<button onClick={this.willHandleClick}>
							close
						</button>
					</div>
						<div style={innerStyle}>
							<Griddle results={this.props.incomingData} tableClassName="table" resultsPerPage={15} columns={["dePart","enPart"]}/>
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
            let willDisplay = {}
            console.log(wordState)
            test(wordState).then((incoming)=>{
                console.log(incoming)
				//displayFlag = true
				//ReactDOM.render(<GermanOverall incomingData={incoming}/>,document.getElementById("reactContainer"))
			})
		})
        keyHandler.simple_combo("ctrl alt q", ()=>{
            ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
			displayFlag = false
        })
        keyHandler.simple_combo("alt r", ()=>{
            ReactDOM.render(<GermanOverall incomingData={dataState}/>,document.getElementById("reactContainer"))
			displayFlag = true
        })
	}
})
keyHandler.simple_combo("alt q", ()=>{
    messageState = "GermanOverall is turned on"
	emitter.emit("notify")
	document.ondblclick = function () {
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
})

function requestTranslation (word) {
	return new Promise((resolve)=>{
		let willSend = {
			word: word
		}
		reqwest({
			url:     "http://localhost:3001/detoen",
			method:  "post",
			data:    willSend,
			error: function (err) { console.log(err)},
			success: function (resp) {
				resolve(resp)
			}
		})
	})
}

function posting (url,data) {
	return new Promise((resolve)=>{
		reqwest({
			url:     url,
			method:  "post",
			data:    data,
			error: function (err) { console.log(err)},
			success: function (resp) {
				resolve(resp)
			}
		})
	})
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
