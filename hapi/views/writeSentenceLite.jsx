"use strict"
import React, { Component } from "react"
const DefaultLayout = require("./base/writeSentence.jsx")

let App = React.createClass({
    render: function() {
        return <DefaultLayout title="Write German Sentence App | Easy Way to Learn German"
        description="Test your knowledge on German words by translating English sentences to German ones" keyword="writeSentenceLite"></DefaultLayout>
    }
})

module.exports = App
