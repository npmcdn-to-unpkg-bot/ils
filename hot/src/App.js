"use strict"
import React,{ Component } from "react"
import R from "ramda"
//import FlipMove from "react-flip-move"

import J from "../commonReact.js"

let initOnce = R.once(()=>{
    J.emitter.emit("init")
})
const inputObjInitial = {
    id: 0,
    dePart: "",
    enPart: "",
    category:""
}
let willSave = {}
let willAdd = {}

class InputComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            inputObj:inputObjInitial,
            inputValue: "",
            inputSize: 10
        }
        this.willHandleChange = this.willHandleChange.bind(this)
        this.willHandleBlur = this.willHandleBlur.bind(this)
    }
    static get defaultProps () {
        return {
            inputObj:inputObjInitial,
            inputValue: ""
        }
    }
    componentDidMount() {
        this.setState({
            inputObj:this.props.inputObj,
            inputValue: this.props.inputValue
        })
        J.emitter.on("init",()=>{
        })
        J.emitter.on("correct",()=>{
        })
    }
    willHandleChangeDePart (event) {
        this.setState({inputValue: event.target.value})
    }
    }
    willHandleChangeEnPart (event) {
        this.setState({inputValue: event.target.value})
    }
    willHandleBlur (event) {

    }
    render () {
        return(
    <div>
        <div className="box">
            <input type="text" value={this.state.inputObj.dePart} size={this.state.inputObj.dePart.length} onChange={this.willHandleChange} onBlur={this.willHandleBlur} />
            <input type="text" value={this.state.inputObj.enPart} size={this.state.inputObj.enPart.length} onChange={this.willHandleChange} onBlur={this.willHandleBlur} />
        </div>
    </div>
    )}
}

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0,
            paginationLowLimit: 0,
            paginationHighLimit: 5,
            just: 5,
            globalData: []
        }
        this.willHandleClick = this.willHandleClick.bind(this)
        this.willHandleChildChange = this.willHandleChildChange.bind(this)
    }
    componentDidMount() {
        J.emitter.on("init",()=>{
        })
        J.emitter.on("correct",()=>{
        })
        J.getData("http://localhost:3000/_db.json").then((incoming)=>{
            this.setState({globalData: incoming.data}, ()=>{
                initOnce()
            })
        })
    }
    willHandleChildChange (event) {
        if(event.type==="blur"){
            console.log(event.target.value)
        }
    }
    willHandleClick (event) {
        if(event.type==="blur"){
            console.log(event.target.value)
        }
    }
    render () {
        return(
<div>
    <div>
        {this.state.globalData.map((val,key)=>{
            if(key<=this.state.paginationHighLimit&&key>=this.state.paginationLowLimit)
            {
                return <InputComponent key={key} inputObj={val} />
            }
        })}
    </div>
</div>
    )}
}
