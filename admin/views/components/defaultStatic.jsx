"use strict"
import React, { Component } from "react"

class Navigation extends Component {
    constructor (props) {
        super(props)
    }
    static get defaultProps () {
        return {
            title: "Admin panel"
        }
    }
    render () {
        return (
            <html>
              <head>
                  <title>{this.props.title}</title>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bulma/0.1.0/css/bulma.min.css"/>
              </head>
              <body>
              <div className="columns is-mobile has-text-centered">
                <div className="column is-half is-offset-one-quarter has-text-centered">
                    <span className="is-text-centered navItem"><a className="button is-normal" href="/db" rel="nofollow">db</a></span>
                    <span className="is-text-centered navItem"><a className="button is-normal" href="/#" rel="nofollow">Next</a></span>
                </div>
              </div>
                    <div>
                        {this.props.children}
                    </div>
                </body>
            </html>
        )
    }
}

module.exports = Navigation
