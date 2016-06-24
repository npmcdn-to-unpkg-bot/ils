import React,{ Component } from"react"

class Exported extends Component {
    constructor (props) {
        super(props)
    }
    static get defaultProps () {
        return{
            keyword: "empty",
            heightIs: "200",
            widthIs: "2"
        }
    }
    render () {
        let logoStyle = {
            height: "53px"
        }
        return(
            <html>
              <head>
                  <title>{this.props.title}</title>
                  <link rel="stylesheet" href="bulma.css"/>
                  <link rel="stylesheet" href={`${this.props.keyword}`.css} />
              </head>
              <body>
                 <div className="bigContainer">
                     <div className="columns is-mobile has-text-centered">
                       <div className="column is-half is-offset-one-quarter has-text-centered">
                           <span className="is-text-centered navItem"><a className="button is-normal" href="/" rel="nofollow">Home</a></span>
                           <span className="is-text-centered navItem"><a className="button is-normal" href="/#" rel="nofollow">Blog</a></span>
                           <span className="is-text-centered navItem">
                                   <img src="logo.jpg" alt="logo" style={logoStyle} />
                           </span>
                           <span className="is-text-centered navItem"><a className="button is-normal" href="/about" rel="nofollow">About</a></span>
                           <span className="is-text-centered navItem"><a className="button is-normal" href="/#" rel="nofollow">Instructions</a></span>
                       </div>
                     </div>
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
