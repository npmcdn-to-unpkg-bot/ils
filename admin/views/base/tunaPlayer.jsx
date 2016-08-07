"use strict"
import React, { Component } from "react"

class Navigation extends Component {
    constructor (props) {
        super(props)
    }
    static get defaultProps () {
        return {
            keyword: "empty"
        }
    }
    render () {
        return (
            <html>
              <head>
                  <title>{this.props.keyword}</title>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.6.3/css/font-awesome.css"/>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.1.2/css/bulma.min.css"/>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/react-select/0.9.1/react-select.min.css"/>
                  <link rel="stylesheet" href="//localhost:3000/css/admin.css"/>
                  <link rel="stylesheet" href="//localhost:3000/css/slider.css"/>
              </head>
              <body>
                    <div>
                        {this.props.children}
                    </div>
                    <div id="reactHook"></div>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/tunajs/0.4.5/tuna-min.js"></script>
                    <script src={`${this.props.keyword}Front.js`} ></script>
                </body>
            </html>
        )
    }
}

module.exports = Navigation
