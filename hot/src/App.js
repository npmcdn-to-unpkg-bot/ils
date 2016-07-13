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
    "deWord": "der Gehälter",
    "enWord": "the owner",
    "dePart": "Alle Menschen sind gleich. Nur die Gehälter sind verschieden.",
    "enPart": "All people are the same.",
    "category": "preDraft",
    imageObj: {"src":"https://placeimg.com/1000/700/any", "width":"1000", "height":"700"},
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
        let scaleFactor = J.getPart(this.state.tempState.imageObj.height, this.state.tempState.imageObj.width)
        let memeHeightRaw = J.getPercent(scaleFactor, numberIs)
        let memeHeight = J.getWidthPx(memeHeightRaw)
        let marginValue = J.getPercent(2,memeHeight)
        let fontValue = J.getPercent(11,memeHeight)
        let heightValue = J.getPercent(12,memeHeight)
        console.log(memeHeight,marginValue, fontValue, heightValue)

        let memeContainer = {
            marginLeft: `${J.getWidthPx(25)}px`,
            width: `${J.getWidthPx(numberIs)}px`,
            height: `${memeHeight}px`,
            backgroundImage: `url(${this.state.tempState.imageObj.src})`
        }
        let memeTextTop = {
            top: "0px",
            paddingLeft: `${marginValue}px`,
            paddingRight: `${marginValue}px`,
            height: `${heightValue}px`,
            textOverflow: "ellipsis",
            maxWidth:  `${J.getWidthPx(numberIs-5)}px`,
            backgroundColor: "#FF4081",
            whiteSpace: "nowrap",
            display: "inline-block"
        }
        let memeTextBottomFirst = {
            paddingTop: "300px",
            display: "inline-block"
        }
        let memeTextBottomSecond = {
            paddingTop: "100px",
            display: "inline-block"
        }
        return(
    <div>
        <div className="box has-text-centered">
            <input autoFocus type="text" value={this.state.answer} size={this.state.answer.length} onChange={this.handleAnswerInput} onKeyPress={this.handleAnswerInput}/>
        </div>
        <div className="box has-text-centered is-fullwidth" style={memeContainer}>
            <div style={memeTextTop}>{this.state.tempState.deWord}000000000000000000000000000000000000000000000000</div>
            <div style={memeTextBottomFirst}>{this.state.tempState.dePart}</div>
            <div style={memeTextBottomSecond}>{this.state.tempState.enPart}</div>
        </div>
	</div>
    )}
}
