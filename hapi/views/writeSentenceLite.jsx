"use strict"
import {React} from "../../_inc/commonReact.js"
let Component = React.Component
const DefaultLayout = require("./base/writeSentence.jsx")
let App = React.createClass({
    render: function() {
        return <DefaultLayout title="Write German Sentence App | Easy Way to Learn German"
        description="Test your knowledge on German words by translating English sentences to German ones" keyword="writeSentenceLite"></DefaultLayout>
    }
})

module.exports = App
