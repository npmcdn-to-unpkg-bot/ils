"use strict"
import React from "react"
const DefaultLayout = require("./components/base.jsx")
let App = React.createClass({
    render: function () {
        return <DefaultLayout keyword="test"></DefaultLayout>
    }
})
module.exports = App
