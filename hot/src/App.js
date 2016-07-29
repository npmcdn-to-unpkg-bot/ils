"use strict"
import React,{ Component } from "react"
import R from "ramda"
import J from "./components/commonReact.js"
import Select from "react-select"
import words from "./components/words.js"

let wordsArr = []
const sourceWords = J.shuffle(words)
function nextWord(){
    let willReturn
    let flag = true
    sourceWords.map(val=>{
        if(flag&&R.indexOf(val, wordsArr)===-1){
            willReturn = val
            flag = false
            wordsArr.push(val)
        }
    })
    return willReturn
}
function uniq(arr,prop){
    let willReturn = []
    return R.compose(R.sort((a,b)=>b.dePart.length-a.dePart.length),R.filter(val=>{
        if(R.indexOf(val[prop], willReturn)===-1&&val[prop].length>2){
            willReturn.push(val[prop])
            return true
        }else{return false}
    }),R.map(val=>{
        return R.merge(val,{dePart: R.replace(/[0-9]/g,"",val.dePart)})
    }))(arr)
}
let initOnce = R.once(()=>{
    J.emitter.emit("init")
})


export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            audioContext: null,
            source: null,
            files: [],
            song: "OutOfSight",
            tunaChorus:{
                frequency: 447, //20 to 22050
                Q:1, //0.001 to 100
                gain: 10, //-40 to 40
                filterType: "lowpass", //highpass, bandpass, lowshelf, highshelf, peaking, notch, allpass
                bypass: 0
            },
            tunaChorusFlag:false,
            tunaDelay:{
                feedback: 0.1,
                delayTime: 7, //this will create a short "slap back" delay
                wetLevel: 0.9,
                dryLevel: 0.6,
                cutoff: 500,
                bypass: true
            },
            tunaDelayFlag: true
        }
        this.handleStart = this.handleStart.bind(this)
        this.handlePlay = this.handlePlay.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }
    componentDidMount(){
        J.emitter.on("once init", ()=>{
            J.getData(`${J.admin}/files`).then(files=>{
            })
        })
        J.emitter.on("init",()=>{
            let AC = "AudioContext" in window ? AudioContext : "webkitAudioContext" in window ? webkitAudioContext : null
            let audioContext = new AC()
            let source = audioContext.createBufferSource()
            let xhr = new XMLHttpRequest()
            xhr.open("GET", `${J.admin}/file/${this.state.song}.mp3`)
            xhr.responseType = "arraybuffer"
            xhr.onload = function(e) {
                audioContext.decodeAudioData(e.target.response, incoming=>{
                    source.buffer = incoming
                })
            }
            xhr.send(null)
            let tuna = new Tuna(audioContext)
            if(this.state.tunaChorusFlag){
                let tunaProp = new tuna.Filter(this.state.tunaChorus)
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            if(this.state.tunaDelayFlag){
                let tunaProp = new tuna.Delay(this.state.tunaDelay)
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            source.start(audioContext.currentTime)
            this.setState({source,audioContext},()=>{
            })
        })
        initOnce()
    }
    handleStart () {
        let tuna = new Tuna(this.state.audioContext)
        let tunaProp = new tuna.Delay({
            feedback: 0.7,
            delayTime: 77, //this will create a short "slap back" delay
            wetLevel: 0.1,
            dryLevel: 0.9,
            cutoff: 700,
            bypass: true
        })
        this.state.source.connect(tunaProp.input)
        tunaProp.connect(this.state.audioContext.destination)
    }
    handleSelect(event){

    }
    handleStop(){
        //this.state.source.stop()
        this.state.audioContext.suspend().then(function() {
        })
    }
    handlePlay(){
        this.state.audioContext.resume().then(function() {
        })
    }
    render () {
        return(
    <div>
        <div className="columns box has-text-centered is-fullwidth is-gapless is-narrow is-marginless">
            <div className="column is-2">
                <a className="button is-small is-primary is-inverted" onClick={this.handleStart}><span className="icon"><i className="fa fa-step-forward"></i></span></a>
                <a className="button is-primary is-inverted is-small" onClick={this.handleStart}><span className="icon"><i className="fa fa-check"></i></span></a>
                <a className="button is-success is-inverted is-small" onClick={this.handleStop}><span className="icon"><i className="fa fa-chevron-left"></i></span></a>
                <a className="button is-success is-inverted is-small" onClick={this.handlePlay}><span className="icon"><i className="fa fa-chevron-right"></i></span></a>
            </div>
            <div className="column is-2 secondRow">
            </div>
            <div className="column is-6 secondRow">
            </div>
        </div>
        <div className="columns box has-text-centered is-fullwidth is-gapless is-narrow is-marginless">
            <div className="column is-2 is-fullwidth">
            </div>
            <div className="column is-2 is-marginless">
            </div>
            <div className="column is-4 is-marginless">
            </div>
            <div className="column is-4 is-marginless">
            </div>
        </div>
        <div className="columns box has-text-centered is-fullwidth is-gapless is-narrow is-marginless">
            <div className="column is-8 has-text-left">
            </div>
            <div className="column is-2 has-text-left">
            </div>
            <div className="column is-2 has-text-left">
            </div>
        </div>
        <div className="columns box is-fullwidth">
            <div className="column is-2 has-text-left">
            </div>
            <div className="column is-5 has-text-right">
            </div>
            <div className="column is-5 has-text-left">
            </div>
        </div>
	</div>
    )}
}
