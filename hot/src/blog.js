"use strict"
import React, { Component } from "react"
import R from "ramda"
import J from "../../_inc/commonReact.js"
const markdown = require("markdown").markdown
function markdownToHtml(markdownData) {
    let __html = markdown.toHTML(markdownData)
    return {__html}
}
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }
    static get defaultProps () {
        return {
            content: "",
            title: "",
            previewState: markdownToHtml("")
        }
    }
    componentDidMount() {
        J.postData(`${J.hapi}/test`, {canonical:"alternative-almost-secure-use-of-github-hooks"}).then(data=>{
            let {title, content} = data
            let previewState = markdownToHtml(content)
            this.setState({title, content, previewState})
        })
    }
    handleClick (event) {
    }
    render () {
        return (
    <div>
        <div className="box">
        {this.state.title}
        </div>
        <div className="box">
            <div className="preview" dangerouslySetInnerHTML={this.state.previewState}></div>
        </div>
	</div>
    )}
}
