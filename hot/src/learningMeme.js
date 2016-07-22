"use strict"
import React, { Component } from "react"
import R from "ramda"
import LazyLoad from "react-lazyload"
import J from "./components/commonReact.js"

let initOnce = R.once(()=>{
    J.emitter.emit("once init")
})
let store = {}

let initData = {
    "deWord": "",
    "enWord": "",
    "dePart": "",
    "enPart": "",
    imageSrc: "",
    "id": 419
}

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            globalIndex: 0,
            globalData: [],
            data: initData,
            answer: "",
            textTop: "",
            textBottom: "",
            inputFieldSize:20,
            inputFieldClassName:"inputField",
            buttonText: J.buttonTextShowAnswer,
            buttonClassName: J.bulButtonInit
        }
        this.handleAnswerInput = this.handleAnswerInput.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }
    componentDidMount() {
        J.emitter.on("once init", ()=>{
            //J.getData(`${J.host}/read/data`).then(incoming =>{
            J.getData("/_db.json").then(incoming =>{
                let globalDataFuture = R.compose(R.filter(val=>{
                    return R.type(val.imageSrc) === "String" && val.dePart.length < 73 && val.enPart.length < 73
                }), R.values)(incoming.data)
                globalDataFuture = J.shuffle(globalDataFuture)
                this.setState({
                    data: globalDataFuture[ 0 ],
                    globalData: globalDataFuture
                }, ()=>{
                    J.emitter.emit("init")
                })
            })
        })
        J.emitter.on("init", ()=>{
            let willTextTopRaw = R.split(" ", this.state.data.deWord)
            let willTextTop = R.compose(R.map(val=>J.hideTail(val)), R.split(" "))(this.state.data.deWord)
            let willTextBottom = R.compose(R.join(" "), R.map(val=>{
                willTextTopRaw.map((value, key)=>{
                    let {cleanStr, removedChar} = J.removePunctuation(val)
                    if (value === cleanStr) {
                        if (removedChar.length === 0) {
                            val = willTextTop[ key ]
                        } else {
                            val = `${willTextTop[ key ]}${removedChar[ 0 ]}`
                        }

                    }
                })
                return val
            }), R.split(" "))(this.state.data.dePart)
            this.setState({
                answer: "",
                textTop: `${R.join(" ", willTextTop)}|${this.state.data.enWord}`,
                textBottom: willTextBottom,
                buttonText: J.buttonTextShowAnswer,
                buttonClassName: J.bulButtonInit
            })
        })
        J.emitter.on("correct", ()=>{
            let domElement = document.getElementById("animationMarker")
            domElement.classList.add("correctAnswerLearningMeme")
            setTimeout(()=>{
                domElement.classList.remove("correctAnswerLearningMeme")
            }, 1000)
            J.emitter.emit("change button")
        })
        J.emitter.on("wrong", ()=>{
            let domElement = document.getElementById("animationMarker")
            domElement.classList.add("wrongAnswerLearningMeme")
            setTimeout(()=>{
                domElement.classList.remove("wrongAnswerLearningMeme")
            }, 1000)
            J.emitter.emit("change button")
        })
        J.emitter.on("check answer", ()=>{
            let deWord = this.state.data.deWord.toLowerCase()
            let altAnswer = R.compose(R.toLower, R.join(""), R.map(val =>J.returnEasyStyleGerman(val)), R.splitEvery(1))(deWord)
            let altAnswerSecond = R.compose(R.toLower, R.join(""),
            R.map(val =>J.returnOldStyleGerman(val)), R.splitEvery(1))(deWord)
            if (R.any(R.equals(this.state.answer.toLowerCase()))([deWord, altAnswer, altAnswerSecond])) {
                J.emitter.emit("correct")
            } else {
                J.emitter.emit("wrong")
            }
        })
        J.emitter.on("change button", ()=>{
            this.setState({
                buttonText: J.buttonTextNext,
                buttonClassName: J.bulButtonNext,
                textTop: `${this.state.data.deWord}|${this.state.data.enWord}`,
                textBottom: this.state.data.dePart
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
                globalIndex: willBeIndex
            }, ()=>{
                J.emitter.emit("init")
            })
        })
        initOnce()
    }
    handleButtonClick(event) {
        J.log(this.state.buttonText)
        if (this.state.buttonText === "Show Answer") {
            J.emitter.emit("change button")
        } else if (this.state.buttonText === "Next") {
            J.emitter.emit("next")
        }
    }
    handleAnswerInput (event) {
        if (event.key === "Enter") {
            if (this.state.buttonText === J.buttonTextNext) {
                J.emitter.emit("next")
            } else {
                J.emitter.emit("check answer")
            }
        }
        this.setState({
            answer: event.target.value
        }, ()=>{
            if (this.state.answer.length > this.state.inputFieldSize) {
                this.setState({inputFieldSize:this.state.answer.length})
            }
        })
    }
    render () {
        let memeHeight = J.getHeightPx(70)
        let memeWidth = memeHeight * 1.33
        let marginValue = J.divide(100 - J.getPart(memeWidth, J.getWidthPx(100)), 2)
        let fontTextTop = J.fontValueFn(this.state.textTop.length)
        let fontTextBottom = J.fontValueFn(this.state.textBottom.length)
        let fontTextBottomSecond = J.fontValueFn(this.state.data.enPart.length)
        let lineHeightTextTop = J.lineHeightFn(fontTextTop)
        let lineHeightTextBottom = J.lineHeightFn(fontTextBottom)
        let lineHeightTextBottomSecond = J.lineHeightFn(fontTextBottomSecond)
        let heightValue = J.getPercent(10, memeHeight)
        let gapValue = memeHeight - (3 * heightValue)
        let memeContainer = {
            padding: "0px",
            marginLeft: `${J.getWidthPx(marginValue)}px`,
            width: `${memeWidth}px`,
            height: `${memeHeight}px`,
            backgroundSize: "cover",
            backgroundImage: `url(${this.state.data.imageSrc})`
        }
        let memeTextTop = {
            top: "0px",
            fontWeight: "700",
            color: "#263238",
            fontSize: `${fontTextTop}%`,
            lineHeight: `${lineHeightTextTop}`,
            height: `${heightValue}px`,
            textOverflow: "ellipsis",
            width:  `${memeWidth}px`,
            backgroundColor: "#B0BEC5",
            whiteSpace: "nowrap",
            overflow: "hidden"
        }
        let gapStyle = {
            height: `${gapValue}px`
        }
        let memeTextBottom = R.merge(memeTextTop, {
            fontSize: `${fontTextBottom}%`,
            lineHeight: `${lineHeightTextBottom}`
        })
        let memeTextBottomSecond = R.merge(memeTextTop, {
            fontSize: `${fontTextBottomSecond}%`,
            lineHeight: `${lineHeightTextBottomSecond}`,
            backgroundColor: "#3c5a72",
            color: "#b2d0c4"
        })
        return (
    <div>
        <div className="box has-text-centered columns">
            <div id="animationMarker" className="column is-4 is-offset-4">
            <input autoFocus className={this.state.inputFieldClassName} type="text" value={this.state.answer} size={this.state.inputFieldSize} onChange={this.handleAnswerInput} onKeyPress={this.handleAnswerInput}/>
            </div>
            <div className="column is-4">
                <a className={this.state.buttonClassName} onClick={this.handleButtonClick}>{this.state.buttonText}</a>
            </div>
        </div>
        <div className="box has-text-centered is-fullwidth" style={memeContainer}>
            <div style={memeTextTop}>{this.state.textTop}</div>
            <div style={gapStyle}></div>
            <div style={memeTextBottom}>{this.state.textBottom}</div>
            <div style={memeTextBottomSecond}>{this.state.data.enPart}</div>
        </div>
	</div>
    )}
}
