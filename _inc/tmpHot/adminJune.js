"use strict"
import React,{ Component }from"react"
const winWidthIs = window.innerWidth * 1
const winHeightIs = window.innerHeight * 1
const singleGridInPxs = Math.floor(winWidthIs / 12)
const topGitter = Math.floor(winWidthIs / 33)
const heightInPxs = Math.floor(winHeightIs / 12)
const noEighter = Math.floor(singleGridInPxs / 8)
const noEighterHeight = Math.floor(heightInPxs / 8)
const noQuarter = Math.floor(singleGridInPxs / 4)
const noQuarterHeight = Math.floor(heightInPxs / 4)
const noHalfer = Math.floor(singleGridInPxs / 2)
const noHalferHeight = Math.floor(window.innerHeight / 24)
let immutableMap   = Immutable.Map({})
let immutableStack   = Immutable.Stack([])
	//	    socket.io.close()

function save (key,value) {
	            if(immutableMap.get(key)) {
		            immutableStack = immutableStack.push({
			            action: "overwrite",
			            key:    key,
			            value:  value
			})}
	            immutableMap = immutableMap.set(key,value)
}
function load (key) {
	            return immutableMap.get(key)
}
function sendCommand (commandIs) {
    request("GET","http://localhost:3001/command/").done(function (res) {
        console.log(res)
    })
}

const colorArray = ["#0097A7","#26C6DA","#80DEEA","#F06292","#FF4081","#C2185B"]
const bulmaButtonColors = ["button is-primary","button is-info","button is-success","button is-warning","button is-danger"]
const animationEffects = ["bounceInDown","fadeInUpBig","flipInX","rotateInUpLeft","zoomInRight"]
let colorCounter = 0
let colorCounterFirstLevel = 0
function nextColor () {
    if(colorCounter===4) {
        colorCounter = 0
        return"button is-primary"
    }else{
        colorCounter++
        return`${bulmaButtonColors[ colorCounter ]}`
    }
}

function nextButtonColor (prevColorIs) {
    if(prevColorIs.includes("button is-danger")) {
        colorCounterFirstLevel = 0
        return"button is-primary"
    }
    colorCounterFirstLevel++
    return bulmaButtonColors[ colorCounterFirstLevel ]
}

function commandRouteRequest (routeIs,dataIs,callback) {
    request.post("http://localhost:3001/command/",{dataIs: "mehr"},function (e,res,body) {
        callback(body)
    })
}
PubSub.subscribe( "command",(a,b)=>{
    console.log(a,b)
    commandRouteRequest()
})
const firstLevelIs = ["Control Panel","Search helper","iLs","Write","Meme"]
const fullSpec = {
    "Control Panel": ["send","db","pm2","log","run command","test and reply","notify","edit settings"],
    "Search helper": ["libraryName","just","more","video and stuff","slow"],
    "iLs": ["ultimate","pick words","pick sentences","pick images","semiauto generator"],
    "Write": ["nodejs","reactjs","tutorial","presentation","codeacademy"],
    "Meme": ["simple prepare","long automated prepare","run command","publish","prepare 10"]
}

class Just extends Component {
    constructor (props) {
        super(props)
        this.state = {
            firstCounter: 0,
            secondCounter: 0,
            firstLevel: firstLevelIs[ 0 ],
            secondLevel: fullSpec[ "iLs" ],
            relatedToInput: [],
            currentMode: fullSpec[ "iLs" ][ 0 ],
            classNameFirst: "button is-warning",
            classNameSecond: "button is-warning",
            classNameThird: "button is-warning",
            classNameFourth: "button is-warning",
            classNameFifth: "button is-warning"
        }
        this.willHandlePress = this.willHandlePress.bind(this)
        this.willHandleAction = this.willHandleAction.bind(this)
        this.willHandleMiniAction = this.willHandleMiniAction.bind(this)
        this.willHandleMicroAction = this.willHandleMicroAction.bind(this)
        this.willHandleRelated = this.willHandleRelated.bind(this)
        this.willHandleActionFifth = this.willHandleActionFifth.bind(this)
    }
    static get defaultProps () {
        return{
            "propIs": false
        }
    }
    componentDidMount () {
        let self = this
		let socket = io.connect("//localhost:3100")
		//let socket = io.connect("//localhost:3100",{"forceNew": true})
		socket.on("connect",function (error) {
			console.log("socketio client connected")
		})
		socket.on("dataReady",function (data) {
		})
		socket.on("error",function (error) {
			console.log(error)
		})
        PubSub.subscribe( "firstLevel",()=>{
            let nextColor = nextButtonColor(self.state.classNameFirst)
            let nextCounter= self.state.firstCounter+1
            let prevLevelIs = self.state.firstLevel
            let nextFirstLevel = ""
            if(prevLevelIs==="Meme") {
                nextFirstLevel += "Control Panel"
            }else{
                let local = firstLevelIs.indexOf(prevLevelIs)
                nextFirstLevel += firstLevelIs[ local+1 ]
            }
            self.setState({
                firstCounter: nextCounter,
                firstLevel: nextFirstLevel,
                secondLevel: fullSpec[ nextFirstLevel ],
                currentMode: fullSpec[ nextFirstLevel ][ 0 ],
                classNameFirst: nextColor
            })
        })
        PubSub.subscribe( "secondLevel",()=>{
        })
    }
    willHandlePress (event) {
        let just = `${event.target.value}`.trim().toLowerCase()
        save("currentInput",just)
		console.log(load("currentInput"))
        // 	this.setState({currentColor : colorArray})
        if(event.key === "Enter") {
            console.log(just)
			if(this.state.currentMode==="send"){

			}
        }
    }
    willHandleAction (flag) {
        PubSub.publish( "firstLevel")
        //PubSub.publish( "command" ,"hello world!" )
        if(flag==="notify") {}
    }
    willHandleMiniAction (flag) {
        console.log(flag)
        this.setState({
            currentMode: flag
        })
    }
    willHandleMicroAction (flag) {
        console.log(flag)
    }
    willHandleRelated (event) {
        console.log(event)
    }
    willHandleActionFifth (event) {
        console.log(event)
    }
  	render () {
    return(
        <div>
          <div className="box">
          <span className="icon"><i className="fa fa-home"></i></span>
          <a className={this.state.classNameFirst} key={this.state.firstLevel} onClick={this.willHandleAction}>{this.state.firstLevel}</a>
          <hr />
          {this.state.secondLevel.map((val,keyIs)=>{
              return<a className={nextColor()} key={keyIs} onClick={()=>this.willHandleMiniAction(val)}>{val}</a>
          })}
        </div>
        <div className="box">
        <input className="input is-success" type="text" placeholder="Text input" onKeyPress={this.willHandlePress} />
        {this.state.relatedToInput.map((val,keyIs)=>{
            return<span><a className={nextColor()} key={keyIs} onClick={()=>this.willHandleRelated(val)}>{val}</a></span>
        })}
        </div>
        <div className="box">
            {this.state.currentMode}
        </div>
      </div>
    )
  }
}

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            textDecoration: "none"
        }
        this.willHandleKeyPress = this.willHandleKeyPress.bind(this)
        this.willHandleNextRequest = this.willHandleNextRequest.bind(this)
        this.willHandleAnswerRequest = this.willHandleAnswerRequest.bind(this)
    }
    static get defaultProps () {
        return{"first":"second"}
    }
    willHandleKeyPress (event) {
        	//let local = `${Math.floor(window.innerHeight / 24)}px`
        	let just = `${event.target.value}${event.key}`.trim().toLowerCase()
            // 	this.setState({currentColor : colorArray})
        if(event.key === "Enter") {

        }
    }
    	willHandleNextRequest (e) {
    }
    	willHandleAnswerRequest (e) {
    }
  	render () {
    return(
        <div>
            <Just ></Just>
            <div className="columns is-mobile">
                <div className="column is-4 is-offset-2">
                    <label className="label">Guess the hidden word</label>
                    <p className="control has-icon has-icon-right">
                        <input className="input is-success" type="text" placeholder="Text input" onKeyPress={this.willHandleKeyPress} />
                        <i className="fa fa-check"></i>
                    </p>
                </div>
          </div>
          <div className="columns is-mobile">
              <div className="column is-1-mobile is-2-tablet is-2-desktop"></div>
              <div className="column is-3-mobile is-2-tablet is-2-desktop">
                  <label className="label">hidden word</label>
              </div>
              <div className="column is-3-mobile is-2-tablet is-2-desktop">
                  <label className="label">translated word</label>
              </div>
              <div className="column is-3-mobile is-2-tablet is-2-desktop">
                  <a className="button is-primary" onClick={this.willHandleNextRequest}>Next</a>
                  <a className="button is-warning">Answer</a>
              </div>
              <div className="column is-2"></div>
        </div>
        <div className="columns is-mobile">
            <div className="column is-10 is-offset-1">
            </div>
            <div className="column is-1">
            </div>
      </div>
      </div>
    )
  }
}

function getDistance (a,b) {
    	if(a.length == 0)return b.length
    	if(b.length == 0)return a.length

    	var matrix = []

    // increment along the first column of each row
    	var i
    	for(i = 0; i <= b.length; i ++) {
        	matrix[ i ] = [i]
    }

    // increment each column in the first row
    	var j
    	for(j = 0; j <= a.length; j ++) {
        	matrix[ 0 ][ j ] = j
    }

    // Fill in the rest of the matrix
    	for(i = 1; i <= b.length; i ++) {
        	for(j = 1; j <= a.length; j ++) {
            	if(b.charAt(i - 1) == a.charAt(j - 1)) {
                	matrix[ i ][ j ] = matrix[ i - 1 ][ j - 1 ]
            }else{
                	matrix[ i ][ j ] = Math.min(matrix[ i - 1 ][ j - 1 ] + 1, // substitution
                    Math.min(matrix[ i ][ j - 1 ] + 1, // insertion
                        matrix[ i - 1 ][ j ] + 1)) // deletion
            }
        }
    }

    	return matrix[ b.length ][ a.length ]
}
