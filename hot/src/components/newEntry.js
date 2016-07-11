"use strict"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import R from "ramda"
import Select from "react-select"
import J from "./commonReact"
const inputObjInitial = {
    id: 0,
    dePart: "",
    enPart: "",
    category:"draft"
}
class NewEntry extends Component {
    constructor (props) {
        super(props)
        this.state = {
            inputObj:inputObjInitial
        }
        this.willHandleChangeDePart = this.willHandleChangeDePart.bind(this)
        this.willHandleChangeEnPart = this.willHandleChangeEnPart.bind(this)
        this.willHandleCategory = this.willHandleCategory.bind(this)
        this.willHandlePublish = this.willHandlePublish.bind(this)
    }

    willHandleChangeDePart (event) {
        this.setState({inputObj: R.merge(this.state.inputObj, {dePart: event.target.value})})
    }
    willHandleChangeEnPart (event) {
        this.setState({inputObj: R.merge(this.state.inputObj, {enPart: event.target.value})})
    }
    willHandlePublish (event) {
        J.log("publish")
        J.postData("http://localhost:3001/publish/data", JSON.stringify(this.state.inputObj)).then((data)=>{
            ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
        })
    }
    willHandleCategory (event) {
        this.setState({inputObj: R.merge(this.state.inputObj, {category: event.value})})
    }
    render () {
        return (
    <div className="newEntryContainer">
        <div className="newEntry">
            <input autoFocus type="text" value={this.state.inputObj.dePart} className="dePart" size="77" onChange={this.willHandleChangeDePart} onSelect={this.willHandleTextSelect}/>
            <br/>
            <a className="button outline is-primary is-inverted" onClick={this.willHandlePublish}>Publish</a>
            <br/>
            <input type="text" value={this.state.inputObj.enPart} className="enPart" size="77" onChange={this.willHandleChangeEnPart} onSelect={this.willHandleTextSelect}/>
            <Select name={`category ${this.state.inputObj.id}`}
            value={this.state.inputObj.category} options={J.categoryOptions} onChange={this.willHandleCategory} />
        </div>
    </div>
    )}
}

module.exports.main = NewEntry
