import {React} from "../../../_inc/commonReact.js"
let Component = React.Component
import Navigation from "../components/navigation.jsx"
import config from "../../../_inc/config.js"
class Exported extends Component {
    constructor(props) {
        super(props)
    }
    static get defaultProps() {
        return {
            keyword: "",
            title: "I Learn Smarter | Free Educational Applications",
            description: "i learn smarter content"
        }
    }
    render() {
        return (<html>
              <head>
                    <title>{this.props.title}</title>
                    <meta httpEquiv="Content-Type" content="text/html"/>
                    <meta charSet="utf-8"/>
                    <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
                    <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no"/>
                    <meta httpEquiv="x-dns-prefetch-control" content="on"/>
                    <link href="images/logo.jpg" rel="preload"/>
                    <link href={config.bulma} rel="subresource"/>
                    <meta name="description" content={this.props.description}/>
                    <meta name="copyright" content="&copy; Copyright (c) Dejan Toteff - ilearnsmarter.com" />
                    <meta name="robots" content="index,follow" />
                    <link href="images/favicon.ico" type="image/x-icon" rel="shortcut icon"/>
                    <link href={config.bulma} rel="stylesheet" />
                    <link href={`http://ilearnsmarter.com/${this.props.keyword}`} rel="canonical"/>
                    <meta property="og:locale" content="en_US" />
                    <meta property="og:type" content="article" />
                    <meta property="og:title" content={this.props.title} />
                    <meta property="og:description" content={this.props.description} />
                    <meta property="og:url" content={`http://ilearnsmarter.com/${this.props.keyword}`} />
                    <meta property="og:site_name" content="I learn smarter - educational apps" />
                    <meta property="article:section" content="Education" />
                    <meta name="twitter:card" content="summary" />
                    <meta name="twitter:url" content={`http://ilearnsmarter.com/${this.props.keyword}`} />
                    <meta name="twitter:description" content={this.props.description} />
                    <meta name="twitter:title" content={this.props.title} />
                    <meta name="twitter:site" content="@self_refactor" />
                    <meta name="twitter:creator" content="@self_refactor" />
                    <meta name="twitter:image" content="images/logo.jpg"/>
                    <meta name="google" value="notranslate"/>
              </head>
              <body>
                 <div>
                     <Navigation />
                     {this.props.children}
                     <div id="reactHook"></div>
                </div>
                    <script src="analitycs.js"></script>
                </body>
            </html>
        )}
}
module.exports = Exported
