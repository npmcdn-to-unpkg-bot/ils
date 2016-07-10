"use strict"
import React from "react"
const DefaultLayout = require("./default.jsx")

let Exported = React.createClass({
    render: function () {
        return <DefaultLayout keyword="db"></DefaultLayout>
    }
})

module.exports = Exported
