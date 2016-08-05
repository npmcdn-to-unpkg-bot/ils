"use strict"
import React,{ Component } from "react"
import R from "ramda"
import J from "./components/commonReact.js"
import words from "./components/words.js"
screenLog.init()
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
let initData = {
    deEn: {
        dePart:"",
        enPart: ""
    },
    phrase: [],
    phraseTranslated: [],
    synonym: [],
    synonymTranslated: []
}

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            data: initData,
            deWord: "",
            enWord: "",
            enPart: "",
            dePart: "",
            paginationIndex: 0,
            paginationLimit: 0,
            paginationPerPageCount: 11
        }
        this.handleDePartInput = this.handleDePartInput.bind(this)
        this.handleEnPartInput = this.handleEnPartInput.bind(this)
        this.handleDeWordInput = this.handleDeWordInput.bind(this)
        this.handleEnWordInput = this.handleEnWordInput.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleReady = this.handleReady.bind(this)
        this.handlePrevNavigation = this.handlePrevNavigation.bind(this)
        this.handleNextNavigation = this.handleNextNavigation.bind(this)
        this.handleRequestNext = this.handleRequestNext.bind(this)
    }
    componentDidMount(){
        J.emitter.on("init", ()=>{
            J.postData(`${J.hapi}/readRandom/translateDraft`).then(data=>{
                J.log(data)
                let dataFuture = {}
                let enWord = ""
                let dePart = ""
                let enPart = ""
                dataFuture.deEn = data.deEn
                dataFuture.phrase = uniq(data.phrase,"dePart")
                dataFuture.synonym = uniq(data.synonym,"dePart")
                dataFuture.phraseTranslated = uniq(data.phraseTranslated,"dePart")
                dataFuture.synonymTranslated = uniq(data.synonymTranslated,"dePart")
                let paginationLimit = R.apply(Math.max, [dataFuture.phrase.length, dataFuture.synonym.length, dataFuture.phraseTranslated.length, dataFuture.synonymTranslated.length])
                this.setState({data: dataFuture, deWord: data.deEn.dePart, paginationLimit, enWord, dePart, enPart})
            })
        })
        J.emitter.on("ready", ()=>{
            let willSend = {}
            willSend.category = "draft"
            willSend.deWord = this.state.deWord.trim()
            willSend.enWord = this.state.enWord.trim()
            willSend.dePart = J.addFullstop(this.state.dePart.trim())
            willSend.enPart = J.addFullstop(this.state.enPart.trim())
            //J.postData(`${J.admin}/newEntry`, JSON.stringify({data: willSend})).then(incoming =>{
            J.postData(`${J.hapi}/test`, willSend).then(incoming =>{
                J.emitter.emit("init")
            })
        })
        initOnce()
    }
    handleReady (event) {
        J.emitter.emit("ready")
    }
    handleAdd (value, event) {
        let obj = {}
        obj["dePart"] = value["dePart"]
        if(event==="both"){
            obj["enPart"] = value["enPart"]
        }
        this.setState(obj)
    }
    handleDeWordInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("ready")
        }
        this.setState({
            deWord: event.target.value
        })

    }
    handleEnWordInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("ready")
        }
        this.setState({
            enWord: event.target.value
        })
    }
    handleDePartInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("ready")
        }
        this.setState({
            dePart: event.target.value
        })
        if(event.target.value.length>68){
            console.log(`TOO LONG - ${event.target.value.length}`, 5)
        }
    }
    handleEnPartInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("ready")
        }
        this.setState({
            enPart: event.target.value
        })
        if(event.target.value.length>68){
            console.log(`TOO LONG - ${event.target.value.length}`, 5)
        }
    }
    handleNextNavigation() {
        if ((this.state.paginationIndex + this.state.paginationPerPageCount) < this.state.paginationLimit) {
            this.setState({
                paginationIndex: this.state.paginationIndex + this.state.paginationPerPageCount
            })
        }
    }
    handlePrevNavigation() {
        if ((this.state.paginationIndex - this.state.paginationPerPageCount) >= 0) {
            this.setState({
                paginationIndex: this.state.paginationIndex - this.state.paginationPerPageCount
            })
        }
    }
    handleRequestNext() {
        J.emitter.emit("init")
    }
    render () {
        return(
    <div>
        <div className="columns box has-text-centered is-fullwidth is-gapless is-narrow is-marginless">
            <div className="column is-2 is-fullwidth">
                <input className="deWordInput" type="text" value={this.state.deWord} placeholder="deWord" spellCheck="true" size={this.state.deWord.length>10?this.state.deWord.length:10} onChange={this.handleDeWordInput} onKeyPress={this.handleDeWordInput}/>
            </div>
            <div className="column is-2 is-marginless">
                <input className="enWordInput" type="text" value={this.state.enWord} placeholder="enWord" spellCheck="true" size={this.state.enWord.length>10?this.state.enWord.length:10} onChange={this.handleEnWordInput} onKeyPress={this.handleEnWordInput}/>
            </div>
            <div className="column is-4 is-marginless">
                <input className="deWordInput" type="text" value={this.state.dePart} placeholder="dePart" spellCheck="true" size={this.state.dePart.length>10?this.state.dePart.length:10} onChange={this.handleDePartInput} onKeyPress={this.handleDePartInput}/>
            </div>
            <div className="column is-4 is-marginless">
                <input className="enWordInput" type="text" value={this.state.enPart} placeholder="enPart" spellCheck="true" size={this.state.enPart.length>10?this.state.enPart.length:10} onChange={this.handleEnPartInput} onKeyPress={this.handleEnPartInput}/>
            </div>
        </div>
        <div className="columns box has-text-centered is-fullwidth is-gapless is-narrow is-marginless">
            <div className="column is-2">
                <a className="button is-small is-primary is-inverted" onClick={this.handleRequestNext}><span className="icon"><i className="fa fa-step-forward"></i></span></a>
                <a className="button is-primary is-inverted is-small" onClick={this.handleReady}><span className="icon"><i className="fa fa-check"></i></span></a>
                <a className="button is-success is-inverted is-small" onClick={this.handlePrevNavigation}><span className="icon"><i className="fa fa-chevron-left"></i></span></a>
                <a className="button is-success is-inverted is-small" onClick={this.handleNextNavigation}><span className="icon"><i className="fa fa-chevron-right"></i></span></a>
            </div>
            <div className="column is-2 secondRow">
                {this.state.data.deEn.dePart}
            </div>
            <div className="column is-6 secondRow">
                {`${R.compose(R.join(","),R.take(6),R.split(","))(this.state.data.deEn.enPart)}|${R.compose(R.join(","),R.takeLast(6),R.split(","))(this.state.data.deEn.enPart)}`}
            </div>
        </div>
        <div className="columns box has-text-centered is-fullwidth is-gapless is-narrow is-marginless">
            <div className="column is-8 has-text-left">
            {R.values(this.state.data.phrase).map((val,key)=>{
                if(R.gt(key,this.state.paginationIndex)&&R.lte(key,this.state.paginationIndex+this.state.paginationPerPageCount)){
                    return <div className={`secondRow${key%2===0?"Odd":""}`} key={`${key}-phraseTranslatedDePart`}>
                    <a onClick={()=>{this.handleAdd(val)}}><span className="icon is-small"><i className="fa fa-check"></i></span></a>
                    {`${R.take(140,val.dePart)}`}</div>
                }
            })}
            </div>
            <div className="column is-2 has-text-left">
            {R.values(this.state.data.synonymTranslated).map((val,key)=>{
                if(R.gt(key,this.state.paginationIndex)&&R.lte(key,this.state.paginationIndex+this.state.paginationPerPageCount)){
                    return <div className={`secondRow${key%2===0?"Odd":""}`} key={`${key}-phraseTranslatedEnPart`}>
                    {`${R.take(50,val.dePart)}`}</div>
                }
            })}
            </div>
            <div className="column is-2 has-text-left">
            {R.values(this.state.data.synonymTranslated).map((val,key)=>{
                if(R.gt(key,this.state.paginationIndex)&&R.lte(key,this.state.paginationIndex+this.state.paginationPerPageCount)){
                    return <div className={`secondRow${key%2===0?"Odd":""}`} key={`${key}-phraseTranslatedEnPart`}>
                    {`${R.take(50,val.enPart)}`}</div>
                }
            })}
            </div>
        </div>
        <div className="columns box is-fullwidth">
            <div className="column is-2 has-text-left">
            {R.values(this.state.data.synonym).map((val,key)=>{
                if(R.gt(key,this.state.paginationIndex)&&R.lte(key,this.state.paginationIndex+this.state.paginationPerPageCount)){
                    return <div className={`firstRow${key%2===0?"Odd":""}`} key={`${key}-synonym`}>
                    {`${R.take(34,val.dePart)}`}</div>
                }
            })}
            </div>
            <div className="column is-5 has-text-right">
            {R.values(this.state.data.phraseTranslated).map((val,key)=>{
                if(R.gt(key,this.state.paginationIndex)&&R.lte(key,this.state.paginationIndex+this.state.paginationPerPageCount)){
                    return <div className={`secondRow${key%2===0?"Odd":""}`} key={`${key}-phraseTranslatedDePart`}>
                    <a onClick={()=>{this.handleAdd(val,"both")}}><span className="icon is-small"><i className="fa fa-check"></i></span></a>
                    {`${R.take(92,val.dePart)}`}</div>
                }
            })}
            </div>
            <div className="column is-5 has-text-left">
            {R.values(this.state.data.phraseTranslated).map((val,key)=>{
                if(R.gt(key,this.state.paginationIndex)&&R.lte(key,this.state.paginationIndex+this.state.paginationPerPageCount)){
                    return <div className={`secondRow${key%2===0?"Odd":""}`} key={`${key}-phraseTranslatedEnPart`}>
                    {`${R.take(92,val.enPart)}`}</div>
                }
            })}
            </div>
        </div>
	</div>
    )}
}
