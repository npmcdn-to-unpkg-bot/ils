"use strict"
import {React} from "../../_inc/commonReact.js"
let Component = React.Component
const DefaultLayout = require("./base/basic.jsx")
class IndexContainer extends Component {
    render() {
        return (
            <div className="columns">
                 <div className="column is-10 is-offset-1">
                      <div className="content">
                          <p></p>
                          <h1><a href="/login/twitter">Log In with Twitter</a></h1>
                      </div>
                  </div>
            </div>
        )
    }
}

let App = React.createClass({
    render: function() {
        return <DefaultLayout><IndexContainer /></DefaultLayout>
    }
})

module.exports = App
