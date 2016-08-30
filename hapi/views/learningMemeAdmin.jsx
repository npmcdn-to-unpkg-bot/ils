"use strict"
import {React} from "../../_inc/commonReact.js"
let Component = React.Component
const DefaultLayout = require("./base/learningMemeAdmin.jsx")
let App = React.createClass({
    render: function() {
        return <DefaultLayout title="learningMemeAdmin" keyword="learningMemeAdmin"></DefaultLayout>
    }
})
module.exports = App
