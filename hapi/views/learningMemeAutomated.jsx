"use strict"
import React, { Component } from "react"
const DefaultLayout = require("./base/learningMeme.jsx")

let App = React.createClass({
    render: function() {
        return <DefaultLayout title="Learning Meme Automated| Learn German Language Application" description="Demo of application which helps you memorise German words with predefined memes" keyword="learningMemeAutomated"></DefaultLayout>
    }
})

module.exports = App
