"use strict"
import React,{ Component } from "react"
import R from "ramda"

import J from "./components/commonReact.js"

let initOnce = R.once(()=>{
    J.emitter.emit("init")
})
let mockedData = [{
      "dePart": "Alle Menschen sind gleich. Nur die Gehälter sind verschieden.",
      "enPart": "",
      "category": "preDraft",
      "id": 419
    },{
      "dePart": "Jedenfalls ist es besser, ein eckiges Etwas zu sein als ein rundes Nichts.",
      "enPart": "",
      "category": "preDraft",
      "id": 420
    },{
      "dePart": "Die Hälfte aller Menschen wollen abnehmen, die andere Hälfte verhungert.",
      "enPart": "",
      "category": "preDraft",
      "id": 421
    }]
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0
        }
        this.willHandleClick = this.willHandleClick.bind(this)
    }
    componentDidMount() {
        J.emitter.on("init",()=>{
        })
        J.emitter.on("correct",()=>{
        })
        J.emitter.on("wrong",()=>{
        })
        J.emitter.on("last word",()=>{
        })
        J.emitter.on("show answer",()=>{
        })
        J.emitter.on("next",()=>{
        })

    }
    willHandleClick (event) {

    }
    render () {
        return(
    <div>
        <div className="box">

        </div>
        <div className="box has-text-centered">

        </div>
        <div className="box has-text-centered">

        </div>
	</div>
    )}
}
