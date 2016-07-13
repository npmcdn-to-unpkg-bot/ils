"use strict"
import React, { Component } from "react"
import R from "ramda"

import J from "./component/commonReact.js"

let initOnce = R.once(()=>{
    J.emitter.emit("init")
})

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }
    static get defaultProps () {
        return {
            "message": "dummy"
        }
    }
    componentDidMount() {
        J.emitter.on("init", ()=>{
        })
    }
    handleClick (event) {

    }
    render () {
        return (
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
