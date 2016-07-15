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
    "deWordLong": "__0__1__2__3__4__5__6__7__8__9__a__b__c__d__e__f__0__1__2__3__4__5__6__7", //72
    "deWord1": "__0__1__2__3__4__5__6__7__8__9", //30
    "deWord2": "__0__1__2__3__4__5__6__7__8__9__a__b__c__d__e__f", //48
    "deWordd": "der Gehälter",
    "enWord": "the owner",
    "dePart": "Alle Menschen sind gleich. Nur die Gehälter sind verschieden.",
    "enPart": "All people are the same.",
    "category": "preDraft",
    imageObj: {"src":"/inc/first.jpg", "width":"1000", "height":"750"},
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
        let fontValueFn = R.cond([
            [R.gte(30),   R.always(250)],
            [R.both(R.lt(30),R.gte(48)), R.always(185)],
            [R.T,           R.always(125)]
        ])
        let lineHeightFn = R.cond([
            [R.both(R.lt(185),R.gt(250)),   R.always(4)],
            [R.both(R.lt(125),R.gte(185)), R.always(2)],
            [R.T,           R.always(3)]
        ])
        let memeHeight = J.getHeightPx(80)
        let memeWidth = memeHeight*1.33
        let marginValue = J.divide(100-J.getPart(memeWidth,J.getWidthPx(100)),2)
        let fontValue = fontValueFn(this.state.tempState.deWord.length)
        let lineHeightValue = lineHeightFn(fontValue)
        console.log(fontValue,lineHeightValue)
        let heightValue = J.getPercent(10,memeHeight)
        let gapValue = memeHeight-(3*heightValue)
        let memeContainer = {
            padding: "0px",
            marginLeft: `${J.getWidthPx(marginValue)}px`,
            width: `${memeWidth}px`,
            height: `${memeHeight}px`,
            backgroundSize: "cover",
            backgroundImage: `url(${this.state.tempState.imageObj.src})`
        }
        let memeTextTop = {
            opacity: "1",
            top: "0px",
            color: "#263238",
            fontSize: `${fontValue}%`,
            fontWeight: "700",
            lineHeight: `${lineHeightValue}`,
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
        let memeTextBottomSecond = R.merge(memeTextTop,{
            backgroundColor: "#6D98AB",
            color: "#003366"
        })
        return(
    <div>
        <div className="box has-text-centered">
            <input autoFocus type="text" value={this.state.answer} size={this.state.answer.length} onChange={this.handleAnswerInput} onKeyPress={this.handleAnswerInput}/>
        </div>
        <div className="box has-text-centered is-fullwidth" style={memeContainer}>
            <div style={memeTextTop}>{this.state.tempState.deWord}</div>
            <div style={gapStyle}></div>
            <div style={memeTextTop}>{this.state.tempState.deWord}</div>
            <div style={memeTextBottomSecond}>{this.state.tempState.deWord}</div>
        </div>
	</div>
    )}
}
