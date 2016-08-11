"use strict"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import R from "ramda"
import LazyLoad from "react-lazyload"
import J from "./components/commonReact.js"
import GermanOverall from "./components/germanOverall.js"
import { Notification } from "react-notification"
let initOnce = R.once(()=>{
    J.emitter.emit("once init")
})
let initData = {
    "dePart": "",
    "enPart": ""
}
class Image extends Component {
    constructor (props) {
        super(props)
    }
    static get defaultProps () {
        return {
            handleImageClick: null,
            imageSrc: "",
            className: ""
        }
    }
    render () {
        let numberIs = 15
        let imageStyle = {
            minWidth: `${J.getWidthPx(numberIs)}px`,
            height: "auto",
            maxHeight: `${J.getHeightPx(numberIs-2)}px`
        }
        return (
            <span className="column" onClick={this.props.handleImageClick}>
                <LazyLoad height={200} once={true}>
                <img src={this.props.imageSrc} style={imageStyle} className={this.props.className} />
                </LazyLoad>
            </span>
        )
    }
}
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            globalIndex: 0,
            deWord: "",
            enWord: "",
            searchImageKeyword: "",
            globalData: [],
            data: initData,
            dataHolder: [],
            searchImageResult: [],
            paginationIndex: 0,
            paginationPerPageCount: 20,
            notificationMessage: "",
            notificationState: false
        }
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.handleImageClick = this.handleImageClick.bind(this)
        this.handlePrevNavigation = this.handlePrevNavigation.bind(this)
        this.handleNextNavigation = this.handleNextNavigation.bind(this)
        this.handleReady = this.handleReady.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleDeInput = this.handleDeInput.bind(this)
        this.handleEnInput = this.handleEnInput.bind(this)
        this.handleDeWordInput = this.handleDeWordInput.bind(this)
        this.handleEnWordInput = this.handleEnWordInput.bind(this)
    }
    log(msg, seconds = 2){
        let message = R.type(msg)==="String"?msg:JSON.stringify(msg)
        this.setState({
            notificationMessage: "",
            notificationState: false
        },()=>{
            this.setState({
                notificationMessage: message,
                notificationState: true
            })
        })
        setTimeout(()=>{
            this.setState({
                notificationState: false
            })
        },seconds*1000)
    }
    lg(msg, seconds = 2){
        let message = R.type(msg)==="String"?msg:JSON.stringify(msg)
        setTimeout(()=>{
            this.setState({
                notificationMessage: "",
                notificationState: false
            },()=>{
                this.setState({
                    notificationMessage: message,
                    notificationState: true
                })
            })
        },seconds*1000)
        setTimeout(()=>{
            this.setState({
                notificationState: false
            })
        },seconds*1000+2000)
    }
    componentDidMount() {
        J.emitter.on("once init", ()=>{
            J.getData(`${J.host}/read/data`).then(incoming => {
                let globalData =R.compose(R.values,R.filter(val => {
                    return R.equals(R.prop("imageSrc",val),undefined)||R.equals(R.prop("imageSrc",val),false)
                }))(incoming)
                globalData = J.addProp("childSafetyFlag", true, globalData)
                globalData = J.addProp("imageSrc", false, globalData)
                globalData = J.shuffle(globalData)
                this.setState({globalData},()=>{
                    J.emitter.emit("init")
                })
            })
        })
        J.emitter.on("init", ()=>{
                J.log("init")
                let data = this.state.globalData[this.state.globalIndex]
                let searchImageKeywordArr = J.stopWordsFilter(data.dePart)
                searchImageKeywordArr = R.sort((a,b)=>{return a.length-b.length},searchImageKeywordArr)
                if(searchImageKeywordArr.length>0){
                    this.setState({
                        data,
                        searchImageKeyword: R.last(searchImageKeywordArr),
                        deWord: "",
                        enWord: ""
                    },()=>{
                        this.log(this.state.data.dePart.length,3)
                        if(this.state.data.dePart.length>70){
                            this.lg("TOO LONG!!")
                        }
                        J.emitter.emit("searchImageFirst")
                        setTimeout(()=>{
                            J.log(searchImageKeywordArr)
                            this.setState({searchImageKeyword: ""})
                        },1000)
                    })
                }else{
                    this.setState({data})
                }
        })
        J.emitter.on("next", ()=>{
            J.log("next")
            let willBeIndex = this.state.globalIndex === this.state.globalData.length-1 ? 0 : this.state.globalIndex + 1
            this.setState({
                globalIndex: willBeIndex
            },()=>{
                J.emitter.emit("init")
            })
        })
        J.emitter.on("ready", ()=>{
            J.log("ready")
            if(!R.equals(this.state.data,this.state.dataHolder)){
                this.log(this.normalizeData())
                J.log(this.normalizeData())
                let willSend = JSON.stringify({data: this.state.data})
                if(R.type(this.state.data.imageSrc)==="String"){
                    J.postData(`${J.host}/learningMeme`, willSend).then(() =>{
                        this.lg("learningMeme")
                    })
                }else{
                    J.postData(`${J.host}/updateSingle`, willSend).then(() =>{
                        this.lg("updated")
                    })
                }
            }else{
                this.log("nothing changed")
            }
            J.emitter.emit("next")
        })
        J.emitter.on("remove",()=>{
            let willSend = JSON.stringify({id: this.state.data.id})
            J.log(this.state.data.id)
            this.log(this.state.data.id)
            J.postData(`${J.host}/removeSingle`,willSend).then(() =>{this.lg("removed")})
            J.emitter.emit("next")
        })
        J.emitter.on("searchImage", ()=>{
            J.log("searchImage")
            this.log("searchImage",1)
            J.postData(`${J.host}/searchImage`, JSON.stringify({searchImageKeyword: this.state.searchImageKeyword})).then(incoming =>{
                this.setState({searchImageResult: J.addProp("className", "unselectedImage", incoming)})
            })
        })
        J.emitter.on("searchImageFirst", ()=>{
            J.postData(`${J.host}/searchImageFirst`, JSON.stringify({searchImageKeyword: this.state.searchImageKeyword})).then(incoming =>{
                this.setState({searchImageResult: J.addProp("className", "unselectedImage", incoming)})
            })
        })
        initOnce()
    }
    normalizeData(){
        let willReturn = this.state.data
        willReturn.dePart = J.addFullstop(willReturn.dePart)
        willReturn.enPart = J.addFullstop(willReturn.enPart)
        if(willReturn.category==="preDraft"&&willReturn.enPart!==""){
            willReturn.category = "quotes"
        }
        if(willReturn.category==="draft"&&willReturn.enPart.length>5){
            willReturn.category = "quotes"
        }
        if(this.state.deWord.length>2){
            willReturn.deWord = this.state.deWord
            willReturn.enWord = this.state.enWord
        }
        return willReturn
    }
    handleImageClick(event) {
        let searchImageResult = this.state.searchImageResult
        let index = R.compose(R.multiply(1), R.last, R.split(" "))(event.target.className)
        let className = R.compose(R.head, R.split(" "))(event.target.className)
        searchImageResult = J.setProp("className", "unselectedImage", searchImageResult)
        if (className === "unselectedImage") {
            className = "selectedImage"
            this.setState({
                data: R.merge(this.state.data,{
                    imageSrc: this.state.searchImageResult[index].imageSrc
                })
            })
        } else {
            className = "unselectedImage"
            this.setState({
                data: R.merge(this.state.data,{imageSrc: false})
            })
        }
        searchImageResult[ index ] = R.merge(searchImageResult[ index ], {className})
        this.setState({searchImageResult})
    }
    handleReady() {J.emitter.emit("ready")}
    handleRemove() {J.emitter.emit("remove")}
    handleToggle(){
        this.setState({
            data: R.set(R.lensProp("childSafetyFlag"), R.not(this.state.data.childSafetyFlag), this.state.data)
        })
    }
    handleNextNavigation() {
        if ((this.state.paginationIndex + this.state.paginationPerPageCount) < this.state.searchImageResult.length) {
            this.setState({
                paginationIndex: this.state.paginationIndex + this.state.paginationPerPageCount
            })
        }
    }
    handlePrevNavigation() {
        if ((this.state.paginationIndex - this.state.paginationPerPageCount) >= 0) {
            this.setState({
                paginationIndex: this.state.paginationIndex - this.state.paginationPerPageCount
            })
        }
    }
    handleSearchInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("searchImage")
        }
        this.setState({
            searchImageKeyword: event.target.value
        })
    }
    handleDeWordInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("ready")
        }
        this.setState({
            deWord: event.target.value
        })

    }
    handleEnWordInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("ready")
        }
        this.setState({
            enWord: event.target.value
        })
    }
    handleDeInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("ready")
        }
        this.setState({
            data: R.merge(this.state.data,{dePart: event.target.value})
        })
        if(event.target.value.length>68){
            this.log(`TOO LONG - ${event.target.value.length}`, 5)
        }
    }
    handleEnInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("ready")
        }
        this.setState({
            data: R.merge(this.state.data,{enPart: event.target.value})
        })
        if(event.target.value.length>68){
            this.log(`TOO LONG - ${event.target.value.length}`, 5)
        }
    }
    render () {
        return (
    <div>
        <div className="columns box">
            <div className="column is-4">
                <a className="button" onClick={this.handlePrevNavigation}><span className="icon"><i className="fa fa-arrow-circle-left"></i></span></a>
                <a className="button" onClick={this.handleNextNavigation}><span className="icon"><i className="fa fa-arrow-circle-right"></i></span></a>
                <a className="button is-primary is-inverted" onClick={this.handleReady}><span className="icon"><i className="fa fa-check"></i></span></a>
                <a className="button is-primary is-inverted" onClick={this.handleRemove}><span className="icon"><i className="fa fa-remove"></i></span></a>
                <a id="toggleId" className={`button ${this.state.data.childSafetyFlag?"is-success":"is-danger"} is-inverted`} onClick={this.handleToggle}><span className="icon"><i className="fa fa-child"></i></span></a>
                <a className="button is-primary is-inverted" onClick={this.handleRemove}><span className="icon"><i className="fa fa-flag-o"></i></span></a>
                <a className="button is-primary is-inverted" onClick={this.handleRemove}><span className="icon"><i className="fa fa-flag"></i></span></a>
            </div>
            <div className="column is-2">
                <input autoFocus={false} className="searchImageKeyword" type="search" value={this.state.searchImageKeyword} size={this.state.searchImageKeyword.length>10?this.state.searchImageKeyword.length:10} onChange={this.handleSearchInput} onKeyPress={this.handleSearchInput}/>
            </div>
            <div className="column is-3">
                <input className="deWordInput" type="text" value={this.state.deWord} placeholder="deWord" spellCheck="true" size={this.state.deWord.length>10?this.state.deWord.length:10} onChange={this.handleDeWordInput} onKeyPress={this.handleDeWordInput}/>
            </div>
            <div className="column is-3">
                <input className="enWordInput" type="text" value={this.state.enWord} placeholder="enWord" spellCheck="true" size={this.state.enWord.length>10?this.state.enWord.length:10} onChange={this.handleEnWordInput} onKeyPress={this.handleEnWordInput}/>
            </div>
        </div>
        <div className="columns box">
            <div className="column is-5">
                <input autoFocus={true} spellCheck="true" type="text" size={this.state.data.dePart.length} className="commonInput" value={this.state.data.dePart} onChange={this.handleDeInput} onKeyPress={this.handleDeInput} />
            </div>
            <div className="column is-2"></div>
            <div className="column is-5">
                <input autoFocus={false} spellCheck="true" type="text" size={this.state.data.enPart.length} className="commonInput" value={this.state.data.enPart} onChange={this.handleEnInput} onKeyPress={this.handleEnInput} />
            </div>
        </div>
        <div className="columns is-multiline box has-text-centered">
        {this.state.searchImageResult.map((val, index)=>{
            if(R.gt(index,this.state.paginationIndex)&&R.lte(index,this.state.paginationIndex+this.state.paginationPerPageCount)){
                return <Image key={index} className={`${val.className} ${index}`} handleImageClick={this.handleImageClick} imageSrc={val.imageThumb} />
            }
        })}
        </div>
        <Notification isActive={this.state.notificationState} message={this.state.notificationMessage} />
        <div id="reactContainer"></div>
	</div>
    )}
}
