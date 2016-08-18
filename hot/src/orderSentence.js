"use strict"
import React, { Component } from "react"
import ReactDOM from "react-dom"
import * as R from "ramda"
import ramjet from "ramjet"
import J from "../../_inc/commonReact.js"

const winWidthIs = window.innerWidth * 1
const winHeightIs = window.innerHeight * 1

const singleWidth = Math.floor(winWidthIs / 100)
const fontSizeIs = Math.floor(singleWidth * 2.5)
const singleHeight = Math.floor(winHeightIs / 100)

const outerHalf = Math.floor(winWidthIs / 2)
const outerQuorter = Math.floor(winWidthIs / 4)

function randomSeed() {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    return text
}

let currentId
let visibleStyle = {
    fontSize: `${singleHeight * 4}px`,
    visibility: "visible",
    paddingLeft: "5px",
    paddingRight: "5px",
    cursor: "pointer"
}
let hiddenStyle = {
    fontSize: `${singleHeight * 4}px`,
    visibility: "hidden",
    paddingLeft: "5px",
    paddingRight: "5px",
    cursor: "pointer"
}

let buttonStyle = {
    fontSize: `${singleHeight * 2}px`,
    paddingTop: `${singleHeight * 2}px`,
    paddingLeft: "0px",
    paddingRight: "0px"
}

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            globalData: [],
            data:{
                dePart:"Die unnötige Komplexität getötet die Katze",
                enPart:"The unnecessary complexity killed the cat"
            },
            flagReady: false,
            index: 0,
            globalIndex: 0,
            memeStyle:{},
            memeStyleContainer:{},
            visibleArr: [],
            hiddenArr: [],
            buttonText: "Show Answer",
            buttonStyle: "button"
        }
        this.willHandleClick = this.willHandleClick.bind(this)
        this.willHandleButton = this.willHandleButton.bind(this)
    }
    componentDidMount() {
        //J.postData(`${J.hapi}/orderSentence`,{}).then(incoming=>{
        J.postData("/orderSentence", {}).then(incoming=>{
            let globalData = J.shuffle(incoming)
            let data = globalData[ 0 ]
            this.setState({globalData, data}, ()=>{
                J.emitter.emit("init")
            })
        })
        J.emitter.on("init", ()=>{
            let hiddenArrRaw = R.split(" ", this.state.data.dePart)
            let visibleArrRaw = R.split(" ", this.state.data.dePart)
            J.shuffle(visibleArrRaw)
            let hiddenArr = []
            let visibleArr = []
            hiddenArrRaw.map((val)=>{
                hiddenArr.push({name: val, visibilityState: false, customStyle: hiddenStyle})
            })
            visibleArrRaw.map((val)=>{
                visibleArr.push({name: val, visibilityState: true, customStyle: visibleStyle})
            })
            let imageUrl = `https://unsplash.it/${outerHalf}/${singleHeight * 40}/?random&more=${randomSeed()}`
            let memeStyleContainer = {
                backgroundImage: `url(${imageUrl})`,
                width:`${outerHalf}px`,
                height: `${singleHeight * 40}px`
            }
            let memeStyle = {
                fontSize: "20px",
                backgroundColor: "#CFD8DC",
                color: "#546E7A",
                paddingLeft:`${singleWidth * 5}px`,
                paddingRight:`${singleWidth * 5}px`
            }
            this.setState({
                visibleArr: visibleArr,
                hiddenArr: hiddenArr,
                memeStyle: memeStyle,
                memeStyleContainer: memeStyleContainer,
                buttonText: "Show Answer",
                buttonStyle: "button"
            })
        })
        J.emitter.on("correct", ()=>{
            let elementSource = document.getElementById(currentId)
            let elementDestination = document.getElementById(`${currentId}-hidden`)
            let timing = 700
            let futureSourceIndex = R.findIndex(R.propEq("name", currentId))(this.state.visibleArr)
            let futureDestinationIndex = R.findIndex(R.propEq("name", currentId))(this.state.hiddenArr)
            let visibleArrFuture = this.state.visibleArr
            visibleArrFuture[ futureSourceIndex ] = {
                name: visibleArrFuture[ futureSourceIndex ].name,
                customStyle: hiddenStyle
            }
            let hiddenArrFuture = this.state.hiddenArr
            hiddenArrFuture[ futureDestinationIndex ] = {
                name: hiddenArrFuture[ futureDestinationIndex ].name,
                customStyle: visibleStyle
            }
            setTimeout(()=>{
                this.setState({
                    visibleArr: visibleArrFuture,
                    hiddenArr: hiddenArrFuture,
                    index: this.state.index + 1
                })
            }, timing - 50)
            ramjet.transform(elementSource, elementDestination, {duration: timing})
        })
        J.emitter.on("wrong", ()=>{
            let elementSource = document.getElementById(currentId)
            elementSource.classList.add("animated", "zoomInDown")
            setTimeout(()=>{
                elementSource.classList.remove("animated", "zoomInDown")
            }, 1000)
        })
        J.emitter.on("last word", ()=>{
            J.emitter.emit("correct")
            this.setState({
                flagReady: true,
                buttonText: "Next",
                buttonStyle: "button is-success"
            })
        })
        J.emitter.on("show answer", ()=>{
            let hiddenArrFuture = this.state.hiddenArr
            this.state.hiddenArr.map((val, key)=>{
                if (val.customStyle.visibility === "hidden") {
                    hiddenArrFuture[ key ] = {
                        name: val.name,
                        customStyle: visibleStyle
                    }
                }
            })
            this.setState({
                flagReady:true,
                hiddenArr: hiddenArrFuture,
                buttonText: "Next",
                buttonStyle: "button is-success"
            })
        })
        J.emitter.on("next", ()=>{
            let willBeIndex
            if (this.state.globalIndex === this.state.globalData.length - 1) {
                willBeIndex = 0
            } else {
                willBeIndex = this.state.globalIndex + 1
            }
            J.log(this.state.globalData)
            this.setState({
                data:R.merge({}, this.state.globalData[ willBeIndex ]),
                globalIndex: willBeIndex,
                flagReady: false,
                index: 0,
                memeStyle:{},
                memeStyleContainer:{},
                visibleArr: [],
                hiddenArr: []
            }, ()=>{
                J.emitter.emit("init")
            })
        })
        //initOnce()
    }
    willHandleClick (event) {
        if (this.state.flagReady) {
            return null
        }
        currentId = event.currentTarget.id
        if (currentId === this.state.hiddenArr[ this.state.index ].name) {
            if (this.state.index + 1 === this.state.hiddenArr.length) {
                J.emitter.emit("last word")
            } else {
                J.emitter.emit("correct")
            }
        } else {
            J.emitter.emit("wrong")
        }

    }
    willHandleButton () {
        if (this.state.buttonText === "Show Answer") {
            J.emitter.emit("show answer")
        } else if (this.state.buttonText === "Next") {
            J.emitter.emit("next")
        }
    }
    render () {
        return (
    <div className="onlyContainer">
        <div className="columns box">
            <div className="column is-10 is-offset-1 has-text-centered" >
                {
                    this.state.visibleArr.map((val)=>{
                        return <span style={val.customStyle} key={randomSeed()} id={val.name} onClick={this.willHandleClick}>{val.name}</span>
                    })
            }
            </div>
        </div>
        <div className="columns box">
            <div className="column is-10 is-offset-1 has-text-centered" >
                {
                    this.state.hiddenArr.map((val)=>{
                        return <span style={val.customStyle} key={randomSeed()} id={`${val.name}-hidden`} >{val.name}</span>
                    })
            }
            </div>
            <div style={buttonStyle} className="column">
                <a className={this.state.buttonStyle} onClick={this.willHandleButton}>{this.state.buttonText}</a>
            </div>
        </div>
        <div className="columns box is-hidden-mobile">
            <div className="column is-half is-offset-one-quarter" >
                <div style={this.state.memeStyleContainer} >
                    <div style={this.state.memeStyle} className="has-text-centered">
                        {this.state.data.enPart}
                    </div>
                </div>
            </div>
        </div>
	</div>
    )}
}
