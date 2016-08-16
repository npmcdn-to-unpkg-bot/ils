"use strict"
import React, { Component } from "react"
import {Editor, EditorState, RichUtils} from "draft-js"
import * as R from "ramda"
const J = require("./components/commonReact")
let initOnce = R.once(()=>{
    emitter.emit("init")
})
let imageSrcMock = "https://i.imgur.com/8mqZD47.jpg"
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            editorState: EditorState.createEmpty(),
            keyword: ""
        }
        this.handleKeyCommand = this.handleKeyCommand.bind(this)
        this.willHandleDraft = this.willHandleDraft.bind(this)
        this.addImage = this.addImage.bind(this)
        this.keywordFn = this.keywordFn.bind(this)
        this.publish = this.publish.bind(this)
    }
    static get defaultProps () {
        return {
            "message": "dummy message"
        }
    }
    handleSearchImage(event) {
        this.setState({
            keyword: `${this.state.keyword}${event.key}`
        })
    }
    publish() {
        let willPost = {
            keyword: this.state.keyword,
            content: this.state.editorState.getCurrentContent().getPlainText()
        }
        J.log(willPost)
    }
    componentDidMount() {
        emitter.on("init", ()=>{

        })
        initOnce()
    }
    willHandleDraft (editorState) {
        console.log(this.state.editorState.getCurrentContent().getPlainText())
        this.setState({editorState})
    }
    handleKeyCommand(command) {
        const newState = RichUtils.handleKeyCommand(this.state.editorState, command)
        if (newState) {
            this.onChange(newState)
            return true
        }
        return false
    }

    render () {
        const {editorState} = this.state
        return (
<div>
    <div className="columns box">
        <div className="column is-half is-offset-one-quarter has-text-centered" >
            <Editor editorState={editorState} value={this.state.title} onChange={this.willHandleDraft} handleKeyCommand={this.handleKeyCommand} placeholder="Enter some text..." />
        </div>
    </div>
    <div className="columns box">
        <div className="column is-half is-offset-one-quarter has-text-centered" >
            <input type="text" onKeyPress={this.keywordFn} />
            <hr/>
            <a className="button is-primary" onClick={this.publish}>publish</a>
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
