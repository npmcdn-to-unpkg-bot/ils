import { replace } from "ramda"
import React, { Component } from "react"
import Navigation from "./components/navigation.jsx"

class Exported extends Component {
    constructor (props) {
        super(props)
    }
    static get defaultProps () {
        return {
            keyword: "empty"
        }
    }
    render () {
        let address = replace("Front", "", this.props.keyword)
        return (
            <html>
              <head>
                  <title>{this.props.title}</title>
                  <link rel="stylesheet" href="bulma.css"/>
                  <link rel="stylesheet" href={`${this.props.keyword}.css`} />
                  <link rel="canonical" href={`http://ilearnsmarter.com/${address}`} />
              </head>
              <body>
                 <div className="bigContainer">
                     <Navigation />
                     {this.props.children}
                     <div id="reactHook"></div>
                </div>
                    <script src={`${this.props.keyword}.js`} ></script>
                </body>
            </html>
        )
    }
}
module.exports = Exported
