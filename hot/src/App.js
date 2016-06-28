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
    dePart:"Die unnötige Komplexität getötet die Katze",
    enPart:"The unnecessary complexity killed the cat"
}

let dataArrRaw = [firstData,secondData]
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
            index: 0,
            globalIndex: 0,
            globalData: [],
            data:R.merge({},dataArr[ 0 ]),
            flagReady: false,
            memeStyleContainer:{},
            visibleArr: [],
            hiddenArr: [],
            buttonText: J.buttonTextShowAnswer,
            buttonStyle: J.bulButtonInit
        }
        this.willHandleClick = this.willHandleClick.bind(this)
        this.willHandleButton = this.willHandleButton.bind(this)
    }
    componentDidMount() {
        
        J.emitter.on("init",()=>{
            let imageHeight = J.getHeightPx(40)
            let imageWidth = J.getWidthPx(50)
            let imageUrl = `https://unsplash.it/${imageWidth}/${imageHeight}/?random&more=${J.randomSeed()}`
            let memeStyleContainer = {
		        backgroundImage: `url(${imageUrl})`,
		    }
            let hiddenArr = []
            let visibleArr = []
            let hiddenArrRaw = R.split(" ",this.state.data.dePart)
            let visibleArrRaw = hiddenArrRaw
            R.shuffle(visibleArrRaw)
            hiddenArrRaw.map((val)=>{
                hiddenArr.push({name: val, customClass: "isHidden"})
                //hiddenArr.push({name: val, visibilityState: false, customStyle: hiddenStyle, customClass: "isHidden"})
            })
            visibleArrRaw.map((val)=>{
                visibleArr.push({name: val, customClass: "isVisible"})
                //visibleArr.push({name: val, visibilityState: true, customStyle: visibleStyle, customClass: "isVisible"})
            })
            this.setState({
                visibleArr: visibleArr,
                hiddenArr: hiddenArr,
                memeStyleContainer: memeStyleContainer,
                buttonText: J.buttonTextShowAnswer,
                buttonStyle: J.bulButtonInit
            })
        })
        J.emitter.on("correct",()=>{
            let timing = 700
            let elementSource = document.getElementById(J.imMap.get("currentId"))
            let elementDestination = document.getElementById(`${J.imMap.get("currentId")}-hidden`)
            let sourceIndexFuture = R.findIndex(R.propEq('name', J.imMap.get("currentId"))(this.state.visibleArr)
            let destinationIndexFuture = R.findIndex(R.propEq('name', J.imMap.get("currentId")))(this.state.hiddenArr)
            let visibleArrFuture = this.state.visibleArr
            let hiddenArrFuture = this.state.hiddenArr
            visibleArrFuture[sourceIndexFuture] = {
                name: visibleArrFuture[sourceIndexFuture].name,
                customClass: "isHidden"
                //customStyle: hiddenStyle
            }
            hiddenArrFuture[destinationIndexFuture] = {
                name: hiddenArrFuture[destinationIndexFuture].name,
                customClass: "isVisible"
                //customStyle: visibleStyle
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
        J.emitter.on("wrong",()=>{
            let elementSource = document.getElementById(J.imMap.get("currentId"))
            elementSource.classList.add("animated","zoomInDown")
            setTimeout(()=>{
                elementSource.classList.remove("animated","zoomInDown")
            },1000)
        })
        J.emitter.on("last word",()=>{
            J.emitter.emit("correct")
            this.setState({
                flagReady: true,
                buttonText: J.buttonTextNext,
                buttonStyle: J.bulButtonNext
            })
        })
        J.emitter.on("show answer",()=>{
            let hiddenArrFuture = this.state.hiddenArr
            this.state.hiddenArr.map((val,key)=>{
                if(val.customClass==="isHidden"){
                    hiddenArrFuture[key]={
                        name: val.name,
                        customClass: "isVisible"
                        //customStyle: visibleStyle
                    }
                }
            })
            this.setState({
                flagReady:true,
                hiddenArr: hiddenArrFuture,
                buttonText: J.buttonTextNext,
                buttonStyle: J.bulButtonNext
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
                memeStyleContainer:{},
                visibleArr: [],
                hiddenArr: []
            }, ()=>{
                J.emitter.emit("init")
            })
        })
        initOnce()
        reqwest({
			url:       "/db.json",
			method:  "get",
			error: (err) => { console.log(err)},
			success: (data)=> {
				globalData: J.shuffle(R.filter(J.isUniq, data.main))
			}
		})
    }
    willHandleClick (event) {
        if(this.state.flagReady){
            return null
        }
        J.imMap.set("currentId", event.currentTarget.id)
        currentId = event.currentTarget.id
        if(J.imMap.get("currentId")===this.state.hiddenArr[this.state.index].name){
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
            J.emitter.emit("show answer")
        } else if(this.state.buttonText === "Next") {
            J.emitter.emit("next")
        }
    }
    render () {
        return(
    <div className="onlyContainer">
        <div className="columns box is-hidden-mobile">
            <div className="column is-half is-offset-one-quarter has-text-centered" >
                {
                    this.state.visibleArr.map((val)=>{
                    return <span style={val.customStyle} key={randomSeed()} className={val.customClass} id={val.name} onClick={this.willHandleClick}>{val.name}</span>
                })
            }
            </div>
        </div>
        <div className="columns box is-hidden-mobile">
            <div className="column is-half is-offset-one-quarter has-text-centered" >
                {
                    this.state.hiddenArr.map((val)=>{
                    return <span style={val.customStyle} key={randomSeed()} className={val.customClass} id={`${val.name}-hidden`} >{val.name}</span>
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
                <div className="meme has-text-centered">
                    {this.state.data.enPart}
                </div>
            </div>
            </div>
        </div>
	</div>
    )}
}
