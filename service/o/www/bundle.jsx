var React = require('react');
var ReactDOM = require('react-dom')
let Component = React.Component
var ons = require('onsenui');
var Ons = require('react-onsenui')
class App extends Component {
    render() {
        return (
                <div className="columns is-mobile">
                    <div className="column is-12-mobile is-10 is-offset-1">
                        more
                    </div>
                </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById("reactContainer"))
