"use strict"
import React,{ Component } from"react"
import * as R from "ramda"
import ramjet from "ramjet"
const reqwest  = require("reqwest")
import J from "../common.js"


let initOnce = R.once(()=>{
    J.emitter.emit("init")
})

let firstData = {
    dePart:"Ich brauche mehr Zeit diese Frage zu antworten",
    enPart:"I need more time to answer this question"
}

let secondData = {
    dePart:"Die intelligente und die schöne Frau kann die Welt verändern",
    enPart:"The smart and the beautiful woman can change the world"
}
let thirdData = {
    dePart:"Die unnötige Komplexität getötet die Katze",
    enPart:"The unnecessary complexity killed the cat"
}
let dataArrRaw = [firstData,secondData,thirdData]
let dataArr = J.shuffle(dataArrRaw)
let currentId

let visibleStyle = {
    visibility: "visible",
    paddingLeft: "5px",
    paddingRight: "5px",
    cursor: "pointer"
}
let hiddenStyle = {
    visibility: "hidden",
    paddingLeft: "5px",
    paddingRight: "5px",
    cursor: "pointer"
}

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            globalData: dataArr,
            data:R.merge({},dataArr[ 0 ]),
            flagReady: false,
            index: 0,
            globalIndex: 0,
            memeStyle:{},
            memeStyleContainer:{},
            memeStyleContainerMobile:{},
            visibleArr: [],
            hiddenArr: [],
            buttonText: J.buttonText,
            buttonStyle: J.bulButtonInit
        }
        this.willHandleClick = this.willHandleClick.bind(this)
        this.willHandleButton = this.willHandleButton.bind(this)
    }
    componentDidMount() {
        emitter.on("init",()=>{
            let hiddenArrRaw = R.split(" ",this.state.data.dePart)
            let visibleArrRaw = R.split(" ",this.state.data.dePart)
            shuffle(visibleArrRaw)
            let hiddenArr = []
            let visibleArr = []
            hiddenArrRaw.map((val)=>{
                hiddenArr.push({name: val, visibilityState: false, customStyle: hiddenStyle})
            })
            visibleArrRaw.map((val)=>{
                visibleArr.push({name: val, visibilityState: true, customStyle: visibleStyle})
            })
            let imageUrl = `https://unsplash.it/${outerHalf}/${singleHeight * 40}/?random&more=${randomSeed()}`
            let imageUrlMobile = `https://unsplash.it/${winWidthIs}/${singleHeight * 50}/?random&more=${randomSeed()}`
            let memeStyleContainer = {
		      backgroundImage: `url(${imageUrl})`,
               width:`${outerHalf}px`,
                height: `${singleHeight * 40}px`
            }
            let memeStyleContainerMobile = {
		      backgroundImage: `url(${imageUrlMobile})`,
               width:`${winWidthIs}px`,
                height: `${singleHeight * 50}px`
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
                memeStyleContainerMobile: memeStyleContainerMobile,
                buttonText: "Show Answer",
                buttonStyle: "button"
            })
        })
        emitter.on("correct",()=>{
            let elementSource = document.getElementById(currentId)
            let elementDestination = document.getElementById(`${currentId}-hidden`)
            let timing = 700
            let futureSourceIndex = R.findIndex(R.propEq('name', currentId))(this.state.visibleArr)
            let futureDestinationIndex = R.findIndex(R.propEq('name', currentId))(this.state.hiddenArr)
            let visibleArrFuture = this.state.visibleArr
            visibleArrFuture[futureSourceIndex] = {
                name: visibleArrFuture[futureSourceIndex].name,
                customStyle: hiddenStyle
            }
            let hiddenArrFuture = this.state.hiddenArr
            hiddenArrFuture[futureDestinationIndex] = {
                name: hiddenArrFuture[futureDestinationIndex].name,
                customStyle: visibleStyle
            }
            console.log(elementSource.getBoundingClientRect())
            console.log(elementDestination.getBoundingClientRect())
            setTimeout(()=>{
                this.setState({
                    visibleArr: visibleArrFuture,
                    hiddenArr: hiddenArrFuture,
                    index: this.state.index+1
                })
            },timing-50)
            ramjet.transform(elementSource, elementDestination, {duration: timing})
        })
        emitter.on("wrong",()=>{
            let elementSource = document.getElementById(currentId)
            elementSource.classList.add("animated","zoomInDown")
            setTimeout(()=>{
                elementSource.classList.remove("animated","zoomInDown")
            },1000)
        })
        emitter.on("last word",()=>{
            emitter.emit("correct")
            this.setState({
                flagReady: true,
                buttonText: "Next",
                buttonStyle: "button is-success"
            })
        })
        emitter.on("show answer",()=>{
            let hiddenArrFuture = this.state.hiddenArr
            this.state.hiddenArr.map((val,key)=>{
                if(val.customStyle.visibility==="hidden"){
                    hiddenArrFuture[key]={
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
        emitter.on("next",()=>{
            let willBeIndex
            if (this.state.globalIndex === this.state.globalData.length - 1) {
                willBeIndex = 0
            } else {
                willBeIndex = this.state.globalIndex + 1
            }
            this.setState({
                data:R.merge({}, this.state.globalData[ willBeIndex ]),
                globalIndex: willBeIndex,
                flagReady: false,
                index: 0,
                memeStyle:{},
                memeStyleContainer:{},
                memeStyleContainerMobile:{},
                visibleArr: [],
                hiddenArr: []
            }, ()=>{
                emitter.emit("init")
            })
        })
        initOnce()
    }
    willHandleClick (event) {
        if(this.state.flagReady){
            return null
        }
        J.imMap.set("currentId", event.currentTarget.id)
        currentId = event.currentTarget.id
        if(currentId===this.state.hiddenArr[this.state.index].name){
            if(this.state.index+1===this.state.hiddenArr.length){
                emitter.emit("last word")
            }else{
                emitter.emit("correct")
            }
        }else{
            emitter.emit("wrong")
        }

    }
    willHandleButton () {
        if(this.state.buttonText === "Show Answer") {
            emitter.emit("show answer")
        } else if(this.state.buttonText === "Next") {
            emitter.emit("next")
        }
    }
    render () {
        return(
    <div className="onlyContainer">
        <div className="columns box is-hidden-mobile">
            <div className="column is-half is-offset-one-quarter has-text-centered" >
                {
                    this.state.visibleArr.map((val)=>{
                    return <span style={val.customStyle} key={randomSeed()} id={val.name} onClick={this.willHandleClick}>{val.name}</span>
                })
            }
            </div>
        </div>
        <div className="columns box is-hidden-mobile">
            <div className="column is-half is-offset-one-quarter has-text-centered" >
                {
                    this.state.hiddenArr.map((val)=>{
                    return <span style={val.customStyle} key={randomSeed()} id={`${val.name}-hidden`} >{val.name}</span>
                })
            }
            </div>
            <div className="column">
                <a className={`${this.state.buttonStyle}`} onClick={this.willHandleButton}>{this.state.buttonText}</a>
            </div>
        </div>
        <div className="columns box is-hidden-mobile">
            <div className="column is-half is-offset-one-quarter has-text-centered" >
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
