"use strict"
import {React} from "../../_inc/commonReact.js"
let Component = React.Component
const DefaultLayout = require("./base/orderSentence.jsx")
let App = React.createClass({
    render: function() {
        return <DefaultLayout title="Order German Sentence App | Learn German language" description="Learn how German sentences are formed by ordering unordered sentences" keyword="test"></DefaultLayout>
    }
})
module.exports = App
