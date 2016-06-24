"use strict"
import React,{ Component } from"react"
import* as R from"ramda"
const Griddle = require("griddle-react")

const winWidthIs = window.innerWidth * 1
const winHeightIs = window.innerHeight * 1
const singleGridInPxs = Math.floor(winWidthIs / 12)
const outerHalf = Math.floor(winWidthIs / 2)
const outerQuorter = Math.floor(winWidthIs / 4)
const topGitter = Math.floor(winWidthIs / 33)
const heightInPxs = Math.floor(winHeightIs / 12)
const eighter = Math.floor(singleGridInPxs / 8)
const eighterHeight = Math.floor(heightInPxs / 8)
const quarter = Math.floor(singleGridInPxs / 4)
const quarterHeight = Math.floor(heightInPxs / 4)
const halfer = Math.floor(singleGridInPxs / 2)
const halferHeight = Math.floor(window.innerHeight / 24)

let immutableMap = Immutable.Map({})
let immutableStack = Immutable.Stack([])

let firstData = {
    dePart:"Ich brauche mehr Zeit diese Frage zu antworten",
    enPart:"i need more time to answer this question",
    clues: {
        "Ich": false,
        "brauche": ["suchen"],
        "mehr": ["wenig","viel"],
        "Zeit": false,
        "diese": false,
        "Frage": ["Stellung","Antwort"],
        "zu": false,
        "antworten": ["die Lossung"]
    },
    alt: {
        dePart: "Ich brauche mehr Zeit diese Frage zu ********",
        deWord: "antworten",
        clues: ["die Lossung"]
    },
    fillerCloud: [
        "wenn","mehr","der Zustand","die Gelegenheit"
    ],
    image: "cat.jpg"
}

let secondData = {
}

let mockedData = { translation:
   [ { dePart: "schnell",enPart: "fast" },
     { dePart: "schnell",enPart: "quick" },
     { dePart: "schnell",enPart: "rapid" },
     { dePart: "schnell",enPart: "snap" },
     { dePart: "schnell",enPart: "speedy" },
     { dePart: "schnell",enPart: "swift" } ],
  related:
   [ { dePart: "dalli",enPart: "quick" },
     { dePart: "express",enPart: "quickly" },
     { dePart: "flink",enPart: "swiftly" },
     { dePart: "flott",enPart: "swiftly" },
     { dePart: "flugs",enPart: "speedily" },
     { dePart: "prompt",enPart: "swiftly" },
     { dePart: "rasch",enPart: "quickly" },
     { dePart: "schnell",enPart: "langsam (Antonym)" },
     { dePart: "schnell",enPart: "unmittelbar" },
     { dePart: "schnell",enPart: "Tempo" },
     { dePart: "schnell",enPart: "bald" },
     { dePart: "schnell",enPart: "eilends" },
     { dePart: "schnell",enPart: "flugs" },
     { dePart: "schnell",enPart: "gleich" },
     { dePart: "schnell",enPart: "kurzerhand" },
     { dePart: "schnell",enPart: "schnellstens" },
     { dePart: "schnell",enPart: "sofort" },
     { dePart: "schnell",enPart: "einfach" },
     { dePart: "schnell",enPart: "schleunigst" },
     { dePart: "schnell",enPart: "los" },
     { dePart: "schnell",enPart: "auf dem schnellsten Wege" },
     { dePart: "schnell",enPart: "auf der Stelle" },
     { dePart: "schnell",enPart: "auf Windesflügeln" },
     { dePart: "schnell",enPart: "binnen kurzem" },
     { dePart: "schnell",enPart: "schnell" },
     { dePart: "schnell",enPart: "quickly" },
     { dePart: "schnell",enPart: "direkt" },
     { dePart: "schnell",enPart: "gerade" },
     { dePart: "schnell",enPart: "geradewegs" },
     { dePart: "schnell",enPart: "geradezu" },
     { dePart: "schnell",enPart: "geradlinig" },
     { dePart: "schnell",enPart: "gradlinig" },
     { dePart: "schnell",enPart: "schleunig" },
     { dePart: "zusehends",enPart: "rapidly" } ],
  examples:
   [ { dePart: "(mach) schnell!",
       enPart: "hurry up!, get a move on!, step on it!" },
     { dePart: "an der Grenze ist es schnell gegangen",
       enPart: "things went very quickly at the border" },
     { dePart: "auf schnellstem Wege",
       enPart: "as quickly as possible, by the quickest possible means" },
     { dePart: "das erfordert schnelles Handeln",
       enPart: "that calls for swift immediate action" },
     { dePart: "das geht mir zu schnell",
       enPart: "things are happening too fast for me for my liking" },
     { dePart: "das geht mir zu schnell",enPart: "I can’t keep up" },
     { dePart: "das geht nicht so schnell",
       enPart: "it can’t be done that quickly, it takes time" },
     { dePart: "das geht schnell",enPart: "it doesn't take long" },
     { dePart: "das geht schnell",
       enPart: "it doesn’t won’t take long" },
     { dePart: "das ging alles viel zu schnell",
       enPart: "it all happened much too quickly or fast" },
     { dePart: "das ging schnell",enPart: "that was quick" },
     { dePart: "das ist schnell gegangen!",
       enPart: "that was quick!" },
     { dePart: "das mache ich gleich, das geht schnell",
       enPart: "I'll do that now, it won't take long" },
     { dePart: "das sagt sich so schnell",
       enPart: "that's easy to say" },
     { dePart: "das werde ich so schnell nicht vergessen/wieder tun",
       enPart: "I won't forget that/do that again in a hurry" },
     { dePart: "das werden wir ganz schnell haben",
       enPart: "we’ll have that (done) in no time" },
     { dePart: "das werden wir schnell erledigt haben",
       enPart: "we'll soon have that finished" },
     { dePart: "das werden wir schnell sehen",
       enPart: "we'll soon see about that" },
     { dePart: "diese dünnen Gläser gehen schnell kaputt",
       enPart: "these thin glasses break easily" },
     { dePart: "ein Bußgeld für zu schnelles Fahren",
       enPart: "a fine for speeding" },
     { dePart: "ein schneller Blick",
       enPart: "a quick fleeting glance" },
     { dePart: "eine Forelle schnellte aus dem Wasser",
       enPart: "a trout leapt out of the water" },
     { dePart: "eine schnelle Entscheidung treffen",
       enPart: "make a quick decision" },
     { dePart: "eine schnelle Entscheidung treffen müssen",
       enPart: "have to make up one’s mind fast" },
     { dePart: "er begreift schnell",
       enPart: "he’s quick (on the uptake)" },
     { dePart: "er ist nicht gerade der Schnellste",
       enPart: "he’s not exactly quick on the uptake" },
     { dePart: "er ist sehr schnell mit seinem Urteil/seiner Kritik",
       enPart: "he's very quick to judge/to criticize" },
     { dePart: "er liest schnell",enPart: "he’s a fast reader" },
     { dePart: "es ist mit dem Patienten schnell gegangen",
       enPart: "it was all over quickly" },
     { dePart: "geh schneller!",enPart: "hurry up!" },
     { dePart: "ich gehe mal eben schnell zum Bäcker",
       enPart: "I’m just going to pop round to the baker’s zip out to the bakery" },
     { dePart: "ich gehe noch schnell beim Bäcker vorbei",
       enPart: "I'll just stop by at the baker's" },
     { dePart: "ich muss mir nur noch schnell die Haare kämmen",
       enPart: "I must just give my hair a quick comb" },
     { dePart: "ich muss schnell noch aufs Klo",
       enPart: "I have to visit the men’s room" },
     { dePart: "ich muss schnell noch aufs Klo",
       enPart: "I must just pay a quick visit" },
     { dePart: "in die Höhe schnellen",enPart: "shoot up, rocket" },
     { dePart: "in schneller Folge",
       enPart: "in quick rapid succession" },
     { dePart: "kannst du das vorher noch schnell machen?",
       enPart: "can you do that quickly first?" },
     { dePart: "komm schnell!",enPart: "come quick(ly)!" },
     { dePart: "nicht so schnell!",enPart: "not so fast!" },
     { dePart: "nicht so schnell!",
       enPart: "not so fast!, hang on!" },
     { dePart: "sag mal schnell, …",enPart: "tell me quickly, …" },
     { dePart: "schnell denken",enPart: "do some quick thinking" },
     { dePart: "schnell handeln",enPart: "act fast without delay" },
     { dePart: "schnell reich werden",enPart: "get rich quick" },
     { dePart: "schnell wirkend",enPart: "fast-acting" },
     { dePart: "schnelle Bedienung",
       enPart: "fast quick, prompt service" },
     { dePart: "schnelle Bedienung",
       enPart: "quick waiter waitress" },
     { dePart: "schneller als der Schall fliegen",
       enPart: "to fly faster than the speed of sound" },
     { dePart: "schneller geht’s bei mir nicht",
       enPart: "I can’t do it any faster (than this), I’m doing my best" },
     { dePart: "schneller ging es nicht",
       enPart: "I couldn’t do it any faster" },
     { dePart: "schneller Umsatz",
       enPart: "quick returns, fast turnover" },
     { dePart: "schneller werden",enPart: "pick up speed" },
     { dePart: "schneller werden",enPart: "get faster" },
     { dePart: "schnelles Geld (machen)",
       enPart: "(to make) a fast buck (inf)" },
     { dePart: "sein Atem ging schnell",
       enPart: "he was breathing fast" },
     { dePart: "sein Puls ging schnell",
       enPart: "his pulse was very fast" },
     { dePart: "sie hat schnell und richtig reagiert",
       enPart: "her reaction was really fast and right on" },
     { dePart: "sie ist schnell verärgert/beleidigt",
       enPart: "she is easily annoyed/she’s quick to take offence -se" },
     { dePart: "sie lernt unheimlich schnell",
       enPart: "she picks things up amazingly quickly" },
     { dePart: "sie wird schnell böse ⇒ sie ist schnell verärgert",
       enPart: "she loses her temper quickly" },
     { dePart: "so schnell wie möglich",
       enPart: "as quickly as possible" },
     { dePart: "sprich nicht so schnell!",
       enPart: "don’t talk so fast, slow down" },
     { dePart: "wie heißt er schnell noch?",
       enPart: "what’s his name again?" },
     { dePart: "wie schnell ist er die 100 Meter gelaufen?",
       enPart: "how fast did he run the 100 metres (Brit) or meters  (US)?" },
     { dePart: "wir wurden schnell bedient",
       enPart: "the service was fast, we got served fast" } ] }


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
        	let state = `${event.target.value}${event.key}`.trim().toLowerCase()
        console.log(state)
        if(event.key === "Enter") {
        }
    }
    	willHandleNextRequest (e) {
    }
    	willHandleAnswerRequest (e) {
    }
    render () {
        return(
    <div className="onlyContainer">
        <Griddle results={mockedData.translation} tableClassName="table" showFilter={false}
 showSettings={false} resultsPerPage={10} columns={["dePart","enPart"]}/>
 <Griddle results={mockedData.related} tableClassName="table" showFilter={false}
showSettings={false} resultsPerPage={40} columns={["dePart","enPart"]}/>
<Griddle results={mockedData.examples} tableClassName="table" showFilter={false}
showSettings={false} resultsPerPage={8} columns={["dePart","enPart"]}/>
	</div>
    )
    }
}
