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
                  <link rel="stylesheet" href="//localhost:3000/bulma.css"/>
                  <link rel="stylesheet" href="//localhost:3000/only.css"/>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/react-select/0.9.1/react-select.min.css"/>
                  <link rel="stylesheet" async href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.1/animate.min.css"/>
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
