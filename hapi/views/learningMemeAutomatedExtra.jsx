"use strict"
import {React} from "../../_inc/commonReact.js"
let Component = React.Component
const DefaultLayout = require("./base/learningMemeAutomatedExtra.jsx")
let App = React.createClass({
    render: function() {
        return <DefaultLayout title="Learning Meme Automated Extra| Online Learn German" description="Infinite loop of learning memes which can help you better learn German language" keyword="learningMemeAutomatedExtra"></DefaultLayout>
    }
})
module.exports = App
