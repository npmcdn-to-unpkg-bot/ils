"use strict"
import React from "react"
const DefaultLayout = require("./components/tunaPlayer.jsx")
let Exported = React.createClass({
    render: function () {
        return <DefaultLayout keyword="tunaPlayer"></DefaultLayout>
    }
})
module.exports = Exported
