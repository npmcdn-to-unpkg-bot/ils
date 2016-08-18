"use strict"
import React, { Component } from "react"
import ReactDOM from "react-dom"
//import markdown from "markdown"
const markdown = require("markdown").markdown
import * as R from "ramda"
import J from "../../_inc/commonReact.js"
const ChooseBlogPost = require("./components/chooseBlogPost").main

let imageSrcMock = "https://i.imgur.com/8mqZD47.jpg"
function markdownToHtml(markdownData) {
    let __html = markdown.toHTML(markdownData)
    return {__html}
}
function rowsFn(str) {
    return R.match(/\n/g, str).length + 2
}
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editorState: "",
            previewState: markdownToHtml(""),
            keyword: "",
            selectionEnd: 0,
            rows: 0
        }
        this.handleSearchImage = this.handleSearchImage.bind(this)
        this.handleEditor = this.handleEditor.bind(this)
        this.handleEditorClick = this.handleEditorClick.bind(this)
        this.handlePublish = this.handlePublish.bind(this)
        this.handleContextMenu = this.handleContextMenu.bind(this)
        this.handleInsertImage = this.handleInsertImage.bind(this)
        this.addNewPost = this.addNewPost.bind(this)
        this.removeCurrentPost = this.removeCurrentPost.bind(this)
        this.chooseBlogPost = this.chooseBlogPost.bind(this)
        this.blogPostSelection = this.blogPostSelection.bind(this)
    }
    addNewPost() {}
    removeCurrentPost() {}
    blogPostSelection(obj) {
        J.log(obj)
        let editorState = obj.content
        let previewState = markdownToHtml(editorState)
        this.setState({editorState, previewState})
        ReactDOM.unmountComponentAtNode(document.getElementById("reactContainer"))
    }
    chooseBlogPost() {
        J.postData(`${J.hapi}/blogPosts`, {}).then(data=>{
            ReactDOM.render(<ChooseBlogPost data={data} handleClick={this.blogPostSelection}/>, document.getElementById("reactContainer"))
        })
    }
    handleEditor(event) {
        let editorState = event.target.value
        let selectionEnd = document.getElementById("editorId").selectionEnd
        let previewState = markdownToHtml(editorState)
        this.setState({editorState, previewState, selectionEnd}, ()=>{
            J.emitter.emit("rows")
        })
    }
    handleEditorClick(event) {
        let selectionEnd = document.getElementById("editorId").selectionEnd
        this.setState({selectionEnd})
    }
    handleInsertImage() {
        let start = this.state.editorState.substr(0, this.state.selectionEnd)
        let end = this.state.editorState.substr(this.state.selectionEnd)
        let editorState = `${start}![Alt text](${imageSrcMock})${end}`
        this.setState({editorState})
    }
    handleSearchImage(event) {
        this.setState({
            keyword: `${this.state.keyword}${event.key}`
        })
    }
    handlePublish() {
    }
    handleContextMenu(event) {
        J.log(window.getSelection().toString())
        event.preventDefault()
    }
    componentDidMount() {
        J.emitter.on("rows", ()=>{
            let rows = rowsFn(this.state.editorState)
            this.setState({rows})
        })
    }
    render () {
        const {editorState} = this.state
        return (
<div>
    <div id="reactContainer"></div>
    <div className="columns is-marginless">
            <div className="column box is-4" >
                <a className="button is-primary" onClick={this.handlePublish}>publish</a>
                <a className="button is-warning is-inverted" onClick={this.handleInsertImage}>insert image</a>
                <a className="button is-error is-inverted" onClick={this.chooseBlogPost}>choose post</a>
            </div>
            <div className="column box is-4" >
                <input type="text" onKeyPress={this.handleSearchImage} />
            </div>
            <div className="column is-2" >

            </div>
    </div>
    <div className="columns">
    <div className="column box is-half has-text-left is-marginless">
        <textarea className="blogAdminTextarea" autoFocus id="editorId" name="editor" onContextMenu={this.handleContextMenu} rows={this.state.rows} onChange={this.handleEditor} onClick={this.handleEditorClick} value={this.state.editorState}></textarea>
    </div>
    <div className="column is-half has-text-left is-marginless">
        <div className="blogAdminPreview" dangerouslySetInnerHTML={this.state.previewState}></div>
    </div>
    </div>
</div>
    )}
}

function posting (url, data) {
    return new Promise((resolve)=>{
        reqwest({
            url:     url,
            method:  "post",
            data:    data,
            error: function (err) { console.log(err)},
            success: function (resp) {
                resolve(resp)
            }
        })
    })
}


function Events(target) {
    let events = {}, empty = []
    target = target || this
    target.on = function(type, func, ctx) {
        (events[ type ] = events[ type ] || []).push([func, ctx])
    }
    target.off = function(type, func) {
        type || (events = {})
        var list = events[ type ] || empty,
            i = list.length = func ? list.length : 0
        while (i--) func == list[ i ][ 0 ] && list.splice(i, 1)
    }
    target.emit = function(type) {
        let e = events[ type ] || empty, list = e.length > 0 ? e.slice(0, e.length) : e, i = 0, j
        while (j = list[ i++ ]) j[ 0 ].apply(j[ 1 ], empty.slice.call(arguments, 1))
    }
}
