"use strict"
import React,{ Component } from "react"
import R from "ramda"
//import FlipMove from "react-flip-move"

import J from "../commonReact.js"

let initOnce = R.once(()=>{
    J.emitter.emit("init")
})


export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0
        }
        this.willHandleClick = this.willHandleClick.bind(this)
        //this.willHandleButton = this.willHandleButton.bind(this)
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
