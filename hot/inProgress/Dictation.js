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
            inputValue: "",
            autofocus: true,
            text: `Kritik aus Berlin an Drohung der Türkei :
Führende CDU-Politiker haben die Drohung der Türkei, das Flüchtlingsabkommen mit der EU platzen zu lassen, wenn diese kein Datum für die Einführung der Visafreiheit zusagt, als Erpressung zurückgewiesen. So hätten Staaten nicht miteinander umzugehen, sagte CDU-Vize Thomas Strobl der "Rheinischen Post". Der Vorsitzende des Europa-Ausschusses im Bundestag, Gunther Krichbaum, erklärte, mit derlei Drohungen setze die Türkei weitaus mehr aufs Spiel als ein Flüchtlingsabkommen. Bundesaußenminister Frank-Walter Steinmeier (SPD) sagte ebenfalls in der "Rheinischen Post",`
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
        this.handleInput = this.handleInput.bind(this)
        this.handleRepeat = this.handleRepeat.bind(this)
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
                this.refs.inputField.focus()
                this.setState({playing,loopCounter,startMarker,endMarker})
        })
    }
    handleInput(event){
        if (event.key === "Enter") {
            J.emitter.emit("next")
        }
        this.setState({
            inputValue: event.target.value
        })
    }
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
    handleRepeat(){
        if(this.state.loopCounter===0){
            this.setState({playing:true, loopCounter:1},()=>{
                this.refs.inputField.focus()
            })
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
            <a className="button is-warning is-inverted" onClick={this.handleRepeat} >repeat</a>
            <input key="only" ref="inputField" type="text" value={this.state.inputValue} autoFocus={true} onChange={this.handleInput} onKeyPress={this.handleInput}/>
        </div>
        <div className="box has-text-centered">
            <ReactPlayer ref='player' onDuration={this.handleDuration} onProgress={this.handleProgress} height={0} width={0} progressFrequency={500} url={this.state.url} playing={this.state.playing} />
        </div>
        <div className="box has-text-centered">
        </div>
	</div>
    )}
}
