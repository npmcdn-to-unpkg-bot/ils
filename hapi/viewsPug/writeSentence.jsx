"use strict"
import React from "react"
const DefaultLayout = require("./base/writeSentence.jsx")

let App = React.createClass({
    render: function() {
        return <DefaultLayout title="Write Sentence App| Practical Way to Learn German language"
        description="Test your knowledge on German words by translating English sentences to German ones" keyword="writeSentence"></DefaultLayout>
    }
})

module.exports = App
