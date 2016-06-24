"use strict"
import React,{ Component } from"react"
import* as R from"ramda"
// const Griddle = require("griddle-react")

let emitter = new Events()
let initOnce = R.once(()=>{
    emitter.emit("init")
})

const winWidthIs = window.innerWidth * 1
const winHeightIs = window.innerHeight * 1

const singleWidth = Math.floor(winWidthIs / 100)
const fontSizeIs = Math.floor(singleWidth * 2.5)
const singleHeight = Math.floor(winHeightIs / 100)

const outerHalf = Math.floor(winWidthIs / 2)
const outerQuorter = Math.floor(winWidthIs / 4)

// let immutableMap = Immutable.Map({})
// let immutableStack = Immutable.Stack([])
//
function randomSeed() {
    var text = ""
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"

    for(var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length))

    return text
}
function createAltKey(keyIs) {
    if(keyIs === "ä") {
        return"a"
    } else if(keyIs === "ö") {
        return"o"
    } else if(keyIs === "ü") {
        return"u"
    } else if(keyIs === "ß") {
        return"s"
    } else{
        return false
    }
}

function shuffle(arr) {
    let i,j,temp
    for(i = arr.length - 1; i > 0; i--) {
        j = Math.floor(Math.random() * (i + 1))
        temp = arr[ i ]
        arr[ i ] = arr[ j ]
        arr[ j ] = temp
    }
    return arr
}

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
let dataArr = shuffle(dataArrRaw)
let expectedKey

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data:R.merge({},dataArr[ 0 ]),
            previousWordStyle: "",
            currentWordStyle: "",
            wordStyle:{},
            visibleStyle:{},
            memeStyle:{},
            memeStyleContainer:{},
            inputFieldValue: "",
            index: 0,
            globalIndex: 0,
            wordIndex: 0,
            willCheck: [],
            willBeVisible: [],
            willBeHidden: [],
            currentCheck: "",
            flagReady:false,
            buttonText: "Show Answer",
            buttonStyle: "button"
        }
        this.willHandleKeyPress = this.willHandleKeyPress.bind(this)
        this.willHandleButton = this.willHandleButton.bind(this)
    }
    componentDidMount() {
        emitter.on("init",()=>{
            let willCheck = []
            let willBeVisible = []
            let willBeHidden = []
            let imageUrl = `https://unsplash.it/${outerHalf}/${singleHeight * 40}/?random&more=${randomSeed()}`
            R.split(" ",this.state.data.dePart).map((val)=>{
                if(!R.isEmpty(val)) {
                    willCheck.push(val)
                    willBeHidden.push(`${val} `)
                    willBeVisible.push(`${R.head(val)}${".".repeat(val.length - 1)} `)
                }
            })

            let memeStyleContainer = {
					                                                                                                                                 backgroundImage: `url(${imageUrl})`,
                width:`${outerHalf}px`,
                height: `${singleHeight * 40}px`
            }
            let memeStyle = {
                fontSize: "20px",
                backgroundColor: "#CFD8DC",
                color: "#546E7A",
                paddingLeft:`${singleWidth * 5}px`
            }
            let visibleStyle = {
                fontWeight: "800"
            }
            let wordStyle = {
                fontSize: `${singleHeight * 3}px`,
                paddingLeft:"8px",
                paddingRight:"8px"
            }
            this.setState({
                willCheck: willCheck,
                willBeVisible: willBeVisible,
                willBeHidden: willBeHidden,
                currentCheck: willCheck[ this.state.index ],
                visibleStyle: visibleStyle,
                wordStyle: wordStyle,
                memeStyle: memeStyle,
                memeStyleContainer: memeStyleContainer
            },()=>{
                console.log(this.state)
            })
        })
        emitter.on("add word",()=>{
            let local = this.state.willBeVisible
            local[ this.state.index ] = `${this.state.currentCheck} `
            let stateBefore = R.join(" ",R.init(R.split(" ",this.state.inputFieldValue)))
            this.setState({
                inputFieldValue: `${stateBefore} ${this.state.currentCheck} `,
                currentCheck: this.state.willCheck[ this.state.index + 1 ],
                index: this.state.index + 1,
                previousWordStyle: "tag is-success",
                currentWordStyle: "tag is-warning",
                wordIndex: 0,
                willBeVisible: local
            })
        })
        emitter.on("add char",()=>{
            this.setState({
                inputFieldValue: `${this.state.inputFieldValue}${expectedKey}`,
                wordIndex: this.state.wordIndex + 1
            })
        })
        emitter.on("show answer",()=>{
            this.setState({
                inputFieldValue: R.join("",this.state.willBeHidden),
                willBeVisible: this.state.willBeHidden,
                previousWordStyle:"",
                currentWordStyle: "",
                flagReady: true,
                buttonText: "Next",
                buttonStyle: "button is-success"
            })
        })
        emitter.on("next",()=>{
            let willBeIndex
            if(this.state.globalIndex === dataArr.length - 1) {
                willBeIndex = 0
            } else{
                willBeIndex = this.state.globalIndex + 1
            }
            this.setState({
                data:R.merge({},dataArr[ willBeIndex ]),
                willCheck: [],
                willBeVisible: [],
                willBeHidden: [],
                inputFieldValue: "",
                index: 0,
                globalIndex: willBeIndex,
                wordIndex: 0,
                flagReady:false,
                buttonText: "Next",
                buttonStyle: "button"
            },()=>{
                emitter.emit("init")
                document.getElementById("focusMe").focus()
            })
        })
        initOnce()
    }
    willHandleKeyPress (event) {
        if(this.state.flagReady && event.key === "Enter") {
            emitter.emit("next")
            return null
        }
        let stateRaw = `${event.target.value}${event.key}`
        let state = R.last(R.split(" ",stateRaw))
        let keyIs = event.key.toLowerCase()
        expectedKey = this.state.currentCheck[ this.state.wordIndex ]
        let expectedKeyAlt = createAltKey(this.state.currentCheck[ this.state.wordIndex ].toLowerCase())
        if(expectedKey.toLowerCase() === keyIs || expectedKeyAlt === keyIs) {
            if(state === this.state.currentCheck) {
                console.log(stateRaw.trim(),this.state.data.dePart)
                if(stateRaw.trim() === this.state.data.dePart) {
                    console.log("show answer")
                    emitter.emit("show answer")
                } else{
                    console.log("add word")
                    emitter.emit("add word")
                }
            } else{
                console.log("add char")
                emitter.emit("add char")
            }
        } else if(event.key === "Enter") {
            emitter.emit("show answer")
        } else if(event.key !== " ") {
            if(this.state.willBeHidden.length - 1 === this.state.index) {
                console.log("show answer")
                emitter.emit("show answer")
            }
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
        <div className="box has-text-centered">
            <input id="focusMe" autoFocus type="text" size={this.state.data.dePart.length + 3} value={this.state.inputFieldValue} onKeyPress={this.willHandleKeyPress}/>
        </div>
        <div style={this.state.visibleStyle} className="box has-text-centered">
            {this.state.willBeVisible.map((val,key)=>{
                if(key === this.state.index - 1 && key !== this.state.willBeVisible.length - 1) {
                    return<span style={this.state.wordStyle} key={`${key}-word`} className={this.state.previousWordStyle}>{val}</span>
                } else if(key === this.state.index) {
                    return<span style={this.state.wordStyle} key={`${key}-word`} className={this.state.currentWordStyle}>{val}</span>
                } else{
                    return<span style={this.state.wordStyle} key={`${key}-word`}>{val}</span>
                }
            })}
            <a className={`${this.state.buttonStyle}`} onClick={this.willHandleButton}>{this.state.buttonText}</a>
        </div>
        <div className="columns box">
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

function Events(target) {
    let events = {},empty = []
    target = target || this
    target.on = function(type,func,ctx) {
        (events[ type ] = events[ type ] || []).push([func,ctx])
    }
    target.off = function(type,func) {
        type || (events = {})
        var list = events[ type ] || empty,
            i = list.length = func ? list.length : 0
        while(i--) func == list[ i ][ 0 ] && list.splice(i,1)
    }
    target.emit = function(type) {
        let e = events[ type ] || empty,list = e.length > 0 ? e.slice(0,e.length) : e,i = 0,j
        while(j = list[ i++ ]) j[ 0 ].apply(j[ 1 ],empty.slice.call(arguments,1))
    }
}
