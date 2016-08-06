"use strict"
import React, { Component } from "react"
import config from "../../../hapi/_inc/config"
class App extends Component {
    constructor (props) {
        super(props)
    }
    static get defaultProps () {
        return {
            keyword: ""
        }
    }
    render () {
        return (
            <html>
              <head>
                  <title>{this.props.keyword}</title>
                  <link rel="stylesheet" href={config.fontAwesome}/>
                  <link rel="stylesheet" href={config.bulma}/>
                  <link rel="stylesheet" href="css/admin.css"/>
                  <link rel="stylesheet" href={config.reactSelect}/>
                  <link rel="stylesheet" async href={config.animate}/>
              </head>
              <body>
                    <div>
                    a
                        {this.props.children}
                    </div>
                    <div id="reactHook"></div>
                    <script src={config.screenLog}></script>
                    <script src={`${this.props.keyword}Front.js`} ></script>
                </body>
            </html>
        )
    }
}
module.exports = App
