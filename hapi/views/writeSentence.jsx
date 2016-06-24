"use strict"
import React,{ Component } from"react"
var DefaultLayout = require("./default.jsx")

let WillExport = React.createClass({
    render: function() {
        return<DefaultLayout title="Write Sentence App| Practical Way to Learn German language" keyword="writeSentenceFront"></DefaultLayout>
    }
})

module.exports = WillExport
