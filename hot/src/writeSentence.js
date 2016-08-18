"use strict"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import * as R from "ramda"
const reqwest = require("reqwest")
import J from "../../_inc/commonReact.js"
const winWidthIs = window.innerWidth * 1
const winHeightIs = window.innerHeight * 1
const singleWidth = Math.floor(winWidthIs / 100)
const fontSizeIs = Math.floor(singleWidth * 2.5)
const singleHeight = Math.floor(winHeightIs / 100)
const outerHalf = Math.floor(winWidthIs / 2)
const outerQuorter = Math.floor(winWidthIs / 4)
function randomSeed() {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
}
function createAltKey(keyIs) {
    if (keyIs === "ä") {
        return "a"
    } else if (keyIs === "ö") {
        return "o"
    } else if (keyIs === "ü") {
        return "u"
    } else if (keyIs === "ß") {
        return "s"
    } else {
        return false
    }
}
let expectedKey
export default class Only extends Component {
    constructor (props) {
        super(props)
        this.state = {
            globalData: [],
            data:{
                dePart:"Die unnötige Komplexität getötet die Katze",
                enPart:"The unnecessary complexity killed the cat"
            },
            previousWordStyle: "",
            currentWordStyle: "",
            wordStyle:{},
            visibleStyle:{},
            memeStyle:{},
            memeStyleContainer:{},
            inputFieldValue: "",
            index: 0,
            globalIndex: 0,
            wordIndex: 0,
            willCheck: [],
            willBeVisible: [],
            willBeHidden: [],
            currentCheck: "",
            flagReady:false,
            buttonText: "Show Answer",
            buttonStyle: "button"
        }
        this.willHandleKeyPress = this.willHandleKeyPress.bind(this)
        this.willHandleButton = this.willHandleButton.bind(this)
    }
    componentDidMount() {
        //J.postData(`${J.hapi}/orderSentence`,{}).then(incoming=>{
        J.postData(`${J.empty}/orderSentence`, {}).then(incoming=>{
            let globalData = J.shuffle(incoming)
            let data = globalData[ 0 ]
            this.setState({globalData, data}, ()=>{
                J.emitter.emit("init")
            })
        })
        J.emitter.on("init", ()=>{
            let willCheck = []
            let willBeVisible = []
            let willBeHidden = []
            let imageUrl = `https://unsplash.it/${outerHalf}/${singleHeight * 40}/?random&more=${randomSeed()}`
            R.split(" ", this.state.data.dePart).map((val)=>{
                if (!R.isEmpty(val)) {
                    willCheck.push(val)
                    willBeHidden.push(`${val} `)
                    willBeVisible.push(`${R.head(val)}${".".repeat(val.length - 1)} `)
                }
            })

            let memeStyleContainer = {
					                                                                                                                                                                                                                                                                                                                                backgroundImage: `url(${imageUrl})`,
                width:`${outerHalf}px`,
                height: `${singleHeight * 40}px`
			                                                                                                                                                                                                                                                }
            let memeStyle = {
                fontSize: "20px",
                backgroundColor: "#CFD8DC",
                color: "#546E7A",
                paddingLeft:`${singleWidth * 5}px`
            }
            let visibleStyle = {
                fontWeight: "800"
            }
            let wordStyle = {
                fontSize: `${singleHeight * 3}px`,
                paddingLeft:"8px",
                paddingRight:"8px"
            }
            this.setState({
                willCheck: willCheck,
                willBeVisible: willBeVisible,
                willBeHidden: willBeHidden,
                currentCheck: willCheck[ this.state.index ],
                visibleStyle: visibleStyle,
                wordStyle: wordStyle,
                memeStyle: memeStyle,
                memeStyleContainer: memeStyleContainer,
                buttonText: "Show Answer",
                buttonStyle: "button"
            })
        })
        J.emitter.on("add word", ()=>{
            let local = this.state.willBeVisible
            local[ this.state.index ] = `${this.state.currentCheck} `
            let stateBefore = R.join(" ", R.init(R.split(" ", this.state.inputFieldValue)))
            this.setState({
                inputFieldValue: `${stateBefore} ${this.state.currentCheck} `,
                currentCheck: this.state.willCheck[ this.state.index + 1 ],
                index: this.state.index + 1,
                previousWordStyle: "tag is-success",
                currentWordStyle: "tag is-warning",
                wordIndex: 0,
                willBeVisible: local
            })
        })
        J.emitter.on("add char", ()=>{
            this.setState({
                inputFieldValue: `${this.state.inputFieldValue}${expectedKey}`,
                wordIndex: this.state.wordIndex + 1
            })
        })
        J.emitter.on("show answer", ()=>{
            this.setState({
                inputFieldValue: R.join("", this.state.willBeHidden),
                willBeVisible: this.state.willBeHidden,
                previousWordStyle:"",
                currentWordStyle: "",
                flagReady: true,
                buttonText: "Next",
                buttonStyle: "button is-success"
            })
        })
        J.emitter.on("next", ()=>{
            let willBeIndex
            if (this.state.globalIndex === this.state.globalData.length - 1) {
                willBeIndex = 0
            } else {
                willBeIndex = this.state.globalIndex + 1
            }
            this.setState({
                data:this.state.globalData[ willBeIndex ],
                willCheck: [],
                willBeVisible: [],
                willBeHidden: [],
                inputFieldValue: "",
                index: 0,
                globalIndex: willBeIndex,
                wordIndex: 0,
                flagReady:false
            }, ()=>{
                J.emitter.emit("init")
                document.getElementById("focusMe").focus()
            })
        })
    }
    willHandleKeyPress (event) {
        if (this.state.flagReady && event.key === "Enter") {
            J.emitter.emit("next")
            return null
        }
        let stateRaw = `${event.target.value}${event.key}`
        let state = R.last(R.split(" ", stateRaw))
        let keyIs = event.key.toLowerCase()
        expectedKey = this.state.currentCheck[ this.state.wordIndex ]
        let expectedKeyAlt = createAltKey(this.state.currentCheck[ this.state.wordIndex ].toLowerCase())
        if (expectedKey.toLowerCase() === keyIs || expectedKeyAlt === keyIs) {
            if (state === this.state.currentCheck) {
                console.log(stateRaw.trim(), this.state.data.dePart)
                if (stateRaw.trim() === this.state.data.dePart) {
                    console.log("show answer")
                    J.emitter.emit("show answer")
                } else {
                    console.log("add word")
                    J.emitter.emit("add word")
                }
            } else {
                console.log("add char")
                J.emitter.emit("add char")
            }
        } else if (event.key === "Enter") {
            J.emitter.emit("show answer")
        } else if (event.key !== " ") {
            console.log(this.state.willBeHidden.length - 1, this.state.index)
            if (this.state.willBeHidden.length - 1 === this.state.index) {
                console.log("show answer")
                J.emitter.emit("show answer")
            }
        }
    }
    willHandleButton () {
        if (this.state.buttonText === "Show Answer") {
            J.emitter.emit("show answer")
        } else if (this.state.buttonText === "Next") {
            J.emitter.emit("next")
        }
    }
    render () {
        return (
    <div className="onlyContainer">
        <div className="box has-text-centered">
            <input type="text" id="focusMe" autoFocus size={this.state.data.dePart.length + 3} value={this.state.inputFieldValue} onKeyPress={this.willHandleKeyPress}/>
        </div>
        <div style={this.state.visibleStyle} className="box has-text-centered">
            {this.state.willBeVisible.map((val, key)=>{
                if (key === this.state.index - 1 && key !== this.state.willBeVisible.length - 1) {
                    return <span style={this.state.wordStyle} key={`${key}-word`} className={this.state.previousWordStyle}>{val}</span>
                } else if (key === this.state.index) {
                    return <span style={this.state.wordStyle} key={`${key}-word`} className={this.state.currentWordStyle}>{val}</span>
                } else {
                    return <span style={this.state.wordStyle} key={`${key}-word`}>{val}</span>
                }
            })}
            <a className={`${this.state.buttonStyle}`} onClick={this.willHandleButton}>{this.state.buttonText}</a>
        </div>
        <div className="columns box has-text-centered">
            <div className="column is-half is-offset-one-quarter  has-text-centered">
             <div style={this.state.memeStyleContainer} >
                <div style={this.state.memeStyle} className="has-text-centered">
                    {this.state.data.enPart}
                </div>
            </div>
            </div>
        </div>
	</div>
    )}
}
