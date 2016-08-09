"use strict"
import React, { Component } from "react"
const DefaultLayout = require("./base/basic.jsx")

class IndexContainer extends Component {
    render() {
        return (
            <div className="columns">
                 <div className="column is-10 is-offset-1">
                      <div className="content">
                          There is reason for a error and error it is!
                      </div>
                  </div>
            </div>
        )
    }
}

let WillExport = React.createClass({
    render: function() {
        return <DefaultLayout><IndexContainer/></DefaultLayout>
    }
})

module.exports = WillExport
