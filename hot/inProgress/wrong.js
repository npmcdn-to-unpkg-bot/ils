"use strict"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import R from "ramda"
import Select from "react-select"
import Griddle from "griddle-react"
import GermanOverall from "./components/germanOverall.js"
import NewEntry from "./components/newEntry.js"
import J from "./components/commonReact.js"
let initOnce = R.once(()=>{
    J.emitter.emit("init")
})
const inputObjInitial = {
    id: 0,
    dePart: "",
    enPart: "",
    category:"draft",
    removeSingle: ()=>{}
}
let willSave = {}
let selectedText = ""
let willDeleteIndex = 0
J.emitter.on("save", ()=>{
    J.log("save event")
    J.log(willSave)
    J.postData("http://localhost:3001/update/data", JSON.stringify(R.values(willSave))).then((data)=>{
        willSave = {}
    })
})
//document.addEventListener("visibilitychange", ()=>{
//if (document["hidden"]) {
//J.emitter.emit("save")
//}
//}, false)
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
        this.willSaveFn = this.willSaveFn.bind(this)
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
    }
    willSaveFn() {
        let oldState = willSave[ this.state.inputObj.id ] || {}
        willSave[ this.state.inputObj.id ] = R.merge(oldState, this.state.inputObj)
        willDeleteIndex = this.state.inputObj.id * 1
        J.log(willDeleteIndex)
    }
    willHandleTextSelect (event) {
        if (window.getSelection().toString().length > 3 && window.getSelection().toString() !== selectedText) {
            selectedText = window.getSelection().toString()
        }
    }
    willHandleChangeDePart (event) {
        this.setState({inputObj: R.merge(this.state.inputObj, {dePart: event.target.value})})
        this.willSaveFn()
    }
    willHandleChangeEnPart (event) {
        this.setState({inputObj: R.merge(this.state.inputObj, {enPart: event.target.value})})
        this.willSaveFn()
    }
    willHandleBlur (event) {
        this.willSaveFn()
    }
    willHandleCategory (event) {
        this.setState({inputObj: R.merge(this.state.inputObj, {category: event.value})})
        this.willSaveFn()
    }
    render () {
        return (
        <div className="column is-half">
            <input type="text" value={this.state.inputObj.dePart} className="dePart" size={this.state.inputObj.dePart.length} onChange={this.willHandleChangeDePart} onBlur={this.willHandleBlur} onClick={this.willHandleChangeDePart} onSelect={this.willHandleTextSelect}/>
            <br/>
            <input type="text" value={this.state.inputObj.enPart} className="enPart" size={this.state.inputObj.enPart.length} onChange={this.willHandleChangeEnPart} onBlur={this.willHandleBlur} onSelect={this.willHandleTextSelect}/>
            <a className="button outline is-danger" id={this.state.inputObj.id} onClick={this.props.removeSingle}> X </a>
            <Select name={`category ${this.state.inputObj.id}`}
            value={this.state.inputObj.category} options={J.categoryOptions} onChange={this.willHandleCategory} />
        </div>
    )}
}

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            paginationIndex: 0,
            paginationPerPageCount: 10,
            category: "quotes",
            message:"",
            translatedData: {},
            globalDataRaw: {},
            globalData: []
        }
        this.willHandleCategory = this.willHandleCategory.bind(this)
        this.willTranslate = this.willTranslate.bind(this)
        this.willTranslateShort = this.willTranslate.bind(this)
        this.willHandlePrevNavigation = this.willHandlePrevNavigation.bind(this)
        this.willHandleNextNavigation = this.willHandleNextNavigation.bind(this)
        this.willRemove = this.willRemove.bind(this)
        this.willBulkRemove = this.willBulkRemove.bind(this)
        this.willSave = this.willSave.bind(this)
        this.newEntry = this.newEntry.bind(this)
        this.removeSingle = this.removeSingle.bind(this)
        this.sendMessage = this.sendMessage.bind(this)
    }
    componentDidMount() {
        J.emitter.on("init", ()=>{
            J.getData("http://localhost:3001/read/data").then((incoming)=>{
                let filterByCategory = R.compose(R.filter((val)=>{
                    return R.prop("category", val) === this.state.category
                }))(incoming)
                this.setState({
                    globalDataRaw: {},
                    globalData: []
                }, ()=>{
                    this.setState({
                        globalDataRaw: R.merge({}, incoming),
                        globalData: R.values(filterByCategory)
                    }, ()=>{
                        J.log("init done")
                    })
                })
            })
        })
        initOnce()
    }
    willTranslate() {
        J.postData("http://localhost:3001/deEn", JSON.stringify({word: selectedText})).then((incoming)=>{
            ReactDOM.render(<GermanOverall.main incomingData={incoming}/>, document.getElementById("reactContainer"))
            this.setState({translatedData: incoming})
        })
    }
    newEntry() {
        ReactDOM.render(<NewEntry.main />, document.getElementById("reactContainer"))
    }
    willTranslateShort() {
        J.postData("http://localhost:3001/deEnShort", JSON.stringify({word: selectedText})).then((incoming)=>{
            ReactDOM.render(<GermanOverall.main incomingData={incoming}/>, document.getElementById("reactContainer"))
            this.setState({translatedData: incoming})
        })
    }
    willHandlePrevNavigation() {
        if ((this.state.paginationIndex - this.state.paginationPerPageCount) >= 0) {
            this.setState({
                paginationIndex: this.state.paginationIndex - this.state.paginationPerPageCount
            })
        }
    }
    willHandleNextNavigation() {
        if ((this.state.paginationIndex + this.state.paginationPerPageCount) < this.state.globalData.length) {
            this.setState({
                paginationIndex: this.state.paginationIndex + this.state.paginationPerPageCount
            })
        }

    }
    willHandleCategory (event) {
        let filterByCategory = R.compose(R.filter((val)=>{
            return R.prop("category", val) === event.value
        }))(this.state.globalDataRaw)
        this.setState({
            paginationIndex: 0,
            paginationPerPageCount: 10,
            globalData: []
        }, ()=>{
            this.setState({
                category: event.value,
                globalData: R.values(filterByCategory)
            })
        })
    }
    willRemove (event) {
        let globalDataFuture = R.compose(R.filter((val)=>{
            return R.prop("id", val) != willDeleteIndex
        }))(this.state.globalData)
        this.setState({
            globalData: []
        }, ()=>{
            this.setState({
                globalData: globalDataFuture
            })
        })
        J.postData("http://localhost:3001/remove/data", JSON.stringify({id: willDeleteIndex})).then((data)=>{
            J.log("removed")
        })
    }
    willBulkRemove (event) {
        J.postData("http://localhost:3001/update/data", JSON.stringify(R.values(willSave))).then((data)=>{
            willSave = {}
            J.postData("http://localhost:3001/removeBulk", JSON.stringify({id: willDeleteIndex})).then((data)=>{
                J.log("removed bulk")
                J.emitter.emit("init")
            })
        })
    }
    willSave() {
        J.emitter.emit("save")
    }
    removeSingle(event) {
        let identity = event.target.attributes.id.value
        J.postData("http://localhost:3001/remove/data", JSON.stringify({id: identity})).then((data)=>{
            J.log("removed")
            this.sendMessage("removed")
            let globalDataFuture = R.compose(R.filter((val)=>{
                return R.prop("id", val) != identity
            }))(this.state.globalData)
            this.setState({
                globalData: []
            }, ()=>{
                this.setState({
                    globalData: globalDataFuture
                })
            })
        })
    }
    sendMessage(msg) {
        this.setState({
            message: msg
        }, ()=>{
            setTimeout(()=>{
                this.setState({message: ""})
            }, 5000)
        })
    }
    render () {
        return (
<div>
    <div id="reactContainer"></div>
    <div className="columns box">
        <div className="column">
            <a className="button" onClick={this.willHandlePrevNavigation}><span className="icon"><i className="fa fa-arrow-circle-left"></i></span></a>
            <a className="button" onClick={this.willHandleNextNavigation}><span className="icon"><i className="fa fa-arrow-circle-right"></i></span></a>
        </div>
        <div className="column">
            <a className="button outline is-primary is-inverted" onClick={this.willTranslateShort}>short</a>
            <a className="button outline is-danger is-inverted" onClick={this.willTranslate}>long</a>
            <a className="button outline is-danger is-inverted" onClick={this.newEntry}>+</a>
            <a className="button outline is-primary is-inverted" onClick={this.willBulkRemove}>|X|</a>
            <a className="button outline is-warning" onClick={this.willSave}>Save</a>
        </div>
        <div className="column is-2">
            {this.state.message}
        </div>
        <div className="column">
            <Select name="category global" value={this.state.category} options={J.categoryOptions} onChange={this.willHandleCategory} />
        </div>
    </div>
    <div className="columns is-multiline">
        {this.state.globalData.map((val, key)=>{
            if (key < this.state.paginationIndex + this.state.paginationPerPageCount && key >= this.state.paginationIndex)
            {
                return <InputComponent key={key} inputObj={val} removeSingle={this.removeSingle}/>
            }
        })}
    </div>
</div>
    )}
}
