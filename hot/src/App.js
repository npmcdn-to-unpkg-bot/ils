"use strict"
import React,{ Component } from "react"
import R from "ramda"
import Select from "react-select"
//import FlipMove from "react-flip-move"

const categoryOptions = [
    { value: "quotes", label: "quotes" },
    { value: "jokes", label: "jokes" },
    { value: "cleanJokes", label: "cleanJokes" },
    { value: "derProcess", label: "derProcess" }
]
import J from "../commonReact.js"

let initOnce = R.once(()=>{
    J.emitter.emit("init")
})
const inputObjInitial = {
    id: 0,
    dePart: "",
    enPart: "",
    category:"quotes"
}

let willSave = {}
let flag = true
let selectedText
J.emitter.on("save",()=>{
    J.postData("http://localhost:3001/update/data", JSON.stringify(willSave)).then((data)=>{
        willSave = {}
        flag = true
    })
})
document.addEventListener("visibilitychange", ()=>{
  if (document["hidden"]&&flag) {
      flag = false
      J.emitter.emit("save")
  } else {
      J.log(false)
  }
}, false)
class InputComponent extends Component {
    constructor (props) {
        super(props)
        this.state = {
            inputObj:inputObjInitial
        }
        this.willHandleTextSelect = this.willHandleTextSelect.bind(this)
        this.willHandleChangeDePart = this.willHandleChangeDePart.bind(this)
        this.willHandleChangeEnPart = this.willHandleChangeEnPart.bind(this)
        this.willHandleCategory = this.willHandleCategory.bind(this)
        this.willHandleBlur = this.willHandleBlur.bind(this)
    }
    static get defaultProps () {
        return {
            inputObj:inputObjInitial
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
    willHandleTextSelect (event) {
        if(window.getSelection().toString().length>3){
            selectedText = window.getSelection().toString()
        }
        J.log(selectedText)
    }
    willHandleChangeDePart (event) {
        this.setState({inputObj: R.merge(this.state.inputObj, {dePart: event.target.value})})
    }
    willHandleChangeEnPart (event) {
        this.setState({inputObj: R.merge(this.state.inputObj, {enPart: event.target.value})})
    }
    willHandleBlur (event) {
        let oldState = willSave[this.state.inputObj.id]||{}
        willSave[this.state.inputObj.id] = R.merge(oldState, this.state.inputObj)
    }
    willHandleCategory (event) {
        this.setState({inputObj: R.merge(this.state.inputObj, {category: event.value})})
    }
    render () {
        return(
        <div className="column is-half">
            <input type="text" value={this.state.inputObj.dePart} className="dePart" size={this.state.inputObj.dePart.length} onChange={this.willHandleChangeDePart} onBlur={this.willHandleBlur} onSelect={this.willHandleTextSelect}/>
            <br/>
            <input type="text" value={this.state.inputObj.enPart} className="enPart" size={this.state.inputObj.enPart.length} onChange={this.willHandleChangeEnPart} onBlur={this.willHandleBlur} />
            <Select name={`category ${this.state.inputObj.id}`}
            value={this.state.inputObj.category} options={categoryOptions} onChange={this.willHandleCategory} />
        </div>
    )}
}

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0,
            paginationIndex: 0,
            paginationPerPageCount: 10,
            category: "quotes",
            globalDataRaw: {},
            globalData: []
        }
        this.willHandleCategory = this.willHandleCategory.bind(this)
        this.willHandlePrevNavigation = this.willHandlePrevNavigation.bind(this)
        this.willHandleNextNavigation = this.willHandleNextNavigation.bind(this)
    }
    componentDidMount() {
        J.emitter.on("init",()=>{
        })
        J.emitter.on("correct",()=>{
        })
        J.getData("http://localhost:3001/read/data").then((incoming)=>{
            let filterByCategory = R.compose(R.filter((val)=>{
                return R.prop("category",val)===this.state.category
            }))(incoming)
            this.setState({
                globalDataRaw: R.merge({},incoming),
                globalData: R.values(filterByCategory)
            }, ()=>{
                initOnce()
            })
        })
    }
    willHandlePrevNavigation(){
        if((this.state.paginationIndex-this.state.paginationPerPageCount)>=0){
            this.setState({
                paginationIndex: this.state.paginationIndex-this.state.paginationPerPageCount
            })
        }
    }
    willHandleNextNavigation(){
        if((this.state.paginationIndex+this.state.paginationPerPageCount)<this.state.globalData.length){
            this.setState({
                paginationIndex: this.state.paginationIndex+this.state.paginationPerPageCount
            })
        }

    }
    willHandleCategory (event) {
        let filterByCategory = R.compose(R.filter((val)=>{
            return R.prop("category",val)===event.value
        }))(this.state.globalDataRaw)
        this.setState({
            category: event.value,
            globalData: R.values(filterByCategory)
        })
    }
    render () {
        return(
<div>
    <div className="columns box">
        <div className="column">
            <a className="button" onClick={this.willHandlePrevNavigation}><span className="icon"><i className="fa fa-arrow-circle-left"></i></span></a>
            <a className="button" onClick={this.willHandleNextNavigation}><span className="icon"><i className="fa fa-arrow-circle-right"></i></span></a>
        </div>
        <div className="column">
            <Select name="category global" value={this.state.category} options={categoryOptions} onChange={this.willHandleCategory} />
        </div>
    </div>
    <div className="columns is-multiline">
        {this.state.globalData.map((val,key)=>{
            if(key<this.state.paginationIndex+this.state.paginationPerPageCount&&key>=this.state.paginationIndex)
            {
                return <InputComponent key={key} inputObj={val} />
            }
        })}
    </div>
</div>
    )}
}
