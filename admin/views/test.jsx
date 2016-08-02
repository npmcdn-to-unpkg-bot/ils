"use strict"
import React from "react"
const DefaultLayout = require("./components/default.jsx")
let Exported = React.createClass({
    render: function () {
        return <DefaultLayout keyword="test"></DefaultLayout>
    }
})
module.exports = Exported
