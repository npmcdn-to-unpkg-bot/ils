"use strict"
import React ,{ Component }from"react"

class Navigation extends Component {
    constructor (props) {
            super(props)
    }
    static get defaultProps () {
            return{
                keyword: "empty" ,
                heightIs: "200" ,
                widthIs: "2"
            }
    }
    render () {
        let outerStyle = {
            height: "53px"
        }
        return(
            <html>
              <head>
                  <title>{this.props.title}</title>
                  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css"/>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/magic/1.1.0/magic.min.css"/>
                  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/animate.css/3.5.1/animate.min.css"/>
                  <link rel="stylesheet" href="bulma.css"/>
              </head>
              <body>
                    <div>
                        {this.props.children}
                    </div>
                    <div id="reactContainer"></div>
                    <div id="hook"></div>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.6/socket.io.min.js"></script>
                    <script src="//localhost:3100/socket.io/socket.io.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/immutable/3.8.1/immutable.min.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/then-request/2.2.0/request.js"></script>
                    <script src="https://cdnjs.cloudflare.com/ajax/libs/pubsub-js/1.5.3/pubsub.min.js"></script>
                    <script src={`${this.props.keyword}.js`} ></script>
                </body>
            </html>
        )
      }
}

module.exports = Navigation
