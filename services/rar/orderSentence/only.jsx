"use strict"
import React,{ Component } from "react"
import ReactDOM from "react-dom"

import R from "ramda"
import FlipMove from "react-flip-move"
const dataRaw  = {
    "data": [
        {
            "dePart": "Ich habe meine Telefonnummer verloren, kann ich deine haben",
            "enPart": "I forgot my phone number, can I have yours",
            "category": "jokes"
        },
        {
          "dePart": "Die Stimmen in meinem Kopf sagen, dass du mit mir sprechen willst",
          "enPart": "The voices in my head tell me, that you want to speak with me",
        "category": "jokes"
        },
        {
          "dePart": "Was möchtest du morgen zum Frühstück",
          "enPart": "What do you want for breakfast tomorrow",
        "category": "jokes"
        },
        {
          "dePart": "Du bist so schön, dass ich meine Pickup Line vergessen habe",
          "enPart": "You are so beautiful, that I forgot my Pickup Line",
        "category": "jokes"
        },
      {
        "dePart": "Warum ist sie nicht eingetreten",
        "enPart": "Why didn't she come in",
        "category": "derProcess"
      },
      {
        "dePart": "Wie kann ich denn verhaftet sein und gar auf diese Weise",
        "enPart": "But how can I be under arrest and how come it's like this",
        "category": "derProcess"
      },
      {
        "dePart": "Dieses Gesetz kenne ich nicht",
        "enPart": "I don't know this law",
        "category": "derProcess"
      },
      {
        "dePart": "Führen Sie mich zu Ihrem Vorgesetzten",
        "enPart": "Take me to your superior",
        "category": "derProcess"
      },
      {
        "dePart": "Es ist nicht üblich",
        "enPart": "That's not usual",
        "category": "derProcess"
      },
      {
        "dePart": "Ich meinte es niemals anders",
        "enPart": "I never meant it should be anything else",
        "category": "derProcess"
      },
      {
        "dePart": "Es war meine Pflicht",
        "enPart": "That was my duty",
        "category": "derProcess"
      },
      {
        "dePart": "Ich meine die Männer die heute früh hier waren",
        "enPart": "I mean the men who were here this morning",
        "category": "derProcess"
      },
      {
        "dePart": "ich wollte nur ein paar Worte mit ihr reden",
        "enPart": "I just wanted to have a few words with her",
        "category": "derProcess"
      },
      {
        "dePart": "Ich wollte ein paar Worte mit Ihnen sprechen wollen Sie mir das jetzt erlauben",
        "enPart": "I wanted to have a word with you if you would allow me",
        "category": "derProcess"
      },
      {
        "dePart": "Ich warte seit neun Uhr auf Sie",
        "enPart": "I've been waiting for you since nine o'clock",
        "category": "derProcess"
      },
      {
        "dePart": "Der Anlaß für das was ich Ihnen sagen will hat sich erst heute ergeben",
        "enPart": "The reason I need to speak to you only came up today",
        "category": "derProcess"
      },
      {
        "dePart": "Glauben Sie denn daß ich schuldlos bin",
        "enPart": "Do you believe then that I'm innocent",
        "category": "derProcess"
      },
      {
        "dePart": "Sehen Sie Sie haben nicht viel Erfahrung in Gerichtssachen",
        "enPart": "Listen you don't have much experience in legal matters",
        "category": "derProcess"
      },
      {
        "dePart": "Fräulein Bürstner saß auf der Ottomane und lachte wieder",
        "enPart": "Miss Bürstner sat on the ottoman and laughed again",
        "category": "derProcess"
      },
      {
        "dePart": "Der Herr fragt ob ein Tischler Lanz hier wohnt",
        "enPart": "The gentleman's asking if a joiner called Lanz lives here",
        "category": "derProcess"
      },
      {
        "dePart": "Sehr vernünftig aber es ist jetzt schon zu voll",
        "enPart": "Very sensible but it's too full already",
        "category": "derProcess"
      },
      {
        "dePart": "Es paßt zu allem anderen",
        "enPart": "That fits in with everything else",
        "category": "derProcess"
      },
      {
        "dePart": "Wenn es sich so verhält dann gibt es allerdings keine Hilfe",
        "enPart": "If that's how things are then there's nothing that can be done",
        "category": "derProcess"
      },
      {
        "dePart": "Sie scheinen sich ja viele Mühe zu geben",
        "enPart": "You certainly seem to be going to a lot of effort",
        "category": "derProcess"
      },
      {
        "dePart": "Ich werde nicht warten und Sie müssen jetzt mit mir gehen",
        "enPart": "I will not wait and you must come with me now",
        "category": "derProcess"
      },
      {
        "dePart": "Ich will mich nicht ausruhen",
        "enPart": "I don't want to rest",
        "category": "derProcess"
      },
      {
        "dePart": "Frau Grubach kam sich recht machtlos vor",
        "enPart": "Mrs Grubach appeared quite powerless",
        "category": "derProcess"
      },
      {
        "dePart": "Aber sie soll doch zu Fräulein Bürstner übersiedeln",
        "enPart": "But she has to move in with Miss Bürstner",
        "category": "derProcess"
      },
      {
        "dePart": "Sie haben ja fast nichts angerührt",
        "enPart": "But you've barely touched it",
        "category": "derProcess"
      },
      {
        "dePart": "Wir werden uns ja ganz nackt ausziehen müssen",
        "enPart": "We're going to have to strip off totally naked",
        "category": "derProcess"
      },
      {
        "dePart": "Es schreit nur ein Hund auf dem Hof",
        "enPart": "It's only a dog yelping in the yard",
        "category": "derProcess"
      },
      {
        "dePart": "Es betrifft mich nicht und es ist nicht mein Geheimnis",
        "enPart": "It's not my business and it's not my secrets",
        "category": "derProcess"
      },
      {
        "dePart": "Ja aber woher wissen Sie denn etwas über mich und meinen Prozeß",
        "enPart": "Yes but how is it that you know anything about me and my case",
        "category": "derProcess"
      },
      {
        "dePart": "Du fragst wie ein Kind",
        "enPart": "You're asking questions like a child",
        "category": "derProcess"
      },
      {
        "dePart": "Es klang so unwiderleglich daß Kafka gar nicht antwortete",
        "enPart": "It sounded so indisputable that Kafka gave no answer at all",
        "category": "derProcess"
      },
      {
        "dePart": "Und er zeigte in eine dunkle Zimmerecke",
        "enPart": "And he pointed into a dark corner of the room",
        "category": "derProcess"
      },
      {
        "dePart": "Kafka sagte und zeigte mit einem Finger auf das Bild",
        "enPart": "Kafka said and pointed to the picture with one finger",
        "category": "derProcess"
      },
      {
        "dePart": "Ich denke wahrscheinlich sogar zu wenig an ihn",
        "enPart": "I probably even think too little about it",
        "category": "derProcess"
      },
      {
        "dePart": "Ich nehme mein Wort nicht zurück",
        "enPart": "I'm not going to take my word back on that",
        "category": "derProcess"
      },
      {
        "dePart": "Sie haben mich geküßt",
        "enPart": "You kissed me",
        "category": "derProcess"
      },
      {
        "dePart": "Und er öffnete die Tür die zu dem Vorzimmer seines Büros führte",
        "enPart": "And he opened the door leading to the ante-room of his own office",
        "category": "derProcess"
      },
      {
        "dePart": "Sie nickte und fragte ihrerseits",
        "enPart": "She nodded and asked in reply",
        "category": "derProcess"
      },
      {
        "dePart": "Wie heißt dieser Richter",
        "enPart": "What's the name of this judge",
        "category": "derProcess"
      },
      {
        "dePart": "Sie sind wohl ein Vertrauensmann des Gerichtes",
        "enPart": "I take it you must be a trustee of the court",
        "category": "derProcess"
      },
      {
        "dePart": "Das ist die Hauptsache",
        "enPart": "That's the main thing",
        "category": "derProcess"
      },
      {
        "dePart": "Der Maler nickte als verstehe er Kafkas Unbehagen sehr gut",
        "enPart": "The painter nodded as if he understood Kafka's discomfort very well",
        "category": "derProcess"
      },
      {
        "dePart": "Könnte man nicht das Fenster öffnen",
        "enPart": "Could we not open the window",
        "category": "derProcess"
      },
      {
        "dePart": "Und der Prozeß beginnt von neuem",
        "enPart": "And does the trial start over again",
        "category": "derProcess"
      },
      {
        "dePart": "Sie haben den Kern der Sache erfaßt",
        "enPart": "You've understand the essence of the things",
        "category": "derProcess"
      },
      {
        "dePart": "Ich nehme auch dieses noch",
        "enPart": "I'll take this one too",
        "category": "derProcess"
      },
      {
        "dePart": "Das erste Läuten an der Tür war wie gewöhnlich zwecklos",
        "enPart": "As usual there was no response to the ring at the door",
        "category": "derProcess"
      },
      {
        "dePart": "Leni ist Ihre Geliebte",
        "enPart": "Is Leni your lover",
        "category": "derProcess"
      },
      {
        "dePart": "Sie sehen glaubwürdig aus",
        "enPart": "You look honest enough",
        "category": "derProcess"
      },
      {
        "dePart": "Ist das Ihr wirklicher Name",
        "enPart": "Is that your real name",
        "category": "derProcess"
      },
      {
        "dePart": "Ich dachte Sie könnten Grund haben Ihren Namen zu verschweigen",
        "enPart": "I thought you might have some reason to keep your name secret",
        "category": "derProcess"
      },
      {
        "dePart": "Es ist ein hoher Richter ",
        "enPart": "He's an important judge",
        "category": "derProcess"
      },
      {
        "dePart": "Sie wissen doch wo sich Leni versteckt hat",
        "enPart": "You know where Leni's hidden do you",
        "category": "derProcess"
      },
      {
        "dePart": "Warum haben Sie das nicht gleich gesagt",
        "enPart": "Why didn't you say that immediately",
        "category": "derProcess"
      },
      {
        "dePart": "Sie glauben wohl sehr schlau zu sein",
        "enPart": "You really think you're very clever",
        "category": "derProcess"
      },
      {
        "dePart": "Komm ins Arbeitszimmer ich werde dir alles erklären",
        "enPart": "Come into the office I'll explain everything to you",
        "category": "derProcess"
      },
      {
        "dePart": "Ich wüßte auch nicht warum Sie eifersüchtig sein sollten",
        "enPart": "I don't even know why you might be jealous",
        "category": "derProcess"
      },
      {
        "dePart": "Melde mich zuerst an",
        "enPart": "Tell him I'm here first",
        "category": "derProcess"
      },
      {
        "dePart": "Sind Sie schon ein alter Klient des Advokaten",
        "enPart": "Have you been a client of the lawyer's for a long time",
        "category": "derProcess"
      },
      {
        "dePart": "Wieviel Jahre vertritt er Sie denn schon",
        "enPart": "How many years has he been representing you so far then",
        "category": "derProcess"
      },
      {
        "dePart": "Nein ich bin kein Verräter",
        "enPart": "No I don't betray people",
        "category": "derProcess"
      },
      {
        "dePart": "Ich verhandle gerade noch mit einem sechsten",
        "enPart": "I'm even negotiating with a sixth one",
        "category": "derProcess"
      },
      {
        "dePart": "Aber wozu brauchen Sie denn soviel Advokaten",
        "enPart": "But why do you need so many lawyers",
        "category": "derProcess"
      },
      {
        "dePart": "Wollen Sie mir das nicht erklären",
        "enPart": "Would you mind explaining that to me",
        "category": "derProcess"
      },
      {
        "dePart": "Wieso wissen Sie denn daß ich dort war",
        "enPart": "How do you know I've been there then",
        "category": "derProcess"
      },
      {
        "dePart": "Ich war gerade im Wartezimmer als Sie durchgingen",
        "enPart": "I was in the waiting room myself when you went through",
        "category": "derProcess"
      },
      {
        "dePart": "Wie abergläubisch diese Leute sind",
        "enPart": "These people are so superstitious",
        "category": "derProcess"
      },
      {
        "dePart": "Was für einen Fortschritt wollten Sie denn sehen",
        "enPart": "And what sort of progress had you been hoping for",
        "category": "derProcess"
      },
      {
        "dePart": "Sie dachten damals also nicht an die großen Advokaten",
        "enPart": "So you weren't thinking about the great lawyers at that time",
        "category": "derProcess"
      },
      {
        "dePart": "Er wollte daß ich ihm von meinem Prozeß erzähle",
        "enPart": "He wanted me to tell him about my trial",
        "category": "derProcess"
      },
      {
        "dePart": "Hast du mich angemeldet",
        "enPart": "Have you told him I'm here",
        "category": "derProcess"
      },
      {
        "dePart": "Er schläft hier öfters",
        "enPart": "He often sleeps here",
        "category": "derProcess"
      },
      {
        "dePart": "Es ist sehr vorteilhaft",
        "enPart": "It has many advantages",
        "category": "derProcess"
      },
      {
        "dePart": "Ich gehe bald wieder weg",
        "enPart": "I'll be leaving again soon",
        "category": "derProcess"
      },
      {
        "dePart": "Es schien mir daß Sie die Tür abgesperrt haben",
        "enPart": "It seemed to me that you locked the door",
        "category": "derProcess"
      },
      {
        "dePart": "War sie wieder zudringlich",
        "enPart": "Was she being importunate again",
        "category": "derProcess"
      },
      {
        "dePart": "du kommst ungelegen",
        "enPart": "you've come at a bad time",
        "category": "derProcess"
      },
      {
        "dePart": "Wollt Ihr daß ich weggehe",
        "enPart": "Would you like me to go away again",
        "category": "derProcess"
      },
      {
        "dePart": "Und außer mir",
        "enPart": "And who besides me",
        "category": "derProcess"
      },
      {
        "dePart": "Warum zögerst du denn",
        "enPart": "What makes you so wary about it",
        "category": "derProcess"
      },
      {
        "dePart": "Was hat er während des ganzen Tages getan",
        "enPart": "And what has he been doing all day",
        "category": "derProcess"
      },
      {
        "dePart": "Dieses Kapitel wurde nicht vollendet",
        "enPart": "This chapter was left unfinished",
        "category": "derProcess"
      },
      {
        "dePart": "Ja man hat mich davon verständigt",
        "enPart": "Yes so I have been informed",
        "category": "derProcess"
      },
      {
        "dePart": "Es ist ein Album der städtischen Sehenswürdigkeiten",
        "enPart": "It's an album of the city's tourist sights",
        "category": "derProcess"
      },
      {
        "dePart": "Weißt du daß dein Prozeß schlecht steht",
        "enPart": "Do you know your case is going badly",
        "category": "derProcess"
      },
      {
        "dePart": "Wie stellst du dir das Ende vor",
        "enPart": "How do you imagine it will end",
        "category": "derProcess"
      },
      {
        "dePart": "Das ist richtig aber so pflegen die Schuldigen zu reden",
        "enPart": "That is true but that is how the guilty speak",
        "category": "derProcess"
      },
      {
        "dePart": "Ich habe kein Vorurteil gegen dich",
        "enPart": "I make no presumptions about you",
        "category": "derProcess"
      },
      {
        "dePart": "Hast du ein wenig Zeit für mich",
        "enPart": "Can you spare me a little of your time",
        "category": "derProcess"
      },
      {
        "dePart": "Täusche dich nicht",
        "enPart": "Don't fool yourself",
        "category": "derProcess"
      },
      {
        "dePart": "Die Lüge wird zur Weltordnung gemacht",
        "enPart": "The lie made into the rule of the world",
        "category": "derProcess"
      },
      {
        "dePart": "Ich kann mich aber im Dunkel allein nicht zurechtfinden",
        "enPart": "But I can't find my way round in this darkness by myself",
        "category": "derProcess"
      },
      {
        "dePart": "Willst du nicht noch etwas von mir",
        "enPart": "Is there anything else you want from me",
        "category": "derProcess"
      },
      {
        "dePart": "Sieh du zuerst ein wer ich bin",
        "enPart": "First you need to understand who I am",
        "category": "derProcess"
      },
      {
        "dePart": "Sie sind also für mich bestimmt",
        "enPart": "You've come for me then have you",
        "category": "derProcess"
      },
      {
        "dePart": "Ich gehe nicht weiter",
        "enPart": "I will go no further",
        "category": "derProcess"
      }
    ]
}

import J from "./commonReact.js"

let initOnce = R.once(()=>{
    J.emitter.emit("init")
})
let data = J.shuffle(R.filter(J.isUniq, dataRaw.data))
let currentId

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0,
            globalIndex: 0,
            globalData: data,
            data:data[0],
            flagReady: false,
            memeStyleContainer:{},
            singleWordBoxHeight:"10px",
            visibleArr: [],
            hiddenArr: [],
            referenceArr: [],
            buttonText: J.buttonTextShowAnswer,
            buttonClassName: J.bulButtonInit,
            buttonStyle: {}
        }
        this.willHandleClick = this.willHandleClick.bind(this)
        this.willHandleButton = this.willHandleButton.bind(this)
    }
    componentDidMount() {
        J.emitter.on("init",()=>{
            let imageHeight = J.getHeightPx(25)
            let imageWidth = J.getWidthPx(95)
            let imageUrl = `https://unsplash.it/${imageWidth}/${imageHeight}/?random&more=${J.randomSeed()}`
            let memeStyleContainer = {
                width: `${imageWidth}px`,
                height: `${imageHeight}px`,
		        backgroundImage: `url("${imageUrl}")`,
                fontSize: `${J.getHeightPx(3)}px`
		    }
            let hiddenArr = []
            let visibleArr = []
            let referenceArr = R.split(" ",this.state.data.dePart)
            let visibleArrRaw = J.shuffle( R.split(" ",this.state.data.dePart))
            let singleWordBoxHeight = J.divide(J.getHeightPx(55), referenceArr.length)
            visibleArrRaw.map((val)=>{
                visibleArr.push({
                    name: val,
                    customStyle: {
                        fontSize: `${J.getPercent(55,singleWordBoxHeight)}px`
                    }
                })
            })
            this.setState({
                singleWordBoxHeight: `${J.getPercent(55,singleWordBoxHeight)}px`,
                visibleArr: visibleArr,
                hiddenArr: hiddenArr,
                referenceArr: referenceArr,
                memeStyleContainer: memeStyleContainer,
                buttonText: J.buttonTextShowAnswer,
                buttonClassName: J.bulButtonInit,
                buttonStyle: {fontSize: `${J.getHeightPx(2.3)}px`, height: `${J.getHeightPx(2.4)}px`}
            })
        })
        J.emitter.on("correct",()=>{
            let visibleArrFuture = R.compose(R.filter(val=>R.prop("name",val)!==currentId))(this.state.visibleArr)
            this.setState({
                visibleArr: visibleArrFuture,
                hiddenArr: R.append(
                    {
                        name: currentId,
                        customStyle: {fontSize: this.state.singleWordBoxHeight}
                },this.state.hiddenArr),
                index: this.state.index+1
            })
        })
        J.emitter.on("wrong",()=>{
            let elementSource = document.getElementById(currentId)
            elementSource.classList.add("wrongAnswer")
            setTimeout(()=>{
                elementSource.classList.remove("wrongAnswer")
            },1000)
        })
        J.emitter.on("last word",()=>{
            this.setState({
                flagReady: true,
                buttonText: J.buttonTextNext,
                buttonClassName: J.bulButtonNext
            },()=>{
                J.emitter.emit("correct")
            })
        })
        J.emitter.on("show answer",()=>{
            let singleWordBoxHeight = {fontSize: this.state.singleWordBoxHeight}
            this.setState({
                visibleArr: [],
                hiddenArr: R.compose(R.map((val)=>{return {name: val, customStyle: singleWordBoxHeight}}))(this.state.referenceArr),
                flagReady:true,
                buttonText: J.buttonTextNext,
                buttonClassName: J.bulButtonNext
            })
        })
        J.emitter.on("next",()=>{
            let willBeIndex
            if (this.state.globalIndex === this.state.globalData.length - 1) {
                willBeIndex = 0
            } else {
                willBeIndex = this.state.globalIndex + 1
            }
            this.setState({
                data:this.state.globalData[ willBeIndex ],
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
    }
    willHandleClick (event) {
        if(this.state.flagReady){
            return null
        }
        currentId = event.currentTarget.id
        if(currentId===this.state.referenceArr[this.state.index]){
            if(this.state.index+1===this.state.referenceArr.length){
                J.emitter.emit("last word")
            }else{
                J.emitter.emit("correct")
            }
        }else{
            J.emitter.emit("wrong")
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
    <div>
        <div className="box">
             <div style={this.state.memeStyleContainer} >
                <div className="meme has-text-centered">
                    {this.state.data.enPart}
                </div>
            </div>
                <div className="has-text-centered paddingLR">
                    <a style={this.state.buttonStyle} className={`${this.state.buttonClassName} buttonStyle`} onClick={this.willHandleButton}>{this.state.buttonText}</a>
                </div>
        </div>
        <div className="box has-text-centered">
            <FlipMove easing="ease-out" duration="300" >
                {
                    this.state.visibleArr.map((val)=>{
                    return <div key={`${val.name}-key`} style={val.customStyle} className="column singleWord" id={val.name} onClick={this.willHandleClick}>{val.name}</div>
                })
            }
            </FlipMove>
        </div>
        <div className="box has-text-centered">
            <FlipMove easing="ease-in" duration="700" >
                {
                    this.state.hiddenArr.map((val)=>{
                    return <div key={`${val.name}-key`} style={val.customStyle} className="column singleWordCorrect">{val.name}</div>
                })
            }
            </FlipMove>
        </div>
	</div>
    )}
}

ReactDOM.render(<App />, document.getElementById('reactHook'))
