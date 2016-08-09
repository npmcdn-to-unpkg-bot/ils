"use strict"
import React, { Component } from "react"
const DefaultLayout = require("./base/learningMeme.jsx")

let App = React.createClass({
    render: function() {
        return <DefaultLayout title="Learning Meme | Learn German Language Application" description="Memorise German words with predefined memes" keyword="learningMeme"></DefaultLayout>
    }
})

module.exports = App
