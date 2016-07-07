"use strict"
import React,{ Component } from "react"
import ReactDOM from "react-dom"
import R from "ramda"
import reqwest from "reqwest"
import FlipMove from "react-flip-move"
import {observable} from "mobx"
import {observer} from "mobx-react"
import J from "./components/commonReact.js"

let initOnce = R.once(()=>{
    J.emitter.emit("init")
})

let currentId
@observer
class App extends Component {
    @observable posts = []
    constructor (props) {
        super(props)
        this.state = {
            index: 0
        }
        //this.willHandleClick = this.willHandleClick.bind(this)
        //this.willHandleButton = this.willHandleButton.bind(this)
    }
    componentDidMount() {

    }
    render () {
        return(
    <div>
        <div className="box">
             mo
        </div>
	</div>
    )}
}

ReactDOM.render(<App />,document.getElementById("reactHook"))
