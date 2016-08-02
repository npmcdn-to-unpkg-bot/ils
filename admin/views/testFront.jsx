"use strict"
import React, {Component} from "react"
import ReactDOM from "react-dom"
import R from "ramda"
import ReactPlayer from 'react-player'
import { Router, Route, Link, browserHistory } from 'react-router'

class Only extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0
        }
        this.handleClick = this.handleClick.bind(this)
    }
    static get defaultProps () {
        return {
            "message": "dummy"
        }
    }
    componentDidMount() {
        J.emitter.on("init", ()=>{
        })
    }
    handleClick (event) {

    }
    render () {
        return (
    <div>
        <div className="box">
        </div>
        <div className="box has-text-centered">
            <ReactPlayer url='https://www.youtube.com/watch?v=ysz5S6PUM-U' />
        </div>
        <div className="box has-text-centered">
        </div>
	</div>
    )}
}
class App extends Component {
    render () {
        return (
        <Router history={browserHistory}>
        <Route path="/" component={Only}>
          <Route path="about" component={Only}/>
          <Route path="*" component={Only}/>
        </Route>
      </Router>
    )}
}

ReactDOM.render(<App />, document.getElementById("reactHook"))
