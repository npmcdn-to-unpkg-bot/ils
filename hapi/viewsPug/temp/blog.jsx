"use strict"
import React, { Component } from "react"
import ReactMarkdown from "react-markdown"

const DefaultLayout = require("./base/basic.jsx")

let WillExport = React.createClass({
    render: function() {
        return <DefaultLayout title={this.props.title}><div className="columns"><div className="column is-10 is-offset-1"><div className="content"><ReactMarkdown source={this.props.content} /></div></div></div></DefaultLayout>
    }
})

module.exports = WillExport
