"use strict"
import React, { Component } from "react"
import R from "ramda"
import J from "./components/commonReact.js"
import ReactPlayer from 'react-player'
import { Router, Route, Link, browserHistory } from 'react-router'
screenLog.init()
let initOnce = R.once(()=>{
    J.emitter.emit("init")
})
//console.trace()
//console.table([{a,b},{a,b}])
//console.profile("marker")
//console.profileEnd("marker")
let obj
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            startMarker: 0,
            endMarker: 0,
            duration: 0,
            stepDuration: 0,
            bufferDuration: 0,
            loopCounter: 1,
            playing: false,
            url: "https://soundcloud.com/dw-learngerman/02082016-langsam-gesprochene-nachrichten-c1c2",
        //    url: "https://soundcloud.com/david-thamm-1/james-brown-mind-power",
            flag: true
        }
        this.handleProgress = this.handleProgress.bind(this)
        this.handleReady = this.handleReady.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.handleDuration = this.handleDuration.bind(this)
    }
    static get defaultProps () {
        return {
            "message": "dummy"
        }
    }
    componentDidMount() {
        J.emitter.on("next", ()=>{
            let playing = true
            let loopCounter = 1
            let startMarker = this.state.startMarker+this.state.stepDuration-this.state.bufferDuration
            let endMarker = startMarker + this.state.stepDuration
            this.refs.player.seekTo(startMarker)
            this.setState({playing,loopCounter,startMarker,endMarker})
        })
    }
    handleInput(event){}
    handleReady (event) {
        this.setState({playing: true})
    }
    handleNext(){
        J.emitter.emit("next")
    }
    handleProgress(progress){
        if(this.state.playing){
            if(progress.played>this.state.endMarker){
                if(this.state.loopCounter!==0){
                    let loopCounter = this.state.loopCounter-1
                    this.setState({loopCounter},()=>{
                        this.refs.player.seekTo(this.state.startMarker)
                    })
                }else{
                    this.setState({playing: false})
                }
            }
        }
    }
    handleDuration(duration){
        if(this.state.flag){
            this.setState({flag:false, duration},()=>{
                let skipDuration = 15
                let stepDurationValue = 7
                let bufferDurationValue = 2
                let seekMarker = parseFloat(skipDuration/duration)
                let stepDuration = parseFloat(stepDurationValue/duration)
                let bufferDuration = parseFloat(bufferDurationValue/duration)
                this.refs.player.seekTo(seekMarker)
                this.setState({
                    duration,
                    stepDuration,
                    bufferDuration,
                    startMarker:seekMarker,
                    endMarker: seekMarker+stepDuration
                })
            })
        }
    }
    render () {
        return (
    <div>
        <div className="box">
            <a className="button is-warning is-inverted" onClick={this.handleReady} >ready</a>
            <a className="button is-warning is-inverted" onClick={this.handleNext} >next</a>
            <input type="text" onChange={this.handleInput} autoFocus={this.state.autofocus}/>
        </div>
        <div className="box has-text-centered">
            <ReactPlayer ref='player' onDuration={this.handleDuration} onProgress={this.handleProgress} height={0} width={0} progressFrequency={500} url={this.state.url} playing={this.state.playing} />
        </div>
        <div className="box has-text-centered">
        </div>
	</div>
    )}
}
