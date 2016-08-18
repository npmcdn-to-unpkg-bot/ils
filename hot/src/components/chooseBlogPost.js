"use strict"
import React, { Component } from "react"
import R from "ramda"
import {randomSeed} from "./commonReact"
let mockedData = [
    {title:"this 1200",category:"node",timestamp: 1200},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"this",category:"node",timestamp: 1000},
    {title:"vary 77",category:"node",timestamp: 77},
    {title:"vary66",category:"node",timestamp: 66},
    {title:"vary55",category:"node",timestamp: 55},
    {title:"var44",category:"node",timestamp: 44},
    {title:"vary33",category:"node",timestamp: 33},
    {title:"vary",category:"node",timestamp: 22},
    {title:"vary",category:"node",timestamp: 11},
    {title:"vary",category:"node",timestamp: 9},
    {title:"this",category:"node",timestamp: 8},
    {title:"this",category:"node",timestamp: 8},
    {title:"this",category:"node",timestamp: 7},
    {title:"this",category:"node",timestamp: 7},
    {title:"this",category:"node",timestamp: 6},
    {title:"this",category:"node",timestamp: 5},
    {title:"this",category:"node",timestamp: 4},
    {title:"vary",category:"node",timestamp: 11},
    {title:"vary",category:"node",timestamp: 9},
    {title:"this",category:"node",timestamp: 8},
    {title:"this",category:"node",timestamp: 8},
    {title:"this",category:"node",timestamp: 7},
    {title:"this",category:"node",timestamp: 7},
    {title:"this",category:"node",timestamp: 6},
    {title:"this",category:"node",timestamp: 5},
    {title:"this",category:"node",timestamp: 4},
    {title:"vary",category:"node",timestamp: 11},
    {title:"vary",category:"node",timestamp: 9},
    {title:"this",category:"node",timestamp: 8},
    {title:"this",category:"node",timestamp: 8},
    {title:"this",category:"node",timestamp: 7},
    {title:"this",category:"node",timestamp: 7},
    {title:"this",category:"node",timestamp: 6},
    {title:"this",category:"node",timestamp: 5},
    {title:"this",category:"node",timestamp: 4},
    {title:"this",category:"node",timestamp: 3},
    {title:"this",category:"node",timestamp: 2},
    {title:"this",category:"node",timestamp: 1}
]
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
    componentWillMount(){
        let data = R.sort((a,b)=>{return b.timestamp-a.timestamp}, this.props.data)
        if(data.length<4){
            data = R.flatten([data,R.repeat({title:"",category:"",timestamp:0}, 4-data.length)])
        }
        data = R.splitEvery(Math.round(data.length/4),data)
        let firstRowArr,secondRowArr, thirdRowArr, fourthRowArr
        switch (data.length) {
            case 1:
                firstRowArr = data[0]
                secondRowArr = []
                thirdRowArr = []
                fourthRowArr = []
                break;
            case 2:
                firstRowArr = data[0]
                secondRowArr = data[1]
                thirdRowArr = []
                fourthRowArr = []
                break;
            case 3:
                firstRowArr = data[0]
                secondRowArr = data[1]
                thirdRowArr = data[2]
                fourthRowArr = []
                break;
            case 4:
                firstRowArr = data[0]
                secondRowArr = data[1]
                thirdRowArr = data[2]
                fourthRowArr = data[3]
                break;
            default:
                firstRowArr = []
                secondRowArr = []
                thirdRowArr = []
                fourthRowArr = []
        }
        this.setState({firstRowArr, secondRowArr,thirdRowArr,fourthRowArr})
    }
    render () {
        return (
        <div className="newEntry columns">
            <div className="column is-quarter">
                {this.state.firstRowArr.map(val=>{
                    return <p key={randomSeed()} onClick={()=>{this.props.handleClick(val)}}><span>{val.title}</span> <span>{val.category}</span></p>
                })}
            </div>
            <div className="column is-quarter">
                {this.state.secondRowArr.map(val=>{
                    return <p key={randomSeed()}><span>{val.title}</span> <span>{val.category}</span></p>
                })}
            </div>
            <div className="column is-quarter">
                {this.state.thirdRowArr.map(val=>{
                    return <p key={randomSeed()}><span>{val.title}</span> <span>{val.category}</span></p>
                })}
            </div>
            <div className="column is-quarter">
                {this.state.fourthRowArr.map(val=>{
                    return <p key={randomSeed()}><span>{val.title}</span> <span>{val.category}</span></p>
                })}
            </div>
        </div>
    )}
}

module.exports.main = App
