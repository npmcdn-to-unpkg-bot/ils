"use strict"
import React, { Component } from "react"
import R from "ramda"
import Select from "react-select"
import { Notification } from "react-notification"
import J from "./components/commonReact.js"
const Slider = require("rc-slider")
let initOnce = R.once(()=>{
    J.emitter.emit("init")
    //J.emitter.emit("once init")
})
let filterArr = ["lowpass", "highpass", "bandpass", "lowshelf", "highshelf", "peaking", "notch", "allpass"]
let bufferSizeArr = [256, 512, 2048, 4096, 8192, 16384]
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            notificationMessage: "",
            notificationState: false,
            audioContext: null,
            song: "Demo Song",
            songs: [],
            selectArr: [{value: "Demo Song", label: "Demo Song"}],
            index: 0,
            flagLoop: false,
            duration: null,
            tunaChorus:{
                feedback: 0.4, //[0,0.95]
                delay: 0.05, //[0,1],
                depth: 0.7, //[0,1]
                rate: 1.5, //[0,8]
                bypass: 1,
                flag: 1
            },
            tunaDelay:{
                feedback: 0.1,
                delayTime: 100,
                wetLevel: 0.5,
                dryLevel: 1,
                cutoff: 100,
                bypass: 1,
                flag: 0
            },
            tunaPhaser: {
                rate: 1.2,                     //0.01 to 8 is a decent range, but higher values are possible
                depth: 0.3,                    //0 to 1
                feedback: 0.2,                 //0 to 1+
                stereoPhase: 30,               //0 to 180
                baseModulationFrequency: 700,  //500 to 1500
                bypass: 1,
                flag: 0
            },
            tunaOverdrive: {
                outputGain: 0.5,         //0 to 1+
                drive: 0.7,              //0 to 1
                curveAmount: 1,          //0 to 1
                algorithmIndex: 0,       //0 to 5, selects one of our drive algorithms
                bypass: 1,
                flag: 0
            },
            tunaCompressor: {
                threshold: 0.5,    //-100 to 0
                makeupGain: 1,     //0 and up
                attack: 1,         //0 to 1000
                release: 0,        //0 to 3000
                ratio: 4,          //1 to 20
                knee: 5,           //0 to 40
                automakeup: 1,  //true/false
                bypass: 1,
                flag: 0
            },
            tunaFilter: {
                frequency: 440, //20 to 22050
                Q: 22, //0.001 to 100
                gain: 0, //-40 to 40
                filterType: 3,
                bypass: 1,
                flag: 1
            },
            tunaTremolo: {
                intensity: 0.3,    //0 to 1
                rate: 4,         //0.001 to 8
                stereoPhase: 0,    //0 to 180
                bypass: 1,
                flag: 0
            },
            tunaWahWah: {
                automode: 1,                //true/false
                baseFrequency: 0.5,            //0 to 1
                excursionOctaves: 2,           //1 to 6
                sweep: 0.2,                    //0 to 1
                resonance: 10,                 //1 to 100
                sensitivity: 0.5,              //-1 to 1
                bypass: 1,
                flag: 0
            },
            tunaBitcrusher: {
                bits: 4,          //1 to 16
                normfreq: 0.1,    //0 to 1
                bufferSize: 3,  //256 to 16384
                flag: 0
            },
            tunaMoogFilter: {
                cutoff: 0.065,    //0 to 1
                resonance: 3.5,   //0 to 4
                bufferSize: 3,  //256 to 16384
                flag: 0
            },
            tunaPingPongDelay: {
                wetLevel: 0.5, //0 to 1
                feedback: 0.3, //0 to 1
                delayTimeLeft: 150, //1 to 10000 (milliseconds)
                delayTimeRight: 200, //1 to 10000 (milliseconds)
                flag: 0
            }
        }
        this.handleChange = this.handleChange.bind(this)
        this.handleStart = this.handleStart.bind(this)
        this.handlePlay = this.handlePlay.bind(this)
        this.handleStop = this.handleStop.bind(this)
        this.handleNext = this.handleNext.bind(this)
        this.handleSelect = this.handleSelect.bind(this)
    }
    log(msg, seconds = 5) {
        let message = R.type(msg) === "String" ? msg : JSON.stringify(msg)
        this.setState({
            notificationMessage: "",
            notificationState: false
        }, ()=>{
            this.setState({
                notificationMessage: message,
                notificationState: true
            })
        })
        setTimeout(()=>{
            this.setState({
                notificationState: false
            })
        }, seconds * 1000)
    }
    componentDidMount() {
        J.emitter.on("once init", ()=>{
            J.getData(`${J.admin}/files`).then(files=>{
                let filterFn = R.compose(R.replace(".mp3", ""), R.last, R.split("/"))
                let songs = J.shuffle(R.map(filterFn, files))
                let selectArr = R.map(val=>{
                    return {value: val, label: R.take(22, val)}
                })(songs)
                let song = songs[ this.state.index ]
                this.setState({song, songs, selectArr}, ()=>{
                    J.emitter.emit("init")
                })
            })
        })
        J.emitter.on("init", ()=>{
            let flagLoop = true
            let duration
            const AC = "AudioContext" in window ? AudioContext : "webkitAudioContext" in window ? webkitAudioContext : null
            let audioContext = new AC()
            let source = audioContext.createBufferSource()
            let xhr = new XMLHttpRequest()
            xhr.open("GET", "http://www.oskareriksson.se/shed/assets/gitarrkompet.mp3")
            xhr.responseType = "arraybuffer"
            let self = this
            xhr.onload = function(e) {
                audioContext.decodeAudioData(e.target.response, incoming=>{
                    duration = incoming.duration
                    source.buffer = incoming
                    self.setState({flagLoop, duration})
                })
            }
            xhr.send(null)
            let tuna = new Tuna(audioContext)
            if (this.state.tunaChorus.flag) {
                J.log("Chorus")
                let tunaProp = new tuna.Chorus(this.state.tunaChorus)
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            if (this.state.tunaDelay.flag) {
                J.log("Delay")
                let tunaProp = new tuna.Delay(this.state.tunaDelay)
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            if (this.state.tunaPhaser.flag) {
                J.log("Phaser")
                let tunaProp = new tuna.Phaser(this.state.tunaPhaser)
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            if (this.state.tunaOverdrive.flag) {
                J.log("Overdrive")
                let tunaProp = new tuna.Overdrive(this.state.tunaOverdrive)
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            if (this.state.tunaCompressor.flag) {
                J.log("Compressor")
                let automakeup = this.state.tunaCompressor === 1 ? true : false
                let tunaProp = new tuna.Compressor(R.merge(this.state.tunaCompressor, {automakeup}))
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            if (this.state.tunaFilter.flag) {
                J.log("Filter")
                let filterType = filterArr[ this.state.tunaFilter.filterType ]
                let tunaProp = new tuna.Filter(R.merge(this.state.tunaFilter, {filterType}))
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            if (this.state.tunaTremolo.flag) {
                J.log("tunaTremolo")
                let tunaProp = new tuna.Tremolo(this.state.tunaTremolo)
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            if (this.state.tunaWahWah.flag) {
                J.log("tunaWahWah")
                let automode = this.state.tunaWahWah.automode === 1 ? true : false
                let tunaProp = new tuna.WahWah(R.merge(this.state.tunaWahWah, {automode}))
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            if (this.state.tunaBitcrusher.flag) {
                J.log("tunaBitcrusher")
                let bufferSize = bufferSizeArr[ this.state.tunaBitcrusher.bufferSize ]
                let tunaProp = new tuna.Bitcrusher(R.merge(this.state.tunaBitcrusher, {bufferSize}))
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            if (this.state.tunaMoogFilter.flag) {
                J.log("tunaMoogFilter")
                let bufferSize = bufferSizeArr[ this.state.tunaMoogFilter.bufferSize ]
                let tunaProp = new tuna.MoogFilter(R.merge(this.state.tunaMoogFilter, {bufferSize}))
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            if (this.state.tunaPingPongDelay.flag) {
                J.log("PingPongDelay")
                let tunaProp = new tuna.PingPongDelay(this.state.tunaPingPongDelay)
                source.connect(tunaProp.input)
                tunaProp.connect(audioContext.destination)
            }
            source.start(audioContext.currentTime)
            this.setState({audioContext})
        })
        J.emitter.on("next", ()=>{
            this.state.audioContext.close().then(()=>{
                let index
                if (this.state.index < this.state.songs.length) {
                    index = this.state.index + 1
                } else {
                    index = 0
                }
                let song = this.state.songs[ index ]
                this.setState({song, index}, ()=>{
                    J.emitter.emit("init")
                })
            })
        })
        J.emitter.on("select", ()=>{
            this.state.audioContext.close().then(()=>{
                let index
                if (this.state.index < this.state.songs.length) {
                    index = this.state.index + 1
                } else {
                    index = 0
                }
                this.setState({index}, ()=>{
                    J.emitter.emit("init")
                })
            })
        })
        initOnce()
        this.log("Change some settings!", 4)
        setTimeout(()=>{this.log("Press CHECK icon to confirm", 3)}, 4200)
        setTimeout(()=>{this.log("Can you feel the difference?", 3)}, 8000)
    }
    handleStart () {
        this.state.audioContext.close().then(()=>{
            J.emitter.emit("init")
        })
    }
    handleNext() {
        J.emitter.emit("next")
    }
    handleStop() {
        this.state.audioContext.suspend().then(function() {
        })
    }
    handlePlay() {
        this.state.audioContext.resume().then(function() {
        })
    }
    handleSelect(event) {
        let song = event.value
        this.setState({song}, ()=>{
            J.emitter.emit("select")
        })
    }
    handleChange(value, effect, prop) {
        let obj = {}
        let propObj = {}
        propObj[ prop ] = value
        obj[ effect ] = R.merge(this.state[ effect ], propObj)
        this.setState(R.merge(this.state, obj))
    }
    render () {
        return (
    <div>
    <Notification isActive={this.state.notificationState} message={this.state.notificationMessage} />
        <div className="tile is-ancestor is-marginless is-fullwidth">
            <div className="tile has-text-centered is-2 is-vertical is-parent">
                <div>
                    <a className="button is-primary is-inverted is-small" onClick={this.handleStart}><span className="icon"><i className="fa fa-check"></i></span></a>
                    <a className="button is-success is-inverted is-small" onClick={this.handleStop}><span className="icon"><i className="fa fa-pause-circle-o t"></i></span></a>
                    <a className="button is-success is-inverted is-small" onClick={this.handlePlay}><span className="icon"><i className="fa fa-play-circle-o"></i></span></a>
                    <a className="button is-success is-inverted is-small" onClick={this.handleNext}><span className="icon"><i className="fa fa-step-forward"></i></span></a>
                </div>
                <hr/>
                <div id="marginlessTuna" className="til is-child box">
                    {this.state.song}
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                <Select name="song" value={this.state.song} options={this.state.selectArr} onChange={this.handleSelect} />
                </div>
            </div>
            <div className="tile is-2 is-vertical is-parent">
                <div id="marginlessTuna" className="has-text-centered">
                    CHORUS
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Feedback
                    <Slider min={0} max={0.95} step={0.05} value={this.state.tunaChorus.feedback} onChange={(val)=>{this.handleChange(val, "tunaChorus", "feedback")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Delay
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaChorus.delay} onChange={(val)=>{this.handleChange(val, "tunaChorus", "delay")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Depth
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaChorus.depth} onChange={(val)=>{this.handleChange(val, "tunaChorus", "depth")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Rate
                    <Slider min={0} max={8} step={0.25} value={this.state.tunaChorus.rate} onChange={(val)=>{this.handleChange(val, "tunaChorus", "rate")}} /></label>
                </div>
                <div id="marginlessTuna"className="tile is-child box">
                    <label>Bypass
                    <Slider min={0} max={1} step={1} value={this.state.tunaChorus.bypass} onChange={(val)=>{this.handleChange(val, "tunaChorus", "bypass")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Enable
                    <Slider min={0} max={1} step={1} value={this.state.tunaChorus.flag} onChange={(val)=>{this.handleChange(val, "tunaChorus", "flag")}} /></label>
                </div>
            </div>
            <div className="tile is-2 is-vertical is-parent">
                <div id="marginlessTuna" className="has-text-centered">
                    DELAY
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Delay Time
                    <Slider min={20} max={1000} step={20} value={this.state.tunaDelay.delayTime} onChange={(val)=>{this.handleChange(val, "tunaDelay", "delayTime")}} /></label>
                </div>
                <div id="marginlessTuna"className="tile is-child box">
                    <label>Feedback
                    <Slider min={0} max={0.9} step={0.05} value={this.state.tunaDelay.feedback} onChange={(val)=>{this.handleChange(val, "tunaDelay", "feedback")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Cutoff
                    <Slider min={50} max={20000} step={50} value={this.state.tunaDelay.cutoff} onChange={(val)=>{this.handleChange(val, "tunaDelay", "cutoff")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Wetlevel
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaDelay.wetLevel} onChange={(val)=>{this.handleChange(val, "tunaDelay", "wetLevel")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Dry Level
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaDelay.dryLevel} onChange={(val)=>{this.handleChange(val, "tunaDelay", "dryLevel")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Enable
                    <Slider min={0} max={1} step={1} value={this.state.tunaDelay.flag} onChange={(val)=>{this.handleChange(val, "tunaDelay", "flag")}} /></label>
                </div>
            </div>
            <div className="tile is-2 is-vertical is-parent">
                <div id="marginlessTuna" className="has-text-centered">
                    PHASER
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Rate
                    <Slider min={0} max={8} step={0.1} value={this.state.tunaPhaser.rate} onChange={(val)=>{this.handleChange(val, "tunaPhaser", "rate")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Depth
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaPhaser.depth} onChange={(val)=>{this.handleChange(val, "tunaPhaser", "depth")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Feedback
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaPhaser.feedback} onChange={(val)=>{this.handleChange(val, "tunaPhaser", "feedback")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Stereo Phase
                    <Slider min={0} max={180} step={10} value={this.state.tunaPhaser.stereoPhase} onChange={(val)=>{this.handleChange(val, "tunaPhaser", "stereoPhase")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Base Modulation Frequency
                    <Slider min={500} max={1500} step={100} value={this.state.tunaPhaser.baseModulationFrequency} onChange={(val)=>{this.handleChange(val, "tunaPhaser", "baseModulationFrequency")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Enable
                    <Slider min={0} max={1} step={1} value={this.state.tunaPhaser.flag} onChange={(val)=>{this.handleChange(val, "tunaPhaser", "flag")}} /></label>
                </div>
            </div>
            <div className="tile is-2 is-vertical is-parent">
                <div id="marginlessTuna" className="has-text-centered">
                    OVERDRIVE
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Drive
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaOverdrive.drive} onChange={(val)=>{this.handleChange(val, "tunaOverdrive", "drive")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Output Gain
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaOverdrive.outputGain} onChange={(val)=>{this.handleChange(val, "tunaOverdrive", "outputGain")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Curve Amount
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaOverdrive.curveAmount} onChange={(val)=>{this.handleChange(val, "tunaOverdrive", "curveAmount")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Algorithm Index
                    <Slider min={0} max={5} step={1} value={this.state.tunaOverdrive.algorithmIndex} onChange={(val)=>{this.handleChange(val, "tunaOverdrive", "algorithmIndex")}} /></label>
                </div>
                <div id="marginlessTuna"className="tile is-child box">
                    <label>Bypass
                    <Slider min={0} max={1} step={1} value={this.state.tunaOverdrive.bypass} onChange={(val)=>{this.handleChange(val, "tunaOverdrive", "bypass")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Enable
                    <Slider min={0} max={1} step={1} value={this.state.tunaOverdrive.flag} onChange={(val)=>{this.handleChange(val, "tunaOverdrive", "flag")}} /></label>
                </div>
            </div>
            <div className="tile is-2 is-vertical is-parent">
                <div id="marginlessTuna" className="has-text-centered">
                    COMPRESSOR
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Threshold
                    <Slider min={-60} max={0} step={5} value={this.state.tunaCompressor.threshold} onChange={(val)=>{this.handleChange(val, "tunaCompressor", "threshold")}} /></label>
                </div>
                <div id="marginlessTuna"className="tile is-child box">
                    <label>Release
                    <Slider min={50} max={2000} step={50} value={this.state.tunaCompressor.release} onChange={(val)=>{this.handleChange(val, "tunaCompressor", "release")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Makeup Gain
                    <Slider min={1} max={100} step={1} value={this.state.tunaCompressor.makeupGain} onChange={(val)=>{this.handleChange(val, "tunaCompressor", "makeupGain")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Attack
                    <Slider min={0} max={1000} step={20} value={this.state.tunaCompressor.attack} onChange={(val)=>{this.handleChange(val, "tunaCompressor", "attack")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Ratio
                    <Slider min={1} max={50} step={1} value={this.state.tunaCompressor.ratio} onChange={(val)=>{this.handleChange(val, "tunaCompressor", "ratio")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Knee
                    <Slider min={0} max={40} step={1} value={this.state.tunaCompressor.knee} onChange={(val)=>{this.handleChange(val, "tunaCompressor", "knee")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Automakeup
                    <Slider min={0} max={1} step={1} value={this.state.tunaCompressor.automakeup} onChange={(val)=>{this.handleChange(val, "tunaCompressor", "automakeup")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Bypass
                    <Slider min={0} max={1} step={1} value={this.state.tunaCompressor.bypass} onChange={(val)=>{this.handleChange(val, "tunaCompressor", "bypass")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Enable
                    <Slider min={0} max={1} step={1} value={this.state.tunaCompressor.flag} onChange={(val)=>{this.handleChange(val, "tunaCompressor", "flag")}} /></label>
                </div>
            </div>
        </div>
        <div className="tile is-ancestoris-marginless is-fullwidth">
            <div className="tile is-2 is-vertical is-parent">
                <div id="marginlessTuna" className="has-text-centered">
                    FILTER
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Frequency
                    <Slider min={50} max={22050} step={50} value={this.state.tunaFilter.frequency} onChange={(val)=>{this.handleChange(val, "tunaFilter", "frequency")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Q
                    <Slider min={0.5} max={100} step={0.5} value={this.state.tunaFilter.Q} onChange={(val)=>{this.handleChange(val, "tunaFilter", "Q")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Gain
                    <Slider min={-40} max={40} step={2} value={this.state.tunaFilter.gain} onChange={(val)=>{this.handleChange(val, "tunaFilter", "gain")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Filter Type - {filterArr[ this.state.tunaFilter.filterType ]}
                    <Slider min={0} max={7} step={1} value={this.state.tunaFilter.filterType} onChange={(val)=>{this.handleChange(val, "tunaFilter", "filterType")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Bypass
                    <Slider min={0} max={1} step={1} value={this.state.tunaFilter.bypass} onChange={(val)=>{this.handleChange(val, "tunaFilter", "bypass")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Enable
                    <Slider min={0} max={1} step={1} value={this.state.tunaFilter.flag} onChange={(val)=>{this.handleChange(val, "tunaFilter", "flag")}} /></label>
                </div>
            </div>
            <div className="tile is-2 is-vertical is-parent">
                <div id="marginlessTuna" className="has-text-centered">
                    TREMOLO
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Intensity
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaTremolo.intensity} onChange={(val)=>{this.handleChange(val, "tunaTremolo", "intensity")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Stereo Phase
                    <Slider min={0} max={180} step={10} value={this.state.tunaTremolo.stereoPhase} onChange={(val)=>{this.handleChange(val, "tunaTremolo", "stereoPhase")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Rate
                    <Slider min={0.2} max={11} step={0.2} value={this.state.tunaTremolo.rate} onChange={(val)=>{this.handleChange(val, "tunaTremolo", "rate")}} /></label>
                </div>
                <div id="marginlessTuna"className="tile is-child box">
                    <label>Bypass
                    <Slider min={0} max={1} step={1} value={this.state.tunaTremolo.bypass} onChange={(val)=>{this.handleChange(val, "tunaTremolo", "bypass")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Enable
                    <Slider min={0} max={1} step={1} value={this.state.tunaTremolo.flag} onChange={(val)=>{this.handleChange(val, "tunaTremolo", "flag")}} /></label>
                </div>
            </div>
            <div className="tile is-2 is-vertical is-parent">
                <div id="marginlessTuna" className="has-text-centered">
                    WAHWAH
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Automode
                    <Slider min={0} max={1} step={1} value={this.state.tunaWahWah.automode} onChange={(val)=>{this.handleChange(val, "tunaWahWah", "automode")}} /></label>
                </div>
                <div id="marginlessTuna"className="tile is-child box">
                    <label>Base Frequency
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaWahWah.baseFrequency} onChange={(val)=>{this.handleChange(val, "tunaWahWah", "baseFrequency")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Excursion Octaves
                    <Slider min={1} max={6} step={0.25} value={this.state.tunaWahWah.excursionOctaves} onChange={(val)=>{this.handleChange(val, "tunaWahWah", "excursionOctaves")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Sweep
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaWahWah.sweep} onChange={(val)=>{this.handleChange(val, "tunaWahWah", "sweep")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Resonance
                    <Slider min={5} max={100} step={5} value={this.state.tunaWahWah.resonance} onChange={(val)=>{this.handleChange(val, "tunaWahWah", "resonance")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Sensitivity
                    <Slider min={-1} max={1} step={0.1} value={this.state.tunaWahWah.sensitivity} onChange={(val)=>{this.handleChange(val, "tunaWahWah", "sensitivity")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Bypass
                    <Slider min={0} max={1} step={1} value={this.state.tunaWahWah.bypass} onChange={(val)=>{this.handleChange(val, "tunaWahWah", "bypass")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Enable
                    <Slider min={0} max={1} step={1} value={this.state.tunaWahWah.flag} onChange={(val)=>{this.handleChange(val, "tunaWahWah", "flag")}} /></label>
                </div>
            </div>
            <div className="tile is-2 is-vertical is-parent">
                <div id="marginlessTuna" className="has-text-centered">
                    BITCRUSHER
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Bits
                    <Slider min={1} max={16} step={1} value={this.state.tunaBitcrusher.bits} onChange={(val)=>{this.handleChange(val, "tunaBitcrusher", "bits")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Buffer Size
                    <Slider min={0} max={5} step={1} value={this.state.tunaBitcrusher.bufferSize} onChange={(val)=>{this.handleChange(val, "tunaBitcrusher", "bufferSize")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Normfreq
                    <Slider min={0.0025} max={1} step={0.0025} value={this.state.tunaBitcrusher.normfreq} onChange={(val)=>{this.handleChange(val, "tunaBitcrusher", "normfreq")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Bypass
                    <Slider min={0} max={1} step={1} value={this.state.tunaBitcrusher.bypass} onChange={(val)=>{this.handleChange(val, "tunaBitcrusher", "bypass")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Enable
                    <Slider min={0} max={1} step={1} value={this.state.tunaBitcrusher.flag} onChange={(val)=>{this.handleChange(val, "tunaBitcrusher", "flag")}} /></label>
                </div>
            </div>
            <div className="tile is-2 is-vertical is-parent">
                <div id="marginlessTuna" className="has-text-centered">
                    MOOG FILTER
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Buffer Size
                    <Slider min={0} max={5} step={1} value={this.state.tunaMoogFilter.bufferSize} onChange={(val)=>{this.handleChange(val, "tunaMoogFilter", "bufferSize")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Cutoff
                    <Slider min={0.005} max={1} step={0.005} value={this.state.tunaMoogFilter.cutoff} onChange={(val)=>{this.handleChange(val, "tunaMoogFilter", "cutoff")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Resonance
                    <Slider min={0} max={4} step={0.2} value={this.state.tunaMoogFilter.resonance} onChange={(val)=>{this.handleChange(val, "tunaMoogFilter", "resonance")}} /></label>
                </div>
                <div id="marginlessTuna"className="tile is-child box">
                    <label>Bypass
                    <Slider min={0} max={1} step={1} value={this.state.tunaMoogFilter.bypass} onChange={(val)=>{this.handleChange(val, "tunaMoogFilter", "bypass")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Enable
                    <Slider min={0} max={1} step={1} value={this.state.tunaMoogFilter.flag} onChange={(val)=>{this.handleChange(val, "tunaMoogFilter", "flag")}} /></label>
                </div>
            </div>
            <div className="tile is-2 is-vertical is-parent">
                <div id="marginlessTuna" className="has-text-centered">
                    PING PONG
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Feedback
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaPingPongDelay.feedback} onChange={(val)=>{this.handleChange(val, "tunaPingPongDelay", "feedback")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Wet Level
                    <Slider min={0} max={1} step={0.05} value={this.state.tunaPingPongDelay.wetLevel} onChange={(val)=>{this.handleChange(val, "tunaPingPongDelay", "wetLevel")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Delay Time Left
                    <Slider min={50} max={10000} step={50} value={this.state.tunaPingPongDelay.delayTimeLeft} onChange={(val)=>{this.handleChange(val, "tunaPingPongDelay", "delayTimeLeft")}} /></label>
                </div>
                <div id="marginlessTuna"className="tile is-child box">
                    <label>Delay Time Right
                    <Slider min={50} max={10000} step={50} value={this.state.tunaPingPongDelay.delayTimeRight} onChange={(val)=>{this.handleChange(val, "tunaPingPongDelay", "delayTimeRight")}} /></label>
                </div>
                <div id="marginlessTuna" className="tile is-child box">
                    <label>Enable
                    <Slider min={0} max={1} step={1} value={this.state.tunaPingPongDelay.flag} onChange={(val)=>{this.handleChange(val, "tunaPingPongDelay", "flag")}} /></label>
                </div>
            </div>
        </div>
	</div>
    )}
}
