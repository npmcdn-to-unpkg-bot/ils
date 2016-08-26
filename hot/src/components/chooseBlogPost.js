"use strict"
import React, { Component } from "react"
import R from "ramda"
import {randomSeed} from "../../../_inc/commonReact.js"
class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            firstRowArr:[],
            secondRowArr:[],
            thirdRowArr:[],
            fourthRowArr:[]
        }
    }
    static get defaultProps () {
        return {
            data: [],
            handleClick: ()=>{console.log("Please set handleClick handler")}
        }
    }
    componentWillMount() {
        let data = R.sort((a, b)=>{return b.timestamp - a.timestamp}, this.props.data)
        if (data.length < 4) {
            data = R.flatten([data, R.repeat({title:"", category:"", timestamp:0}, 4 - data.length)])
        }
        data = R.splitEvery(Math.round(data.length / 4), data)
        let firstRowArr, secondRowArr, thirdRowArr, fourthRowArr
        switch (data.length) {
        case 1:
            firstRowArr = data[ 0 ]
            secondRowArr = []
            thirdRowArr = []
            fourthRowArr = []
            break
        case 2:
            firstRowArr = data[ 0 ]
            secondRowArr = data[ 1 ]
            thirdRowArr = []
            fourthRowArr = []
            break
        case 3:
            firstRowArr = data[ 0 ]
            secondRowArr = data[ 1 ]
            thirdRowArr = data[ 2 ]
            fourthRowArr = []
            break
        case 4:
            firstRowArr = data[ 0 ]
            secondRowArr = data[ 1 ]
            thirdRowArr = data[ 2 ]
            fourthRowArr = data[ 3 ]
            break
        default:
            firstRowArr = []
            secondRowArr = []
            thirdRowArr = []
            fourthRowArr = []
        }
        this.setState({firstRowArr, secondRowArr, thirdRowArr, fourthRowArr})
    }
    render () {
        return (
        <div className="overlay columns">
            <div className="column is-quarter">
                {this.state.firstRowArr.map(val=>{
                    return <p key={randomSeed()} onClick={()=>{this.props.handleClick(val)}}><span>{val.title}</span></p>
                })}
            </div>
            <div className="column is-quarter">
                {this.state.secondRowArr.map(val=>{
                    return <p key={randomSeed()} onClick={()=>{this.props.handleClick(val)}}><span>{val.title}</span></p>
                })}
            </div>
            <div className="column is-quarter">
                {this.state.thirdRowArr.map(val=>{
                    return <p key={randomSeed()} onClick={()=>{this.props.handleClick(val)}}><span>{val.title}</span></p>
                })}
            </div>
            <div className="column is-quarter">
                {this.state.fourthRowArr.map(val=>{
                    return <p key={randomSeed()} onClick={()=>{this.props.handleClick(val)}}><span>{val.title}</span></p>
                })}
            </div>
        </div>
    )}
}

module.exports.main = App
