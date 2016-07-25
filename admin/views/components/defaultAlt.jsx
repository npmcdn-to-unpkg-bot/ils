"use strict"
import React, { Component } from "react"
const env = require("dotenv-helper")
class Navigation extends Component {
    constructor (props) {
        super(props)
    }
    static get defaultProps () {
        return {
            keyword: "empty",
            host: env.getEnv("host")
        }
    }
    render () {
        return (
            <html>
              <head>
                  <title>{this.props.keyword}</title>
                  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"/>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.1.0/css/bulma.min.css"/>
                  <link rel="stylesheet" href={`${this.props.host}/css/admin.css`}/>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/react-select/0.9.1/react-select.min.css"/>
              </head>
              <body>
                    <div>
                        {this.props.children}
                    </div>
                    <div id="reactHook"></div>
                    <script src={`${this.props.keyword}Front.js`} ></script>
                </body>
            </html>
        )
    }
}

module.exports = Navigation
