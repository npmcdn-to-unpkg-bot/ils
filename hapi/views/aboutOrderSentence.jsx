"use strict"
import {React} from "../../_inc/commonReact.js"
let Component = React.Component
var DefaultLayout = require("./base/basic.jsx")
class App extends Component {
    render() {
        return (
            <div className="columns">
                 <div className="column is-10 is-offset-1">
                      <div className="content">
                          <p></p>
                          <h1>Order Sentence</h1>
                          <h2>Privacy Policy</h2>
                          <p>
                              The application doesn't store your actions and it is clean in this regards. No specific or unknown privacy policy apply. I write this just because it is obligatory for Google Play publishers, but personaly I see no use of that.
                          </p>
                          <h2>Datenschutzerklärung</h2>
                          <p>Die Anwendung speichert nicht Ihre Aktionen und es ist sauber in dieser Hinsicht. Keine besondere oder unbekannten Datenschutzbestimmungen gelten. Ich schreibe dies nur, weil es Pflicht ist für Google Play Publishers, aber ich persönlich sehe keinen Gebrauch.</p>
                     </div>
                      </div>
                  </div>
        )
    }
}
let WillExport = React.createClass({
    render: function() {
        return <DefaultLayout><App /></DefaultLayout>
    }
})
module.exports = WillExport
