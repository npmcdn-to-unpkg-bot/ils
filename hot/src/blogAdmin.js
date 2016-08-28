"use strict"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import Alert from "react-s-alert"
const markdown = require("markdown").markdown
let InsertLink = require("react-icons/lib/ti/attachment-outline")
//let ShowInfo = require("react-icons/lib/ti/info-large")
//let AddNewPost = require("react-icons/lib/ti/plus-outline")
import * as R from "ramda"
import J from "../../_inc/commonReact.js"
const ChooseBlogPost = require("./components/chooseBlogPost").main
const SearchImage = require("./components/searchImage").main
import Select from "react-select"
let io = require("socket.io-client")
let socket = io.connect(J.hapi, {reconnect: true})
socket.on("connect", ()=>{
    console.log("Connected!")
})
let alertModeArr = ["warning", "error", "info", "success"]
let alertEffectArr = ["slide", "scale", "bouncyflip", "flip", "genie", "jelly", "stackslide"]
function alertRandomFn() {
    let effect = R.head(J.shuffle(alertEffectArr))
    let mode = R.head(J.shuffle(alertModeArr))
    return {effect, mode}
}
var options = [
    { value: "nodejs", label: "Node.js", searchable:false },
    { value: "reactjs", label: "React.js" },
    { value: "javascript", label: "Javascript" }
]
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
        this.addLine = this.addLine.bind(this)
        this.altTag = "i learn smarter"
        this.blogPostSelection = this.blogPostSelection.bind(this)
        this.categorySelect = this.categorySelect.bind(this)
        this.chooseBlogPost = this.chooseBlogPost.bind(this)
        this.editTitle = this.editTitle.bind(this)
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
        this.insertInternalLink = this.insertInternalLink.bind(this)
        this.insertLink = this.insertLink.bind(this)
        this.searchImageInput = this.searchImageInput.bind(this)
        this.showInfo = this.showInfo.bind(this)
        this.showSearchImage = this.showSearchImage.bind(this)
        this.textEffect = this.textEffect.bind(this)
    }
    componentDidMount() {
        setTimeout(()=>{
            J.emitter.emit("rows")
        }, 1000)
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
            let searchImageKeyword = this.state.promptValue
            J.postData(`${J.hapi}/searchImageFast`, {searchImageKeyword}).then(data =>{
                ReactDOM.render(<SearchImage data={data} emitter={J.emitter} handleClick={this.handleImageClick}/>, document.getElementById("reactContainer"))
            })
        })
        J.emitter.on("search image socketio", ()=>{
            let counter = 0
            let data = []
            let searchImageArrRaw = this.state.promptValue.split(" ")
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
                ReactDOM.render(<SearchImage data={data} emitter={J.emitter} handleClick={this.handleImageClick}/>, document.getElementById("reactContainer"))
            })
            socket.on("searchImage", (socketData)=> {
                data = R.flatten([data, socketData])
            })
        })
        J.emitter.on("rows", ()=>{
            J.log(3)
            console.log(3)
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
                this.setState({content, previewState, promptValue:"", promptCaller:"", promptIsActive:""}, ()=>{
                    J.emitter.emit("rows")
                })
            } else if (this.state.promptCaller === "handleInsertImage") {
                let start = this.state.content.substr(0, this.state.selectionEnd)
                let end = this.state.content.substr(this.state.selectionEnd)
                let content = `${start}![${this.state.promptValue.altTag}](${this.state.promptValue.imageSrc})${end}`
                let previewState = markdownToHtml(content)
                this.setState({content, previewState, promptValue:"", promptCaller:"", promptIsActive:""}, ()=>{
                    J.emitter.emit("rows")
                })
            } else if (this.state.promptCaller === "editTitle") {
                let title = this.state.promptValue
                this.setState({title, promptValue:"", promptCaller:"", promptIsActive:""})
            } else if (this.state.promptCaller === "addNewPost") {
                let title = this.state.promptValue
                let canonical = canonicalFn(this.state.promptValue)
                this.setState({title, canonical, promptValue:"", promptCaller:"", promptIsActive:""})
            }
        })
        J.emitter.on("prompt focus", ()=>{
            setTimeout(()=>{
                document.getElementById("promptId").focus()
            }, 100)
        })
        J.emitter.on("unmount", ()=>{
            J.log("unmount")
            console.log("unmount")
            ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
        })
        let listener = (e)=>{
            if (e.key === "Alt") {
                let selectionEnd = document.getElementById("editorId").selectionEnd
                let start = this.state.content.substr(0, selectionEnd)
                let middle = "**"
                let end = this.state.content.substr(selectionEnd)
                let content = `${start}${middle}${end}`
                let previewState = markdownToHtml(content)
                this.setState({content, previewState}, ()=>{
                    document.getElementById("editorId").selectionEnd = selectionEnd + 2
                })
            }
            if (e.key === "Tab") {
                e.preventDefault()
                let selectionEnd = document.getElementById("editorId").selectionEnd
                let start = this.state.content.substr(0, selectionEnd)
                let middle = "    "
                let end = this.state.content.substr(selectionEnd)
                let content = `${start}${middle}${end}`
                let previewState = markdownToHtml(content)
                this.setState({content, previewState})
            }
            if (e.key === "Enter") {
                let selectionEnd = document.getElementById("editorId").selectionEnd
                let start = this.state.content.substr(0, selectionEnd)
                let middle = "\n"
                let end = this.state.content.substr(selectionEnd)
                let content = `${start}${middle}${end}`
                let previewState = markdownToHtml(content)
                this.setState({content, previewState}, ()=>{
                    document.getElementById("editorId").selectionEnd = selectionEnd + 1
                })
            }
        }
        window.addEventListener("keydown", listener, false)
    }
    addLine() {
        let start = this.state.content.substr(0, this.state.selectionEnd)
        let end = this.state.content.substr(this.state.selectionEnd)
        let middle = `\n\n---\n`
        let content = `${start}${middle}${end}`
        let previewState = markdownToHtml(content)
        this.setState({content, previewState, promptValue:"", promptCaller:"", promptIsActive:""}, ()=>{
            J.emitter.emit("rows")
        })
    }
    addNewPost() {
        this.setState({
            promptIsActive:"is-active",
            promptCaller:"addNewPost",
            content:"",
            previewState:markdownToHtml("")
        }, ()=>{
            J.emitter.emit("prompt focus")
        })
    }
    blogPostSelection(obj) {
        let previewState = markdownToHtml(obj.content)
        this.setState(R.merge(obj, {previewState}), ()=>{
            J.emitter.emit("unmount")
            ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
            J.emitter.emit("rows")
        })
    }
    categorySelect(event) {
        this.setState({category:event.value})
    }
    chooseBlogPost() {
        console.log(J)
        J.log(1)
        J.postData(`${J.hapi}/blogPosts`, {}).then(data=>{
            ReactDOM.render(<ChooseBlogPost data={data} handleClick={this.blogPostSelection}/>, document.getElementById("reactContainer"))
        })
    }
    editTitle(event) {
        this.setState({
            promptCaller: "editTitle",
            promptIsActive: "is-active",
            promptValue: this.state.title
        })
    }
    editTitleInput(event) {
        this.setState({
            title: event.target.value
        })
    }
    handleContextMenu(event) {
        //J.log(window.getSelection().toString())
        //event.preventDefault()
    }
    handleEditor(event) {
        let content = event.target.value
        let selectionEnd = document.getElementById("editorId").selectionEnd
        let previewState = markdownToHtml(content)
        this.setState({content, previewState, selectionEnd})
        if (event.key !== undefined) {
            J.emitter.emit("rows")
        }
    }
    handleEditorClick(event) {
        let selectionEnd = document.getElementById("editorId").selectionEnd
        this.setState({selectionEnd})
    }
    handleImageClick(data) {
        J.emitter.emit("unmount")
        this.notify(this.altTag, 5)
        this.notify(data.imageSrc, 5)
        J.postData(`${J.hapi}/uploadImage/blog`, {imageSrc:data.imageSrc, altTag:this.altTag})
        .then(promptValue=>{
            J.log(promptValue)
            if (promptValue !== null) {
                this.setState({promptValue}, ()=>{
                    J.emitter.emit("prompt ready")
                })
            } else {
                this.setState({promptValue}, ()=>{
                    J.emitter.emit("prompt ready")
                })
            }
        })
    }
    handleInsertImage() {
        this.setState({promptIsActive:"is-active", promptCaller:"handleInsertImage"}, ()=>{
            this.notify("prompt focus")

            J.emitter.emit("prompt focus")
        })
    }
    handlePrompt(event) {
        if (event.key === "Enter") {
            J.log("enter")
            let promptValue = event.target.value.trim()
            if (this.state.promptCaller === "handleInsertImage") {
                if (this.state.title !== "") {
                    this.altTag = R.compose(R.join(" "), R.take(3), val=>J.shuffle(val), R.split(" "))(`${this.state.title} ${promptValue}`)
                } else {
                    this.altTag = R.compose(R.join(" "), R.take(3), val=>J.shuffle(val), R.split(" "))(promptValue)
                }
                this.setState({promptIsActive: "", promptValue }, ()=>{
                    if (R.split(" ", promptValue).length > 2) {
                        J.emitter.emit("search image socketio")
                    } else {
                        J.emitter.emit("search image")
                    }
                })
            } else {
                this.setState({promptIsActive: "", promptValue }, ()=>{
                    J.emitter.emit("prompt ready")
                })
            }
        } else {
            this.setState({promptValue: event.target.value})
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
    fileUpload() {
        J.log(document.getElementById("fileInput").files[ 0 ])
    }
    insertLink() {
        this.setState({promptIsActive:"is-active", promptCaller:"insertLink"}, ()=>{
            J.emitter.emit("prompt focus")
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
    notify(msg, seconds = 2, position = "top-right") {
        if (R.type(msg) !== "String") {
            msg = JSON.stringify(msg)
        }
        let settings = alertRandomFn()
        Alert[ settings.mode ](msg, {
            position,
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
    showInfo() {
        this.notify(`canonical - ${this.state.canonical}`, 3, "top")
        this.notify(`title - ${this.state.title}`, 3, "top")
        this.notify(`category - ${this.state.category}`, 3, "top")
        this.notify(`content - ${R.take(20, this.state.content)}`, 3, "top")
    }
    showSearchImage() {
        J.emitter.emit("search image visibility")
    }
    render () {
        return (
<div>
    <div className="columns is-marginless">
            <div className="column box is-9">
                <a className="button button-blue" title="chooseBlogPost" onClick={this.chooseBlogPost}><span className="icon"><i className="fa fa-hand-o-down"></i></span></a>
                <a className="button button-blue" title="Show Images" onClick={this.showSearchImage}><span className="icon"><i className="fa fa-eye"></i></span></a>
                <a className="button button-blue" title="Insert Image" onClick={this.handleInsertImage}><span className="icon"><i className="fa fa-picture-o"></i></span></a>
                <a className="button button-green" title="Publish" onClick={this.handlePublish}><span className="icon"><i className="fa fa-paper-plane-o"></i></span></a>
                <a className="button button-blue" title="addNewPost" onClick={this.addNewPost}><span className="icon"><i className="fa fa-plus"></i></span></a>
                <a className="button button-red" onClick={this.handleRemove}><span className="icon"><i className="fa fa-times"></i></span></a>
                <a className="button button-dark" onClick={this.addLine}><span className="icon"><i className="fa fa-minus"></i></span></a>
                <a className="button button-blue" title="Edit Title" onClick={this.editTitle}><span className="icon"><i className="fa fa-header"></i></span></a>
                <a className="button button-dark" onClick={()=>{this.textEffect("**")}}><span className="icon"><i className="fa fa-bold"></i></span></a>
                <a className="button button-dark" onClick={()=>{this.textEffect("***")}}><span className="icon"><i className="fa fa-asterisk"></i></span></a>
                <a className="button button-dark" onClick={()=>{this.textEffect("*")}}><span className="icon"><i className="fa fa-italic"></i></span></a>
                <InsertLink className="button-blue" title="Link" onClick={this.insertLink}></InsertLink>
                <a className="button button-blue" title="Internal Link" onClick={this.insertInternalLink}><span className="icon"><i className="fa fa-link"></i></span></a>
                <a className="button button-green" onClick={this.showInfo}><span className="icon"><i className="fa fa-info"></i></span></a>
                <input type="file" id="fileInput" size="2" onChange={this.fileUpload}/>
            </div>
            <div className="column is-3" >
                <Select name="category" value={this.state.category} options={options} onChange={this.categorySelect} autoBlur={true} clearable={false} searchable={false}/>
            </div>
    </div>
    <div className="columns">
        <div className="column box is-half has-text-left is-marginless">
            <textarea className="content" autoFocus id="editorId" name="editor" onContextMenu={this.handleContextMenu} onChange={this.handleEditor} onKeyPress={this.handleEditor} onClick={this.handleEditorClick} value={this.state.content} rows={this.state.rows}></textarea>
        </div>
        <div className="column is-half has-text-left is-marginless">
            <div className="preview" dangerouslySetInnerHTML={this.state.previewState}></div>
        </div>
    </div>
    <Alert stack={{limit:7}} />
    <div id="reactContainer"></div>
    <div className={`modal outlined ${this.state.promptIsActive}`}>
      <div className="modal-background outlined"></div>
      <div className="modal-container outlined">
        <div className="modal-content outlined">
            <div className="box">
                <input id="promptId" className="input" type="text" placeholder="..." value={this.state.promptValue} onKeyPress={this.handlePrompt} onChange={this.handlePrompt}/>
            </div>
        </div>
      </div>
      <button className="modal-close" onClick={()=>{this.setState({promptIsActive:""})}}></button>
    </div>
</div>
    )}
}
