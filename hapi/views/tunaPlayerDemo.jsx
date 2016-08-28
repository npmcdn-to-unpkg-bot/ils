"use strict"
import J from "../../_inc/commonReact.js"
let React = J.React
let Component = React.Component
const DefaultLayout = require("./base/tunaPlayerDemo.jsx")
let App = React.createClass({
    render: function() {
        return <DefaultLayout title="Tuna Player Demo App" keyword="tunaPlayerDemo"></DefaultLayout>
    }
})
module.exports = App
