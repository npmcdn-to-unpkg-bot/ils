"use strict"
import {React} from "../../_inc/commonReact.js"
let Component = React.Component
const DefaultLayout = require("./base/learningMemeAutomated.jsx")
let App = React.createClass({
    render: function() {
        return <DefaultLayout title="Learning Meme Automated| Learn German Language Application" description="Demo of application which helps you memorise German words with predefined memes" keyword="learningMemeAutomated"></DefaultLayout>
    }
})

module.exports = App
