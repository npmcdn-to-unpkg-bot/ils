"use strict"
import React, { Component } from "react"
const DefaultLayout = require("./base/learningMemeAdmin.jsx")
let App = React.createClass({
    render: function() {
        return <DefaultLayout title="learningMemeAdmin" keyword="learningMemeAdmin"></DefaultLayout>
    }
})
module.exports = App
