"use strict"
import React, { Component } from "react"
var DefaultLayout = require("./defaultLite.jsx")

let WillExport = React.createClass({
    render: function() {
        return <DefaultLayout title="Write Sentence App| Practical Way to Learn German language"
        description="Test your knowledge on German words by translating English sentences to German ones" keyword="writeSentenceFront"></DefaultLayout>
    }
})

module.exports = WillExport
