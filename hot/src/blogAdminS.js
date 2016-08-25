"use strict"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import Alert from "react-s-alert"
const markdown = require("markdown").markdown
//import Textarea from "react-textarea-autosize"
import * as R from "ramda"
import J from "../../_inc/commonReact.js"
const shallowCompare = require("react-addons-shallow-compare")
const ChooseBlogPost = require("./components/chooseBlogPost").main
const SearchImage = require("./components/searchImage").main
import Select from "react-select"
let io = require("socket.io-client")
let socket = io.connect("http://localhost:3001", {reconnect: true})
socket.on("connect", ()=>{
    //console.log("Connected!")
})
let alertModeArr = ["warning", "error", "info", "success"]
let alertEffectArr = ["slide", "scale", "bouncyflip", "flip", "genie", "jelly", "stackslide"]
function alertRandomFn() {
    let effect = R.head(J.shuffle(alertEffectArr))
    let mode = R.head(J.shuffle(alertModeArr))
    return {effect, mode}
}
//socket.emit("test", "me")
var options = [
    { value: "nodejs", label: "Node.js", searchable:false },
    { value: "reactjs", label: "React.js" },
    { value: "javascript", label: "Javascript" }
]
let imageSrcMock = "https://i.imgur.com/8mqZD47.jpg"
function markdownToHtml(markdownData) {
    let __html = markdown.toHTML(markdownData)
    return {__html}
}
function canonicalFn(str) {
    return R.compose(R.replace(/\s/g, "-"), R.toLower, R.trim)(str)
}
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            canonical: "",
            title: "",
            category: "nodejs",
            content: "",
            timestamp: Date.now(),
            canonicalFlag:false,
            modalIsActive: "",
            promptIsActive: "",
            promptCaller:"",
            promptValue:"",
            previewState: markdownToHtml(""),
            searchImageKeyword: "",
            selectionEnd: 0,
            rows: 0,
            imageObj: {imageSrc:"", altTag:""},
            notificationMessage: "",
            notificationState: false
        }
        this.addNewPost = this.addNewPost.bind(this)
        this.altTag = "i learn smarter"
        this.blogPostSelection = this.blogPostSelection.bind(this)
        this.categorySelect = this.categorySelect.bind(this)
        this.chooseBlogPost = this.chooseBlogPost.bind(this)
        this.editTitleInput = this.editTitleInput.bind(this)
        this.fileUpload = this.fileUpload.bind(this)
        this.handleContextMenu = this.handleContextMenu.bind(this)
        this.handleEditor = this.handleEditor.bind(this)
        this.handleEditorClick = this.handleEditorClick.bind(this)
        this.handleImageClick = this.handleImageClick.bind(this)
        this.handleInsertImage = this.handleInsertImage.bind(this)
        this.handlePublish = this.handlePublish.bind(this)
        this.handlePrompt = this.handlePrompt.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleTitle = this.handleTitle.bind(this)
        this.insertInternalLink = this.insertInternalLink.bind(this)
        this.insertLink = this.insertLink.bind(this)
        this.searchImageInput = this.searchImageInput.bind(this)
        this.showSearchImage = this.showSearchImage.bind(this)
        this.textEffect = this.textEffect.bind(this)
    }
    shouldComponentUpdate(nextProps, nextState) {
        return shallowCompare(this, nextProps, nextState)
    }
    componentDidMount() {
        J.emitter.on("clear", ()=>{
            this.setState({
                canonical:"",
                title:"",
                category:"nodejs",
                content:"",
                previewState:markdownToHtml("")
            })
        })
        J.emitter.on("search image", ()=>{
            let searchImageKeyword = this.state.searchImageKeyword
            J.postData(`${J.hapi}/searchImageFast`, {searchImageKeyword}).then(data =>{
                this.setState({searchImageKeyword: ""})
                ReactDOM.render(<SearchImage data={data} emitter={J.emitter} handleClick={this.handleImageClick}/>, document.getElementById("reactContainer"))
            })
        })
        J.emitter.on("search image socketio", ()=>{
            let counter = 0
            let data = []
            let searchImageArrRaw = this.state.searchImageKeyword.split(" ")
            let searchImageArr = []
            searchImageArrRaw.map((val, key)=>{
                if (key !== searchImageArrRaw.length - 1) {
                    searchImageArr.push(`${val} ${R.last(searchImageArrRaw)}`)
                }
            })
            searchImageArr.push(this.state.searchImageKeyword)
            let promisedChain = searchImageArr.map(searchImageKeyword=>{
                return J.postData(`${J.hapi}/searchImage/socketio`, {searchImageKeyword})
            })
            Promise.all(promisedChain).then(()=>{
                this.setState({searchImageKeyword: ""})
                ReactDOM.render(<SearchImage data={data} emitter={J.emitter} handleClick={this.handleImageClick}/>, document.getElementById("reactContainer"))
            })
            socket.on("searchImage", (socketData)=> {
                data = R.flatten([data, socketData])
            })
        })
        J.emitter.on("rows", ()=>{
            let rows = Math.round(R.divide(this.state.content.length, 100)) + R.split("\n", this.state.content).length
            this.setState({rows})
        })
        J.emitter.on("prompt ready", ()=>{
            if (this.state.promptCaller === "insertLink") {
                let selectionStart = document.getElementById("editorId").selectionStart
                let selectionEnd = document.getElementById("editorId").selectionEnd
                let start = this.state.content.substr(0, selectionStart)
                let middleRaw = this.state.content.substring(selectionStart, selectionEnd)
                let end = this.state.content.substr(selectionEnd)
                let middle = `[${middleRaw}](${this.state.promptValue} "${middleRaw}")`
                let content = `${start}${modificator}${middle}${modificator}${end}`
                let previewState = markdownToHtml(content)
                this.setState({content, previewState, promptValue:"", promptCaller:"", promptIsActive:""})
            }
        })
        J.emitter.on("unmount", ()=>{
            ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
        })
    }
    addNewPost() {
        this.setState({canonicalFlag:true, canonical:"", title:"", content:"", previewState:markdownToHtml(""), modalIsActive:"is-active"})
        setTimeout(()=>{
            document.getElementById("titleId").focus()
        }, 100)
    }
    blogPostSelection(obj) {
        let previewState = markdownToHtml(obj.content)
        this.setState(R.merge(obj, {previewState}), ()=>{
            J.emitter.emit("unmount")
            J.emitter.emit("rows")
        })
    }
    categorySelect(event) {
        this.setState({category:event.value})
    }
    chooseBlogPost() {
        J.postData(`${J.hapi}/blogPosts`, {}).then(data=>{
            ReactDOM.render(<ChooseBlogPost data={data} handleClick={this.blogPostSelection}/>, document.getElementById("reactContainer"))
        })
    }
    editTitleInput(event) {
        this.setState({
            title: event.target.value
        })
    }
    handleContextMenu(event) {
        J.log(window.getSelection().toString())
        event.preventDefault()
    }
    handleEditor(event) {
        let content = event.target.value
        let selectionEnd = document.getElementById("editorId").selectionEnd
        let previewState = markdownToHtml(content)
        this.setState({content, previewState, selectionEnd}, ()=>{
            if (event.key !== undefined) {
                J.emitter.emit("rows")
            }
        })
    }
    handleEditorClick(event) {
        let selectionEnd = document.getElementById("editorId").selectionEnd
        this.setState({selectionEnd})
    }
    handleImageClick(data) {
        J.postData(`${J.hapi}/uploadImage/blog`, {imageSrc:data.imageSrc, altTag:this.altTag})
        .then(imageObj=>{
            J.log(imageObj)
            this.setState({imageObj})
        })
        J.emitter.emit("unmount")
    }
    handleInsertImage() {
        let start = this.state.content.substr(0, this.state.selectionEnd)
        let end = this.state.content.substr(this.state.selectionEnd)
        console.log(R.last(start), R.head(end), "handleInsertImage")
        let content = `${start}![${this.state.imageObj.altTag}](${this.state.imageObj.imageSrc})${end}`
        this.setState({content})
    }
    handlePrompt(event) {
        if (event.key === "Enter") {
            this.notify(event.target.value)
            this.setState({promptIsActive: "", promptValue:event.target.value }, ()=>{
                J.emitter.emit("prompt ready")
            })
        }
    }
    handlePublish() {
        let {canonical, title, category, content} = this.state
        let timestamp = Date.now()
        J.postData(`${J.hapi}/addBlog`, {canonical, title, category, content, timestamp}).then(data=>{
            this.notify("Published")
            J.log(data)
        })
    }
    handleRemove() {
        let {canonical} = this.state
        J.postData(`${J.hapi}/removeBlog`, {canonical}).then(data=>{
            this.notify(data)
            J.emitter.emit("clear")
        })
    }
    handleTitle(event) {
        if (event.key === "Enter") {
            if (this.state.canonicalFlag) {
                this.setState({modalIsActive: "", canonical: canonicalFn(this.state.title), canonicalFlag:false})
            } else {
                this.setState({modalIsActive: ""})
            }
        } else {
            this.setState({title: event.target.value})
        }
    }
    fileUpload() {
        J.log(document.getElementById("fileInput").files[ 0 ])
    }
    insertLink() {
        this.setState({promptIsActive:"is-active", promptCaller:"insertLink"}, ()=>{
            setTimeout(()=>{
                document.getElementById("promptId").focus()
            }, 100)
        })
    }
    insertInternalLink() {
        J.postData(`${J.hapi}/blogPosts`, {}).then(data=>{
            this.notify(data.length)
            let localHandleClick = (obj)=>{
                let selectionStart = document.getElementById("editorId").selectionStart
                let selectionEnd = document.getElementById("editorId").selectionEnd
                let start = this.state.content.substr(0, selectionStart)
                let middleRaw = this.state.content.substring(selectionStart, selectionEnd)
                let end = this.state.content.substr(selectionEnd)
                let modificatorStart
                let middle = `[${middleRaw}](/blog-${obj.category}Category-${obj.canonical} "${obj.title}")`
                let content = `${start}${middle}${end}`
                let previewState = markdownToHtml(content)
                this.notify(middle)
                this.setState({content, previewState}, ()=>{
                    J.emitter.emit("unmount")
                })
            }
            ReactDOM.render(<ChooseBlogPost data={data} handleClick={localHandleClick}/>, document.getElementById("reactContainer"))
        })
    }
    notify(msg, seconds = 2) {
        if (R.type(msg) !== "String") {
            msg = JSON.stringify(msg)
        }
        let settings = alertRandomFn()
        Alert[ settings.mode ](msg, {
            position: "top-right",
            effect: settings.effect,
            timeout: seconds * 1000,
            offset: 100
        })
    }
    textEffect(modificator) {
        let selectionStart = document.getElementById("editorId").selectionStart
        let selectionEnd = document.getElementById("editorId").selectionEnd
        let start = this.state.content.substr(0, selectionStart)
        let middle = this.state.content.substring(selectionStart, selectionEnd)
        let end = this.state.content.substr(selectionEnd)
        let content = `${start}${modificator}${middle}${modificator}${end}`
        let previewState = markdownToHtml(content)
        this.setState({content, previewState})
    }
    searchImageInput(event) {
        this.setState({
            searchImageKeyword: event.target.value
        })
        if (event.key === "Enter") {
            if (this.state.title !== "") {
                this.altTag = R.compose(R.join(" "), R.take(3), val=>J.shuffle(val), R.split(" "))(`${this.state.title} ${this.state.searchImageKeyword}`)
            } else {
                this.altTag = R.compose(R.join(" "), R.take(3), val=>J.shuffle(val), R.split(" "))(this.state.searchImageKeyword)
            }
            if (R.split(" ", this.state.searchImageKeyword).length > 2) {
                J.emitter.emit("search image socketio")
            } else {
                J.emitter.emit("search image")
            }
        }
    }
    showSearchImage() {
        J.emitter.emit("search image visibility")
    }
    render () {
        return (
<div>
    <div className="columns is-marginless">
            <div className="column box is-5">
                <a className="button is-primary is-inverted" title="Show Images" onClick={this.showSearchImage}><span className="icon"><i className="fa fa-eye"></i></span></a>
                <a className="button is-primary is-inverted" title="Insert Image" onClick={this.handleInsertImage}><span className="icon"><i className="fa fa-picture-o"></i></span></a>
                <a className="button is-primary is-inverted" title="Publish" onClick={this.handlePublish}><span className="icon"><i className="fa fa-paper-plane-o"></i></span></a>
                <a className="button is-primary is-inverted" title="chooseBlogPost" onClick={this.chooseBlogPost}><span className="icon"><i className="fa fa-hand-o-down"></i></span></a>
                <a className="button is-primary is-inverted" title="addNewPost" onClick={this.addNewPost}><span className="icon"><i className="fa fa-plus"></i></span></a>
                <a className="button is-primary is-inverted" onClick={this.handleRemove}><span className="icon"><i className="fa fa-times"></i></span></a>
                <a className="button is-link is-inverted" onClick={()=>{this.textEffect("**")}}><span className="icon"><i className="fa fa-bold"></i></span></a>
                <a className="button is-link is-inverted" onClick={()=>{this.textEffect("***")}}><span className="icon"><i className="fa fa-asterisk"></i></span></a>
                <a className="button is-link is-inverted" onClick={()=>{this.textEffect("*")}}><span className="icon"><i className="fa fa-italic"></i></span></a>
                <a className="button is-link is-inverted" onClick={this.insertLink}><span className="icon"><i className="fa fa-external-link"></i></span></a>
                <a className="button is-link is-inverted" onClick={this.insertInternalLink}><span className="icon"><i className="fa fa-link"></i></span></a>
                <input type="file" id="fileInput" size="2" onChange={this.fileUpload}/>
            </div>
            <div className="column is-2" >
                <input type="text" placeholder="search image" value={this.state.searchImageKeyword} onKeyPress={this.searchImageInput} onChange={this.searchImageInput} />
            </div>
            <div className="column is-5" >
                <input type="text" size="60" onKeyPress={this.editTitleInput} onChange={this.editTitleInput} value={this.state.title}/>
                <Select name="category" value={this.state.category} options={options} onChange={this.categorySelect} autoBlur={true} clearable={false} searchable={false}/>
            </div>
    </div>
    <div className="columns">
        <div className="column box is-half has-text-left is-marginless">
            <textarea className="blogAdminTextarea" autoFocus id="editorId" name="editor" onContextMenu={this.handleContextMenu} onChange={this.handleEditor} onKeyPress={this.handleEditor} onClick={this.handleEditorClick} value={this.state.content} rows={this.state.rows}></textarea>
        </div>
        <div className="column is-half has-text-left is-marginless">
            <div className="blogAdminPreview" dangerouslySetInnerHTML={this.state.previewState}></div>
        </div>
    </div>
    <Alert stack={{limit:7}} />
    <div id="reactContainer"></div>
    <div className={`modal outlined ${this.state.modalIsActive}`}>
      <div className="modal-background outlined"></div>
      <div className="modal-container outlined">
        <div className="modal-content outlined">
            <div className="box">
                <input id="titleId" className="bigInput" type="text" placeholder="Title..." value={this.state.title} onKeyPress={this.handleTitle} onChange={this.handleTitle}/>
            </div>
        </div>
      </div>
      <button className="modal-close" onClick={()=>{this.setState({modalIsActive:""})}}></button>
    </div>
    <div className={`modal outlined ${this.state.promptIsActive}`}>
      <div className="modal-background outlined"></div>
      <div className="modal-container outlined">
        <div className="modal-content outlined">
            <div className="box">
                <input id="promptId" className="bigInput" type="text" placeholder="..." value={this.state.promptValue} onKeyPress={this.handlePrompt} onChange={this.handlePrompt}/>
            </div>
        </div>
      </div>
      <button className="modal-close" onClick={()=>{this.setState({modalIsActive:""})}}></button>
    </div>
</div>
    )}
}
