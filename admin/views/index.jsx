"use strict"
import React ,{ Component }from"react"
var DefaultLayout = require("./default.jsx")

class IndexContainer extends Component {
    render () {
        return(
            <div>
                <p>SomeStaticContent</p>
            </div>
        )
      }
}

let Exported = React.createClass({
  render: function () {
    return<DefaultLayout keyword="learningMeme"></DefaultLayout>
  }
})

module.exports = Exported
