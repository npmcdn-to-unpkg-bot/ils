"use strict"
import React, { Component } from "react"
var DefaultLayout = require("./defaultAlt.jsx")

let WillExport = React.createClass({
    render: function() {
        return <DefaultLayout title="Learning Meme | Learn German Language Application" description="Memorise German words with predefined memes" keyword="learningMemeFront"></DefaultLayout>
    }
})

module.exports = WillExport
