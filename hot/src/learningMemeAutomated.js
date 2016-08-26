"use strict"
console.log("start".toUpperCase(), Date.now())
import React, { Component } from "react"
import Alert from "react-s-alert"
import R from "ramda"
import J from "../../_inc/commonReact.js"
//import Navigation from "./components/navigation.js"
const LazyPromise = require("lazy-promise")
let initOnce = R.once(()=>{
    J.emitter.emit("once init")
})
let mainIntervalValue = 4000
let secondaryIntervalValue = 1000
let messageIntervalValue = 1500
let initData = {
    "deWord": "",
    "enWord": "",
    "dePart": "",
    "enPart": "",
    imageSrc: "",
    "id": 0
}
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            answer: "",
            automatedMode: false,
            buttonText: J.buttonTextShowAnswer,
            buttonClassName: J.bulButtonInit,
            data: initData,
            globalIndex: 0,
            globalData: [],
            inputFieldSize:20,
            imageSrcCache:"",
            inputFieldClassName:"inputField",
            textTopLeft: "",
            textTopRight: "",
            textBottom: "",
            textBottomSecond: ""
        }
        this.handleAnswerInput = this.handleAnswerInput.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
        this.notify = this.notify.bind(this)
    }
    componentDidMount() {
        console.log("componentDidMount".toUpperCase(), Date.now())
        setTimeout(()=>{
            J.getItem("messageSeen").then(messageSeenData=>{
                if (null === null) {
                    let messageIndex = 0
                    let messageInterval = setInterval(()=>{
                        this.notify(J.config.learningMemeAutomatedAlert[ messageIndex ])
                        messageIndex++
                        if (messageIndex === J.config.learningMemeAutomatedAlert.length) {
                            clearInterval(messageInterval)
                            J.setItem("messageSeen", true)
                        }
                    }, messageIntervalValue)
                }
            })
        }, 60000)
        let interval = setInterval(()=>{
            if (this.state.automatedMode && this.state.textTopLeft !== "") {
                if (this.state.answer.length < this.state.textTopLeft.length) {
                    let answer = this.state.answer + this.state.data.deWord[ this.state.answer.length ]
                    this.setState({answer})
                } else {
                    this.setState({automatedMode: false}, ()=>{
                        J.emitter.emit("correct")
                        setTimeout(()=>{
                            document.getElementById("button").click()
                        }, mainIntervalValue)
                    })
                }
            }
        }, 100)
        J.emitter.on("once init", ()=>{
            J.postData(`${J.ils}/learningMeme`, {}).then(learningMemeData =>{
                console.log("data is here".toUpperCase(), Date.now())
                let globalData = J.shuffle(learningMemeData)
                let promisedArr = globalData.map(val=>{
                    return new LazyPromise(resolve=>{
                        J.getItem(`${val.id}-imageSrc`).then(localforageData=>{
                            if (localforageData === null) {
                                J.convertImgToBase64(val.imageSrc).then(data=>{
                                    J.setItem(`${val.id}-imageSrc`, data).then(()=>{
                                        J.log(`saved ${val.id}`)
                                        resolve("saved")
                                    })
                                })
                            } else {
                                J.log(`${val.id}-imageSrc is cached`)
                                resolve("cached")
                            }
                        })

                    })
                })
                if ("requestIdleCallback" in window) {
                    J.log("start")
                    let index = 0
                    let flag = true
                    function myNonEssentialWork(deadline) {
                        if (deadline.timeRemaining() > 0) {
                            console.log("will try perform idle callback")
                            console.log("flag", flag)
                            if (flag) {
                                index++
                                flag = false
                                promisedArr[ index ].then(()=>{
                                    console.log("index", index)
                                    setTimeout(()=>{
                                        flag = true
                                    }, 500)
                                })
                            }
                        }
                        if (index < promisedArr.length - 1) {
                            console.log("will request idle callback")
                            setTimeout(()=>{
                                requestIdleCallback(myNonEssentialWork)
                            }, 500)
                        } else {J.log("idle callback is done")}
                    }
                    requestIdleCallback(myNonEssentialWork)
                } else {
                    Promise.all(promisedArr).then(data=>{
                        J.log("requestIdleCallback is missing")
                        J.log(data.length)
                    })
                }
                this.setState({
                    data: globalData[ 0 ],
                    globalData
                }, ()=>{
                    J.emitter.emit("init")
                })
            })
        })
        J.emitter.on("init", ()=>{
            J.log(this.state.data)
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
            J.getItem(`${this.state.data.id}-imageSrc`).then(data=>{
                if (data === null) {
                    J.log("NOT CACHE")
                    this.setState({
                        answer: "",
                        imageSrcCache: J.httpsFn(this.state.data.imageSrc),
                        textTopLeft: R.join(" ", willTextTop),
                        textTopRight: this.state.data.enWord,
                        textBottom: willTextBottom,
                        textBottomSecond: this.state.data.enPart,
                        buttonText: J.buttonTextShowAnswer,
                        buttonClassName: J.bulButtonInit
                    }, ()=>{
                        setTimeout(()=>{
                            this.setState({automatedMode: true})
                        }, secondaryIntervalValue)
                    })
                } else {
                    J.log("cache hit")
                    this.setState({
                        answer: "",
                        imageSrcCache: data,
                        textTopLeft: R.join(" ", willTextTop),
                        textTopRight: this.state.data.enWord,
                        textBottom: willTextBottom,
                        textBottomSecond: this.state.data.enPart,
                        buttonText: J.buttonTextShowAnswer,
                        buttonClassName: J.bulButtonInit
                    }, ()=>{
                        setTimeout(()=>{
                            this.setState({automatedMode: true})
                        }, secondaryIntervalValue)
                    })
                }
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
            if (R.any(R.equals(this.state.answer.toLowerCase()))([deWord.trim(), altAnswer.trim(), altAnswerSecond.trim()])) {
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
                textTopLeft: this.state.data.deWord,
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
    notify(msg, seconds = 2, position = "top-right") {
        if (R.type(msg) !== "String") {
            msg = JSON.stringify(msg)
        }
        let settings = J.alertRandomPlain()
        Alert[ settings.mode ](msg, {
            position,
            effect: settings.effect,
            timeout: seconds * 1000,
            offset: 100
        })
    }
    render () {
        let fontTextTop = J.fontValueFn(this.state.textTopLeft.length + this.state.textTopRight.length + 1)
        let fontTextBottom = J.fontValueFn(this.state.textBottom.length)
        let fontTextBottomSecond = J.fontValueFn(this.state.data.enPart.length)
        let lineHeightTextTop = J.lineHeightFn(fontTextTop)
        let lineHeightTextBottom = J.lineHeightFn(fontTextBottom)
        let lineHeightTextBottomSecond = J.lineHeightFn(fontTextBottomSecond)
        let borderRadiusValue = 5
        let memeContainer = {
            borderRadius: `${borderRadiusValue}vh`,
            padding: "0px",
            marginLeft: "25vw",
            width: "50vw",
            height: "60vh",
            backgroundSize: "cover",
            backgroundImage: `url(${this.state.imageSrcCache})`
        }
        let memeTextTop = {
            borderTopLeftRadius: `${borderRadiusValue}vh`,
            borderTopRightRadius: `${borderRadiusValue}vh`,
            top: "0px",
            fontWeight: "700",
            color: "#363A42",
            fontSize: `${fontTextTop}vh`,
            lineHeight: `${lineHeightTextTop}`,
            height: "10vh",
            textOverflow: "ellipsis",
            width:  "50vw",
            backgroundColor: "#B0BEC5",
            whiteSpace: "nowrap",
            overflow: "hidden"
        }
        let gapStyle = {
            height: "44.9vh"
        }
        let memeTextBottom = R.merge(memeTextTop, {
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            fontSize: `${fontTextBottom}vh`,
            lineHeight: `${lineHeightTextBottom}`
        })
        let memeTextBottomSecond = R.merge(memeTextTop, {
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
            borderBottomLeftRadius: `${borderRadiusValue}vh`,
            borderBottomRightRadius: `${borderRadiusValue}vh`,
            fontSize: `${fontTextBottomSecond}vh`,
            lineHeight: `${lineHeightTextBottomSecond}`,
            backgroundColor: "#3c5a72",
            color: "#b2d0c4"
        })
        return (
    <div>
        <div className="box has-text-centered columns">
            <div id="animationMarker" className="column is-4 is-offset-4">
            <input autoFocus id="inputFieldId" className={this.state.inputFieldClassName} type="text" value={this.state.answer} size={this.state.inputFieldSize} onChange={this.handleAnswerInput} onKeyPress={this.handleAnswerInput}/>
            </div>
            <div className="column is-4">
                <a id="button" className={this.state.buttonClassName} onClick={this.handleButtonClick}>{this.state.buttonText}</a>
            </div>
        </div>
        <div className="box has-text-centered is-fullwidth" style={memeContainer}>
            <div style={memeTextTop}>
                <span className="memeTextTopLeft">{this.state.textTopLeft}</span>
                <span className="memeTextTopSeparator">- </span>
                <span className="memeTextTopRight">{this.state.textTopRight}</span>
            </div>
            <div style={gapStyle}></div>
            <div style={memeTextBottom}>{this.state.textBottom}</div>
            <div style={memeTextBottomSecond}>{this.state.textBottomSecond}</div>
        </div>
        <Alert stack={{limit:7}} />
	</div>
    )}
}
