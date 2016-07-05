"use strict"
import React, { Component } from "react"
var DefaultLayout = require("./defaultAnimate.jsx")

let WillExport = React.createClass({
    render: function() {
        return <DefaultLayout title="Order German Sentence App| Learn German language" description="Learn how German sentences are formed by ordering unordered sentences" keyword="orderSentenceFront"></DefaultLayout>
    }
})

module.exports = WillExport
