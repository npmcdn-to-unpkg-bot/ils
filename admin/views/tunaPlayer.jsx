"use strict"
import React from "react"
const DefaultLayout = require("./base/tunaPlayer.jsx")
let App = React.createClass({
    render: function () {
        return <DefaultLayout keyword="tunaPlayer"></DefaultLayout>
    }
})
module.exports = App
