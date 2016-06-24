"use strict"
import React ,{ Component }from"react"
import ReactDOM from"react-dom"

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

function save (key ,value) {
	if(immutableMap.get(key)) {
		immutableStack = immutableStack.push({
		action: "overwrite" ,
		key:    key ,
		value:  value
	})}
	            immutableMap = immutableMap.set(key ,value)
}
function load (key) {
	return immutableMap.get(key)
}
function sendCommand (commandIs) {
    request("GET" ,"http://localhost:3001/command/").done(function (res) {
        console.log(res)
    })
}

const colorArray = ["#0097A7" ,"#26C6DA" ,"#80DEEA" ,"#F06292" ,"#FF4081" ,"#C2185B"]
const bulmaButtonColors = ["button is-primary" ,"button is-info" ,"button is-success" ,"button is-warning" ,"button is-danger"]
const animationEffects = ["bounceInDown" ,"fadeInUpBig" ,"flipInX" ,"rotateInUpLeft" ,"zoomInRight"]
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

function commandRouteRequest (routeIs ,dataIs ,callback) {
    request.post("http://localhost:3001/command/" ,{dataIs: "mehr"} ,function (e ,res ,body) {
        callback(body)
    })
}
PubSub.subscribe( "command" ,(a ,b)=>{
    console.log(a ,b)
    commandRouteRequest()
})
const firstLevelIs = ["Control Panel" ,"Search helper" ,"iLs" ,"Write" ,"Meme"]
const fullSpec = {
    "Control Panel": ["send" ,"db" ,"pm2" ,"log" ,"run command" ,"test and reply" ,"notify" ,"edit settings"] ,
    "Search helper": ["libraryName" ,"just" ,"more" ,"video and stuff" ,"slow"] ,
    "iLs": ["ultimate" ,"pick words" ,"pick sentences" ,"pick images" ,"semiauto generator"] ,
    "Write": ["nodejs" ,"reactjs" ,"tutorial" ,"presentation" ,"codeacademy"] ,
    "Meme": ["simple prepare" ,"long automated prepare" ,"run command" ,"publish" ,"prepare 10"]
}

class Just extends Component {
    constructor (props) {
        super(props)
        this.state = {
            firstCounter: 0 ,
            secondCounter: 0 ,
            firstLevel: firstLevelIs[ 0 ] ,
            secondLevel: fullSpec[ "iLs" ] ,
            relatedToInput: [] ,
            currentMode: fullSpec[ "iLs" ][ 0 ] ,
            classNameFirst: "button is-warning" ,
            classNameSecond: "button is-warning" ,
            classNameThird: "button is-warning" ,
            classNameFourth: "button is-warning" ,
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
		let socket = io.connect("//localhost:3100" ,{"forceNew": true})
		socket.on("connect" ,function (error) {
			console.log("socketio client connected")
            socket.emit("client" ,{"data": "dataIs"} ,()=>{
                console.log(7)
            })

		})
        socket.emit("client" ,{"data": "dataIs"} ,()=>{
            console.log(7)
        })
		socket.on("server" ,function (data) {
            console.log(data)
		})
		socket.on("error" ,function (error) {
			console.log(error)
		})
        PubSub.subscribe( "firstLevel" ,()=>{
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
                firstCounter: nextCounter ,
                firstLevel: nextFirstLevel ,
                secondLevel: fullSpec[ nextFirstLevel ] ,
                currentMode: fullSpec[ nextFirstLevel ][ 0 ] ,
                classNameFirst: nextColor
            })
        })
        PubSub.subscribe( "secondLevel" ,()=>{
        })
    }
    willHandlePress (event) {
        let just = `${event.target.value}`.trim().toLowerCase()
        save("currentInput" ,just)
		console.log(load("currentInput"))
        // 	this.setState({currentColor : colorArray})
        if(event.key === "Enter") {
            console.log(just)
			if(this.state.currentMode==="send") {

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
          {this.state.secondLevel.map((val ,keyIs)=>{
              return<a className={nextColor()} key={keyIs} onClick={()=>this.willHandleMiniAction(val)}>{val}</a>
          })}
        </div>
        <div className="box">
        <input className="input is-success" type="text" placeholder="Text input" onKeyPress={this.willHandlePress} />
        {this.state.relatedToInput.map((val ,keyIs)=>{
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

ReactDOM.render(<Just /> ,document.getElementById("hook"))
