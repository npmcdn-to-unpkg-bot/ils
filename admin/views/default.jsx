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
                  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"/>
                  <link rel="stylesheet" href="bulma.css"/>
              </head>
              <body>
              <div className="columns is-mobile has-text-centered">
                <div className="column is-half is-offset-one-quarter has-text-centered">
                    <span className="is-text-centered navItem"><a className="button is-normal" href="/db" rel="nofollow">db</a></span>
                    <span className="is-text-centered navItem"><a className="button is-normal" href="/#" rel="nofollow">Next</a></span>
                    <span className="is-text-centered navItem"><a className="button is-normal" href="/#" rel="nofollow">Next</a></span>
                    <span className="is-text-centered navItem"><a className="button is-normal" href="/#" rel="nofollow">Next</a></span>
                </div>
              </div>
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
