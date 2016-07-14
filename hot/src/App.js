"use strict"
import React,{ Component } from "react"
import R from "ramda"
import LazyLoad from 'react-lazyload'
import J from "./components/commonReact.js"

let initOnce = R.once(()=>{
    J.emitter.emit("init")
})
let store = {}

let mockedData = {
    "deWord": "__0__1__2__3__4__5__6__7__8__9__a__b__c__d__e__f__0__1__2__3__4__5__6__7", //72
    "deWord1": "__0__1__2__3__4__5__6__7__8__9", //30
    "deWord2": "__0__1__2__3__4__5__6__7__8__9__a__b__c__d__e__f", //48
    "deWordd": "der Gehälter",
    "enWord": "the owner",
    "dePart": "Alle Menschen sind gleich. Nur die Gehälter sind verschieden.",
    "enPart": "All people are the same.",
    "category": "preDraft",
    imageObj: {"src":"https://placeimg.com/1000/750/any", "width":"1000", "height":"750"},
    "id": 419
}
let mockedDataArr = [{
    "deWord": "der Gehälter",
    "enWord": "the owner",
    "dePart": "Alle Menschen sind gleich. Nur die Gehälter sind verschieden.",
    "enPart": "All people are the same.",
    "category": "preDraft",
    imageObj: {"src":"https://unsplash.it/2200/1700/?random&more=less", "width":"1700", "height":"2200"},
    "id": 419
}, {
    "dePart": "Jedenfalls ist es besser, ein eckiges Etwas zu sein als ein rundes Nichts.",
    "enPart": "",
    "category": "preDraft",
    "id": 420
}, {
    "dePart": "Die Hälfte aller Menschen wollen abnehmen, die andere Hälfte verhungert.",
    "enPart": "",
    "category": "preDraft",
    "id": 421
}]

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0,
            tempState: mockedData,
            answer: ""
        }
        this.handleAnswerInput = this.handleAnswerInput.bind(this)
    }
    componentDidMount() {
        J.emitter.on("init",()=>{
        })
    }
    handleAnswerInput (event) {
        if(event.key==="Enter"){
            store.imageSearch = this.state.searchKeyword
            J.emitter.emit("imageSearch")
        }
        this.setState({
            searchKeyword: event.target.value
        })
    }
    render () {
        let numberIs = 50
        let scaleFactor = J.getPart(this.state.tempState.imageObj.height, this.state.tempState.imageObj.width)/100
        J.log(scaleFactor)
        let memeHeightRaw = J.getPercentRaw(scaleFactor*100, numberIs)
        let memeHeight = J.getWidthPx(memeHeightRaw)
        let memeWidth = J.getWidthPx(numberIs)
        let fontValue = 10
        //let fontValueBig = J.getPart(8,memeWidth)
        //let fontValueSmall = J.getPercent(3.5,memeWidth)
        // NORMAL 1 43 15 2.5
        // 1.5 97 16 5
        // 0.66 18 15 1
        // 0.55 12 11 1
        // 0.5 10 10 1
        // LONG 1 43 15 2.5
        // 1.5 97 16 5
        // 0.66 18 15 1
        // 0.55 12 11 1
        // 0.5 10 10 1
        let heightValue = J.getPercent((10*scaleFactor),memeHeight)
        let gapValue = memeHeight-(3*heightValue)
        let lineHeightValue = 1
        console.log(scaleFactor, heightValue, fontValue, lineHeightValue)
        let memeContainer = {
            padding: "0px",
            marginLeft: `${J.getWidthPx(25)}px`,
            width: `${memeWidth}px`,
            height: `${memeHeight}px`,
            backgroundImage: `url(${this.state.tempState.imageObj.src})`
        }
        let memeTextTop = {
            top: "0px",
            fontSize: `${fontValue}px`,
            lineHeight: `${lineHeightValue}`,
            height: `${heightValue}px`,
            textOverflow: "ellipsis",
            width:  `${J.getWidthPx(numberIs)}px`,
            backgroundColor: "#FF4081",
            whiteSpace: "nowrap",
            overflow: "hidden"
        }
        let gapStyle = {
            height: `${gapValue}px`
        }
        let memeTextBottomFirst = R.merge(memeTextTop,{backgroundColor: "#DCEDC8"})
        let memeTextBottomSecond = R.merge(memeTextTop,{backgroundColor: "#FFE0B2"})
        return(
    <div>
        <div className="box has-text-centered">
            <input autoFocus type="text" value={this.state.answer} size={this.state.answer.length} onChange={this.handleAnswerInput} onKeyPress={this.handleAnswerInput}/>
        </div>
        <div className="box has-text-centered is-fullwidth" style={memeContainer}>
            <div style={memeTextTop}>{this.state.tempState.deWord}</div>
            <div style={gapStyle}></div>
            <div style={memeTextBottomFirst}>{this.state.tempState.deWord}</div>
            <div style={memeTextBottomSecond}>{this.state.tempState.deWord}</div>
        </div>
	</div>
    )}
}
