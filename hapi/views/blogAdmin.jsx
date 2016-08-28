"use strict"
import React, { Component } from "react"
const DefaultLayout = require("./base/blogAdmin.jsx")
let App = React.createClass({
    render: function() {
        return <DefaultLayout title="blogAdmin" keyword="blogAdmin"></DefaultLayout>
    }
})
module.exports = App
