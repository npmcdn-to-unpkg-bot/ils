"use strict"
import {React} from "../../_inc/commonReact.js"
let Component = React.Component
import ReactMarkdown from "react-markdown"
const DefaultLayout = require("./base/blog.jsx")
class App extends Component {
    render() {
        return (
            <DefaultLayout title={this.props.title}>
                <div className="columns is-mobile">
                    <div className="column is-12-mobile is-10 is-offset-1">
                        <h1 className="title">{this.props.title}</h1>
                        <div className="blog">
                            <ReactMarkdown source={this.props.content} />
                        </div>
                    </div>
                </div>
            </DefaultLayout>
        )
    }
}

module.exports = App
