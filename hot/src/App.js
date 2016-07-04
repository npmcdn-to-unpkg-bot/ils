"use strict"
import React,{ Component } from "react"
import R from "ramda"
//import FlipMove from "react-flip-move"

import J from "../commonReact.js"

let initOnce = R.once(()=>{
    J.emitter.emit("init")
})


export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0
        }
        this.willHandleClick = this.willHandleClick.bind(this)
        //this.willHandleButton = this.willHandleButton.bind(this)
    }
    componentDidMount() {
        J.emitter.on("init",()=>{
        })
        J.emitter.on("correct",()=>{
        })
        J.emitter.on("wrong",()=>{
        })
        J.emitter.on("last word",()=>{
        })
        J.emitter.on("show answer",()=>{
        })
        J.emitter.on("next",()=>{
        })

    }
    willHandleClick (event) {
        if(this.state.flagReady){
            return null
        }
        currentId = event.currentTarget.id
        if(currentId===this.state.referenceArr[this.state.index]){
            if(this.state.index+1===this.state.referenceArr.length){
                J.emitter.emit("last word")
            }else{
                J.emitter.emit("correct")
            }
        }else{
            J.emitter.emit("wrong")
        }

    }
    willHandleButton () {
        if(this.state.buttonText === "Show Answer") {
            J.emitter.emit("show answer")
        } else if(this.state.buttonText === "Next") {
            J.emitter.emit("next")
        }
    }
    render () {
        return(
    <div>
        <div className="box">
             <div style={this.state.memeStyleContainer} >
                <div className="meme has-text-centered">
                    {this.state.data.enPart}
                </div>
            </div>
                <div className="has-text-centered paddingLR">
                    <a style={this.state.buttonStyle} className={`${this.state.buttonClassName} buttonStyle`} onClick={this.willHandleButton}>{this.state.buttonText}</a>
                </div>
        </div>
        <div className="box has-text-centered">
            <FlipMove easing="ease-out" duration="300" >
                {
                    this.state.visibleArr.map((val)=>{
                    return <div key={`${val.name}-key`} style={val.customStyle} className="column singleWord" id={val.name} onClick={this.willHandleClick}>{val.name}</div>
                })
            }
            </FlipMove>
        </div>
        <div className="box has-text-centered">
            <FlipMove easing="ease-in" duration="700" >
                {
                    this.state.hiddenArr.map((val)=>{
                    return <div key={`${val.name}-key`} style={val.customStyle} className="column singleWordCorrect">{val.name}</div>
                })
            }
            </FlipMove>
        </div>
	</div>
    )}
}
