"use strict"
import React from "react"
const DefaultLayout = require("./components/defaultAlt.jsx")
let Exported = React.createClass({
    render: function () {
        return <DefaultLayout keyword="translateBulk"></DefaultLayout>
    }
})

module.exports = Exported
