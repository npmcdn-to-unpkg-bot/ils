"use strict"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import R from "ramda"
import reqwest from "reqwest"
import FlipMove from "react-flip-move"
import J from "../../_inc/commonReact.js"
let currentId
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0,
            globalIndex: 0,
            globalData: [],
            data:{"dePart": "Ich gehe bald wieder weg",
            "enPart": "I'll be leaving again soon"},
            flagReady: false,
            memeStyleContainer:{},
            singleWordBoxHeight:"10px",
            visibleArr: [],
            hiddenArr: [],
            referenceArr: [],
            buttonText: J.buttonTextShowAnswer,
            buttonClassName: J.bulButtonInit,
            buttonStyle: {}
        }
        this.willHandleClick = this.willHandleClick.bind(this)
        this.willHandleButton = this.willHandleButton.bind(this)
    }
    componentDidMount() {
        //J.postData(`${J.hapi}/orderSentence`,{}).then(incoming=>{
        J.postData("/orderSentence", {}).then(incoming=>{
            let globalData = J.shuffle(incoming)
            let data = globalData[ 0 ]
            this.setState({globalData, data}, ()=>{
                J.emitter.emit("init")
            })
        })
        J.emitter.on("init", ()=>{
            let imageHeight = J.getHeightPx(25)
            let imageWidth = J.getWidthPx(95)
            let imageUrl = `https://unsplash.it/${imageWidth}/${imageHeight}/?random&more=${J.randomSeed()}`
            let memeStyleContainer = {
                width: `${imageWidth}px`,
                height: `${imageHeight}px`,
		                                                                                                                                                                        backgroundImage: `url("${imageUrl}")`,
                fontSize: `${J.getHeightPx(3)}px`
		                                                                                                                            }
            let hiddenArr = []
            let visibleArr = []
            let referenceArr = R.split(" ", this.state.data.dePart)
            let visibleArrRaw = J.shuffle(R.split(" ", this.state.data.dePart))
            let singleWordBoxHeight = J.divide(J.getHeightPx(43), referenceArr.length)
            visibleArrRaw.map((val)=>{
                visibleArr.push({
                    name: val,
                    customStyle: {
                        fontSize: `${J.getPercent(43, singleWordBoxHeight)}px`
                    }
                })
            })
            this.setState({
                singleWordBoxHeight: `${J.getPercent(43, singleWordBoxHeight)}px`,
                visibleArr: visibleArr,
                hiddenArr: hiddenArr,
                referenceArr: referenceArr,
                memeStyleContainer: memeStyleContainer,
                buttonText: J.buttonTextShowAnswer,
                buttonClassName: J.bulButtonInit,
                buttonStyle: {fontSize: `${J.getHeightPx(3)}px`, height: `${J.getHeightPx(3.1)}px`}
            })
        })
        J.emitter.on("correct", ()=>{
            let visibleArrFuture = R.compose(R.filter(val=>R.prop("name", val) !== currentId))(this.state.visibleArr)
            this.setState({
                visibleArr: visibleArrFuture,
                hiddenArr: R.append(
                    {
                        name: currentId,
                        customStyle: {fontSize: this.state.singleWordBoxHeight}
                    }, this.state.hiddenArr),
                index: this.state.index + 1
            })
        })
        J.emitter.on("wrong", ()=>{
            let elementSource = document.getElementById(currentId)
            elementSource.classList.add("wrongAnswer")
            setTimeout(()=>{
                elementSource.classList.remove("wrongAnswer")
            }, 1000)
        })
        J.emitter.on("last word", ()=>{
            this.setState({
                flagReady: true,
                buttonText: J.buttonTextNext,
                buttonClassName: J.bulButtonNext
            }, ()=>{
                J.emitter.emit("correct")
            })
        })
        J.emitter.on("show answer", ()=>{
            let singleWordBoxHeight = {fontSize: this.state.singleWordBoxHeight}
            this.setState({
                visibleArr: [],
                hiddenArr: R.compose(R.map((val)=>{return {name: val, customStyle: singleWordBoxHeight}}))(this.state.referenceArr),
                flagReady:true,
                buttonText: J.buttonTextNext,
                buttonClassName: J.bulButtonNext
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
                globalIndex: willBeIndex,
                flagReady: false,
                index: 0,
                memeStyleContainer:{},
                visibleArr: [],
                hiddenArr: []
            }, ()=>{
                J.emitter.emit("init")
            })
        })
    }
    willHandleClick (event) {
        if (this.state.flagReady) {
            return null
        }
        currentId = event.currentTarget.id
        if (currentId === this.state.referenceArr[ this.state.index ]) {
            if (this.state.index + 1 === this.state.referenceArr.length) {
                J.emitter.emit("last word")
            } else {
                J.emitter.emit("correct")
            }
        } else {
            J.emitter.emit("wrong")
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
    <div>
        <div className="box">
             <div style={this.state.memeStyleContainer} >
                <div className="meme has-text-centered">
                    {this.state.data.enPart}
                </div>
            </div>
                <div className="has-text-centered paddingLR">
                    <a style={this.state.buttonStyle} className={`${this.state.buttonClassName} buttonStyle`} onClick={this.willHandleButton}>{this.state.buttonText}</a>
                </div>
        </div>
        <div className="box has-text-centered">
            <FlipMove easing="ease-out" duration="300" >
                {
                    this.state.visibleArr.map((val)=>{
                        return <div key={`${val.name}-key`} style={val.customStyle} className="column singleWord" id={val.name} onClick={this.willHandleClick}>{val.name}</div>
                    })
            }
            </FlipMove>
        </div>
        <div className="box has-text-centered">
            <FlipMove easing="ease-in" duration="700" >
                {
                    this.state.hiddenArr.map((val)=>{
                        return <div key={`${val.name}-key`} style={val.customStyle} className="column singleWordCorrect">{val.name}</div>
                    })
            }
            </FlipMove>
        </div>
	</div>
    )}
}
