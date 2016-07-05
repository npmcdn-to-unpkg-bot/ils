"use strict"
import React, { Component } from "react"
var DefaultLayout = require("./defaultLite.jsx")

let WillExport = React.createClass({
    render: function() {
        return <DefaultLayout title="Write German Sentence App | Easy Way to Learn German"
        description="Test your knowledge on German words by translating English sentences to German ones" keyword="writeSentenceLiteFront"></DefaultLayout>
    }
})

module.exports = WillExport
