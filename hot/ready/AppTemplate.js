"use strict"
import React, { Component } from "react"
import R from "ramda"
import J from "./components/commonReact.js"
import Perf from "react-addons-perf"
screenLog.init()
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
    }
    handleClick (event) {
    }
    render () {
        return (
    <div>
        <div className="box">
        </div>
	</div>
    )}
}
