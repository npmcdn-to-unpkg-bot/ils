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
            <div className="ui steps">
                <a className="active step">
                    <i className="truck icon"></i>
                    <div className="content">
                        <div className="title">Shipping</div>
                        <div className="description">Choose your shipping options</div>
                        </div>
                </a>
                <a className="step">
                    <div className="content">
                        <div className="title">Billing</div>
                        <div className="description">Enter billing information</div>
                        </div>
                </a>
            </div>
        </div>
        )}
    }
