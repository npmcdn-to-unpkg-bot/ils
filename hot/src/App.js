"use strict"
import React,{ Component } from "react"
import R from "ramda"
import LazyLoad from 'react-lazyload'
import J from "./components/commonReact.js"
import words from "./components/words.js"
let store = {words: []}
function nextWord(){
    let willReturn
    let flag = true
    J.shuffle(words).map(val=>{
        if(flag&&val.indexOf(store.words)!==-1){
            willReturn = val
            flag = false
            store.words.push(val)
        }
    })
    return willReturn
}
let initOnce = R.once(()=>{
    J.emitter.emit("init")
})
let initData = {
    deEn: {
        dePart:"",
        enPart: ""
    },
    phrase: [],
    phraseTranslated: [],
    synonym: [],
    synonymTranslated: []
}
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: initData,
            willSend: {}
        }
        this.handleAnswerInput = this.handleAnswerInput.bind(this)
    }
    componentDidMount(){
        J.emitter.on("init", ()=>{
            J.log(`${J.host}/readDataFile/${nextWord()}`)
            J.getData(`${J.host}/readDataFile/${nextWord()}`).then(data=>{
                this.setState({data})
            })
        })
        initOnce()
    }
    handleAnswerInput (event) {
        if(event.key==="Enter"){
            if(this.state.buttonText === J.buttonTextNext){
                J.emitter.emit("next")
            }else{
                J.emitter.emit("check answer")
            }
        }
        this.setState({
            answer: event.target.value
        },()=>{
            if(this.state.answer.length>this.state.inputFieldSize){
                this.setState({inputFieldSize:this.state.answer.length})
            }
        })
    }
    render () {
        return(
    <div>
        <div className="box has-text-centered columns">
            <div id="animationMarker" className="column is-4 is-offset-4">
            <input autoFocus className="" type="text" value={this.state.answer} size={this.state.inputFieldSize} onChange={this.handleAnswerInput} onKeyPress={this.handleAnswerInput}/>
            </div>
            <div className="column is-4">
                <a className={this.state.buttonClassName} onClick={this.handleButtonClick}>{this.state.buttonText}</a>
            </div>
        </div>
        <div className="box has-text-centered is-fullwidth">
        </div>
	</div>
    )}
}
