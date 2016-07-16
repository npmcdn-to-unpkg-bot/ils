"use strict"
import React,{ Component } from "react"
import R from "ramda"
import LazyLoad from 'react-lazyload'
import J from "./components/commonReact.js"

let initOnce = R.once(()=>{
    J.emitter.emit("global init")
})
let store = {}

let initData = {
    "deWord": "der Gehälter",
    "enWord": "the owner",
    "dePart": "Alle Menschen sind gleich. Nur die Gehälter sind verschieden.",
    "enPart": "All people are the same.",
    "category": "preDraft",
    imageSrc: "/inc/first.jpg",
    "id": 419
}
let mockedDataArr = [{
    "deWord": "der Gehälter",
    "enWord": "the owner",
    "dePart": "Alle Menschen sind gleich. Nur die Gehälter sind verschieden.",
    "enPart": "All people are the same.",
    "category": "preDraft",
    imageSrc: "/inc/first.jpg",
    "id": 419
}, {
    "deWord": "der Gehälter",
    "enWord": "the owner",
    "dePart": "Jedenfalls ist es besser, ein eckiges Etwas zu sein als ein rundes Nichts.",
    "enPart": "Any way it is better",
    "category": "preDraft",
    imageSrc: "/inc/second.jpg",
    "id": 420
}, {
    "deWord": "abnehmen",
    "enWord": "to leave",
    "dePart": "Die Hälfte aller Menschen wollen abnehmen, die andere Hälfte verhungert.",
    "enPart": "Half of the people want to",
    imageSrc:"/inc/first.jpg",
    "category": "preDraft",
    "id": 421
}]
// no length beyond 72
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0,
            globalData: [],
            data: initData,
            answer: "",
            textTop: "",
            textBottom: "",
            buttonText: J.buttonTextShowAnswer,
            buttonClassName: J.bulButtonInit,
            buttonStyle: {}
        }
        this.handleAnswerInput = this.handleAnswerInput.bind(this)
    }
    componentDidMount() {
        J.emitter.on("global init",()=>{
            let globalDataFuture = J.shuffle(mockedDataArr)
            this.setState({
                globalData: globalDataFuture
            },()=>{
                J.emitter.emit("init")
            })
        })
        J.emitter.on("init",()=>{
            let willTextTopRaw = R.split(" ",this.state.data.deWord)
            let willTextTop = R.compose(R.map(val=>J.hideTail(val)),R.split(" "))(this.state.data.deWord)
            let willTextBottom = R.compose(R.join(" "),R.map(val=>{
                J.log(val)
                willTextTopRaw.map((value,key)=>{
                    if(value===val){
                        val = willTextTop[key]
                    }
                })
                return val
            }),R.split(" "))(this.state.data.dePart)
            J.log(willTextBottom)
            this.setState({
                textTop: `${R.join(" ",willTextTop)}|${this.state.data.enWord}`,
                textBottom: willTextBottom
            })
        })
        initOnce()
    }
    handleAnswerInput (event) {
        if(event.key==="Enter"){
            J.emitter.emit("check answer")
        }
        this.setState({
            answer: event.target.value
        })
    }
    render () {
        let memeHeight = J.getHeightPx(80)
        let memeWidth = memeHeight*1.33
        let marginValue = J.divide(100-J.getPart(memeWidth,J.getWidthPx(100)),2)
        let fontTextTop = J.fontValueFn(this.state.textTop.length)
        let fontTextBottom = J.fontValueFn(this.state.textBottom.length)
        let fontTextBottomSecond = J.fontValueFn(this.state.data.enPart.length)
        let lineHeightTextTop = J.lineHeightFn(fontTextTop)
        let lineHeightTextBottom = J.lineHeightFn(fontTextBottom)
        let lineHeightTextBottomSecond = J.lineHeightFn(fontTextBottomSecond)
        let heightValue = J.getPercent(10,memeHeight)
        let gapValue = memeHeight-(3*heightValue)
        console.log(this.state.textTop.length, this.state.textBottom.length, this.state.data.enPart.length)
        console.log(fontTextTop, fontTextBottom, fontTextBottomSecond)
        console.log(lineHeightTextTop, lineHeightTextBottom, lineHeightTextBottomSecond)
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
        let memeTextBottom = R.merge(memeTextTop,{
            fontSize: `${fontTextBottom}%`,
            lineHeight: `${lineHeightTextBottom}`
        })
        let memeTextBottomSecond = R.merge(memeTextTop,{
            fontSize: `${fontTextBottomSecond}%`,
            lineHeight: `${lineHeightTextBottomSecond}`,
           backgroundColor: "#3c5a72",
            color: "#b2d0c4"
        })
        return(
    <div>
        <div className="box has-text-centered">
            <input autoFocus className="inputField" type="text" value={this.state.answer} size={this.state.answer.length} onChange={this.handleAnswerInput} onKeyPress={this.handleAnswerInput}/>
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
