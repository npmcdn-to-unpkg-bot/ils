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
            description: "i learn smarter content"
        }
    }
    render() {
        let address = replace("Front", "", this.props.keyword)
        return (<html>
              <head>
                    <title>{this.props.title}</title>
                    <meta http-equiv="X-UA-Compatible" content="IE=edge">
	                <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
	                <meta charset="utf-8">
	                <meta name="viewport" content="width=device-width">
	                <meta name="description" content={this.props.description}>
	                <meta name="author" content="Dejan Toteff">
	                <meta name="copyright" content="&copy; Copyright (c) Dejan Toteff - ilearnsmarter.com" />
	                <meta name="robots" content="index,follow" />
                    <meta http-equiv="content-language" content="en">
                    <meta name="language" content="en">
                    <meta name="page-topic" content="Education" />
                    <link rel="shortcut icon" href="http://ilearnsmarter.com/favicon.ico" />
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
                    <script>
                      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
                      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
                      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
                      })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
                      ga('create', 'UA-67732005-1', 'auto');
                      ga('send', 'pageview');
                    </script>
                </body>
            </html>)
    }
}
module.exports = Exported
