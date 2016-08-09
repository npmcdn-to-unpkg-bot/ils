"use strict"
import React from "react"
const DefaultLayout = require("./base/basic.jsx")
let App = React.createClass({
    render: function () {
        return <DefaultLayout keyword="translateDraft"></DefaultLayout>
    }
})
module.exports = App
