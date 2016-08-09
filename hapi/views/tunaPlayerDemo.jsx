"use strict"
import React, { Component } from "react"
const DefaultLayout = require("./base/tunaPlayerDemo.jsx")

let App = React.createClass({
    render: function() {
        return <DefaultLayout title="Tuna Player Demo App" keyword="tunaPlayerDemo"></DefaultLayout>
    }
})

module.exports = App
