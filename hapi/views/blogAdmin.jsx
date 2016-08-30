"use strict"
import {React} from "../../_inc/commonReact.js"
let Component = React.Component
const DefaultLayout = require("./base/blogAdmin.jsx")
let App = React.createClass({
    render: function() {
        return <DefaultLayout title="blogAdmin" keyword="blogAdmin"></DefaultLayout>
    }
})
module.exports = App
