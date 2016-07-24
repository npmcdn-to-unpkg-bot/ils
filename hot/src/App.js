"use strict"
import React,{ Component } from "react"
import R from "ramda"
import LazyLoad from 'react-lazyload'
import J from "./components/commonReact.js"
import words from "./components/words.js"
let store = {words: [], dePart:""}
function nextWord(){
    let willReturn
    let flag = true
    J.shuffle(words).map(val=>{
        if(flag&&val.indexOf(store.words)!==-1){
            willReturn = val
            flag = false
            store.words.push(val)
        }
    })
    return willReturn
}
function uniq(arr,prop){
    let willReturn = []
    return R.compose(R.sort((a,b)=>b.dePart.length-a.dePart.length),R.filter(val=>{
        if(R.indexOf(val[prop], willReturn)&&val[prop].length>2){
            willReturn.push(val[prop])
            return true
        }else{return false}
    }),R.map(val=>{
        return R.merge(val,{dePart: R.replace(/[0-9]/,"",val.dePart)})
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
            willSend: {},
            deWord: "",
            enWord: "",
            enPart: "",
            dePart: "",
            paginationIndex: 0,
            paginationPerPageCount: 5,
        }
        this.handleDeInput = this.handleDeInput.bind(this)
        this.handleEnInput = this.handleEnInput.bind(this)
        this.handleDeWordInput = this.handleDeWordInput.bind(this)
        this.handleEnWordInput = this.handleEnWordInput.bind(this)
        this.handleAdd = this.handleAdd.bind(this)
        this.handleReady = this.handleReady.bind(this)
    }
    componentDidMount(){
        J.emitter.on("init", ()=>{
            J.log(`${J.host}/readDataFile/${nextWord()}`)
            J.getData(`${J.host}/readDataFile/${nextWord()}`).then(data=>{
                let dataFuture = {}
                dataFuture.deEn = data.deEn
                dataFuture.phrase = uniq(data.phrase,"dePart")
                dataFuture.synonym = uniq(data.synonym,"dePart")
                dataFuture.phraseTranslated = uniq(data.phraseTranslated,"dePart")
                dataFuture.synonymTranslated = uniq(data.synonymTranslated,"dePart")
                this.setState({data: dataFuture, deWord: data.deEn.dePart})
            })
        })
        J.emitter.on("add", ()=>{
            J.log(store.dePart)
        })
        initOnce()
    }
    handleReady (event) {
        console.log(event.target)
    }
    handleAdd (event, value) {
        console.log(event)
        let obj = {}
        obj[event] = value[event]
        J.log(obj)
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
    handleDeInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("ready")
        }
        this.setState({
            data: R.merge(this.state.data,{dePart: event.target.value})
        })
        if(event.target.value.length>68){
            this.log(`TOO LONG - ${event.target.value.length}`, 5)
        }
    }
    handleEnInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("ready")
        }
        this.setState({
            data: R.merge(this.state.data,{enPart: event.target.value})
        })
        if(event.target.value.length>68){
            this.log(`TOO LONG - ${event.target.value.length}`, 5)
        }
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
                <input className="deWordInput" type="text" value={this.state.dePart} placeholder="dePart" spellCheck="true" size={this.state.dePart.length>10?this.state.dePart.length:10} onChange={this.handleDePartInput} onKeyPress={this.handleEnWordInput}/>
            </div>
            <div className="column is-4 is-marginless">
                <input className="enWordInput" type="text" value={this.state.enPart} placeholder="enPart" spellCheck="true" size={this.state.dePart.length>10?this.state.dePart.length:10} onChange={this.handleDePartInput} onKeyPress={this.handleEnWordInput}/>
            </div>
        </div>
        <div className="columns box has-text-centered is-fullwidth is-gapless is-narrow is-marginless">
            <div className="column is-2">
                <a className="button is-primary is-inverted" onClick={this.handleReady}><span className="icon"><i className="fa fa-check"></i></span></a>
            </div>
            <div className="column is-2">
                {this.state.data.deEn.dePart}
            </div>
            <div className="column is-6">
                {`${R.compose(R.join(" "),R.take(6),R.split(","))(this.state.data.deEn.enPart)}|${R.compose(R.join(" "),R.takeLast(6),R.split(","))(this.state.data.deEn.enPart)}`}
            </div>
        </div>
        <div className="columns box is-fullwidth is-gapless is-narrow is-marginless">
            <div className="column is-2 has-text-left">
                {R.values(this.state.data.synonym).map((val,key)=>{
                    if(key<this.state.paginationPerPageCount){
                        return <div className="tag is-outlined" key={key} onClick={()=>{this.handleAdd("dePart",val)}}>
                        {`${R.take(20,val.dePart)}`}</div>
                    }
                })}
            </div>
            <div className="column is-5 has-text-left">
            {R.values(this.state.data.phraseTranslated).map((val,key)=>{
                if(key<this.state.paginationPerPageCount){
                    return <div className="tag is-dark" key={key}>
                    <a className="button is-primary is-inverted" onClick={()=>{this.handleAdd("both",val)}}><span className="icon is-small"><i className="fa fa-check"></i></span></a>
                    {val.dePart}</div>
                }
            })}
            </div>
        </div>
        <div className="columns box has-text-centered is-fullwidth is-gapless is-narrow is-marginless">
        </div>
	</div>
    )}
}
