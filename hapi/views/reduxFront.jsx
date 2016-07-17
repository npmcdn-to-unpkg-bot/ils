"use strict"
import React,{ Component } from "react"
import ReactDOM from "react-dom"
import * as R from"ramda"
import * as J from "/home/just/ils/hot/src/components/commonReact.js"
class Only extends Component {
    constructor (props) {
        super(props)
        this.state = {
            flagReady: false,
            index: 0,
            globalIndex: 0
        }
        //this.willHandleClick = this.willHandleClick.bind(this)
    }
    render () {
        return(
    <div className="onlyContainer">
        <div className="columns box">
            <div className="column is-10 is-offset-1 has-text-centered" >
            more
            </div>
        </div>
	</div>
    )}
}
ReactDOM.render(<Only />,document.getElementById("reactHook"))
