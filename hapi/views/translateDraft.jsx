"use strict"
import {React} from "../../_inc/commonReact.js"
let Component = React.Component
const DefaultLayout = require("./base/translateDraft.jsx")
let App = React.createClass({
    render: function() {
        return <DefaultLayout title="translateDraft" keyword="translateDraft"></DefaultLayout>
    }
})
module.exports = App
