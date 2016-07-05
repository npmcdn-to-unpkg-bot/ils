import {replace} from "ramda"
import React, {Component} from "react"
import Navigation from "./components/navigation.jsx"

class Exported extends Component {
    constructor(props) {
        super(props)
    }
    static get defaultProps() {
        return {
            keyword: "empty",
            title: "i learn smarter applications",
            description: "i learn smarter content"
        }
    }
    render() {
        let address = replace("Front", "", this.props.keyword)
        return (<html>
              <head>
                    <title>{this.props.title}</title>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta httpEquiv="Content-Type" content="text/html"/>
                    <meta httpEquiv="content-language" content="en"/>
                    <meta charSet="utf-8"/>
                    <meta name="viewport" content="width=device-width"/>
                    <meta name="description" content={this.props.description}/>
                    <meta name="author" content="Dejan Toteff"/>
                    <meta name="copyright" content="&copy; Copyright (c) Dejan Toteff - ilearnsmarter.com" />
                    <meta name="robots" content="index,follow" />
                    <meta name="language" content="en"/>
                    <meta name="page-topic" content="Education" />
                    <link rel="shortcut icon" href="http://ilearnsmarter.com/favicon.ico" />
                    <link rel="stylesheet" href="bulma.css"/>
                    <link rel="stylesheet" href={`${this.props.keyword}.css`} />
                    <link rel="canonical" href={`http://ilearnsmarter.com/${address}`} />
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="article" />
                    <meta property="og:title" content={this.props.title} />
                    <meta property="og:description" content={this.props.description} />
                    <meta property="og:url" content={`http://ilearnsmarter.com/${address}`} />
                    <meta property="og:site_name" content="I learn smarter - educational apps" />
                    <meta property="article:section" content="Education" />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:description" content={this.props.description} />
                    <meta name="twitter:title" content={this.props.title} />
                    <meta name="twitter:site" content="@self_refactor" />
                    <meta name="twitter:creator" content="@self_refactor" />
              </head>
              <body>
                 <div className="bigContainer">
                     <Navigation />
                     {this.props.children}
                     <div id="reactHook"></div>
                </div>
                    <script src={`${this.props.keyword}.js`} ></script>
                    <script src="analitycs.js" ></script>
                </body>
            </html>)
    }
}
module.exports = Exported
