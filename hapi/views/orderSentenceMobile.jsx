"use strict"
import {React} from "../../_inc/commonReact.js"
let Component = React.Component
const DefaultLayout = require("./base/orderSentenceMobile.jsx")
let App = React.createClass({
    render: function() {
        return <DefaultLayout title="Order Unordered German Sentence | Learn German language App" description="Learn how German sentences are formed by ordering unordered sentences" keyword="orderSentenceMobile"></DefaultLayout>
    }
})
module.exports = App
