"use strict"
import React, { Component } from "react"
import R from "ramda"
import J from "./components/commonReact.js"
import Navigation from "./components/navigation.js"
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
    "id": 0
}
function convertImgToBase64(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this,0,0);
        var dataURL = canvas.toDataURL(outputFormat || 'image/png');
        callback(dataURL);
        canvas = null;
    };
    img.src = url;
}
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            automatedMode: false,
            globalIndex: 0,
            globalData: [],
            data: initData,
            answer: "",
            textTopLeft: "",
            textTopRight: "",
            textBottom: "",
            inputFieldSize:20,
            imageSrcCache:"",
            inputFieldClassName:"inputField",
            buttonText: J.buttonTextShowAnswer,
            buttonClassName: J.bulButtonInit
        }
        this.handleAnswerInput = this.handleAnswerInput.bind(this)
        this.handleButtonClick = this.handleButtonClick.bind(this)
    }
    componentDidMount() {
        let interval = setInterval(()=>{
            if(this.state.automatedMode&&this.state.textTopLeft!==""){
                if(this.state.answer.length<this.state.textTopLeft.length){
                    let answer = this.state.answer+this.state.data.deWord[this.state.answer.length]
                    this.setState({answer})
                }else{
                    this.setState({automatedMode: false},()=>{
                        J.emitter.emit("correct")
                        setTimeout(()=>{
                            document.getElementById("button").click()
                        },4000)
                    })
                }
            }
        },100)
        J.emitter.on("once init", ()=>{
            J.postData(`${J.ils}/learningMeme`, {}).then(incoming =>{
                let globalData = J.shuffle(incoming)
                this.setState({
                    data: globalData[ 0 ],
                    globalData
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
            localforage.getItem(this.state.data.deWord).then(data=>{
                if(data===null){
                    convertImgToBase64(this.state.data.imageSrc,data=>{
                        localforage.setItem(this.state.data.deWord,data).then(()=>{
                            this.setState({
                                answer: "",
                                imageSrcCache: J.httpsFn(this.state.data.imageSrc),
                                textTopLeft: R.join(" ", willTextTop),
                                textTopRight: this.state.data.enWord,
                                textBottom: willTextBottom,
                                buttonText: J.buttonTextShowAnswer,
                                buttonClassName: J.bulButtonInit
                            },()=>{
                                setTimeout(()=>{
                                    this.setState({automatedMode: true})
                                },1000)
                            })
                        })
                    })
                }else{
                    J.log("cache hit")
                    this.setState({
                        answer: "",
                        imageSrcCache: data,
                        textTopLeft: R.join(" ", willTextTop),
                        textTopRight: this.state.data.enWord,
                        textBottom: willTextBottom,
                        buttonText: J.buttonTextShowAnswer,
                        buttonClassName: J.bulButtonInit
                    },()=>{
                        setTimeout(()=>{
                            this.setState({automatedMode: true})
                        },1000)
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
            J.log([deWord.trim(), altAnswer.trim(), altAnswerSecond.trim()])
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
    render () {
        let fontTextTop = J.fontValueFn(this.state.textTopLeft.length+this.state.textTopRight.length+1)
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
            width: `50vw`,
            height: `60vh`,
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
            height: `10vh`,
            textOverflow: "ellipsis",
            width:  `50vw`,
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
        <Navigation />
        <div className="box has-text-centered columns">
            <div id="animationMarker" className="column is-4 is-offset-4">
            <input autoFocus className={this.state.inputFieldClassName} type="text" value={this.state.answer} size={this.state.inputFieldSize} onChange={this.handleAnswerInput} onKeyPress={this.handleAnswerInput}/>
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
            <div style={memeTextBottomSecond}>{this.state.data.enPart}</div>
        </div>
	</div>
    )}
}
