"use strict"
import React, { Component } from "react"
import R from "ramda"
import J from "../../_inc/commonReact.js"
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
//const shallowCompare = require("react-addons-shallow-compare")
//shouldComponentUpdate(nextProps, nextState) {
//return shallowCompare(this, nextProps, nextState)
//}
