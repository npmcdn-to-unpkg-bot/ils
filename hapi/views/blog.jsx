"use strict"
import React, { Component } from "react"
import ReactMarkdown from "react-markdown"

const DefaultLayout = require("./base/basic.jsx")

let App = React.createClass({
    render: function() {
        return <DefaultLayout title={this.props.title}>
            <div className="columns is-mobile">
                <div className="column is-12-mobile is-10 is-offset-1">
                    <h1 className="title">{this.props.title}</h1>
                    <div className="content"><ReactMarkdown source={this.props.content} /></div>
                </div>
            </div>
        </DefaultLayout>
    }
})

module.exports = App
