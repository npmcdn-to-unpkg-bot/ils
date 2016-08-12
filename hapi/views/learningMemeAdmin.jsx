"use strict"
import React, { Component } from "react"
const DefaultLayout = require("./base/learningMemeAdmin.jsx")
let App = React.createClass({
    render: function() {
        return <DefaultLayout title="translateDraft" keyword="translateDraft"></DefaultLayout>
    }
})
module.exports = App
