"use strict"
import React,{ Component } from"react"
var DefaultLayout = require("./default.jsx")

let WillExport = React.createClass({
    render: function() {
        return<DefaultLayout title="Write German Sentence App | Easy Way to Learn German" keyword="writeSentenceLiteFront"></DefaultLayout>
    }
})

module.exports = WillExport
