"use strict"
import {React, ReactDOM} from "../../_inc/commonReact.js"
let Component = React.Component
import R from "ramda"
import LazyLoad from "react-lazyload"
import J from "../../_inc/commonReact.js"
import GermanOverall from "./components/germanOverall.js"
import Alert from "react-s-alert"
let initOnce = R.once(()=>{
    J.emitter.emit("init")
})
let initData = {
    "dePart": "",
    "enPart": ""
}
class Image extends Component {
    constructor (props) {
        super(props)
    }
    static get defaultProps () {
        return {
            handleImageClick: null,
            imageSrc: "",
            className: ""
        }
    }
    render () {
        let limit = 15
        let imageStyle = {
            minWidth: `${limit}vw`,
            height: "auto",
            maxHeight: `${limit - 2}vh`
        }
        return (
            <span className="column" onClick={this.props.handleImageClick}>
                <LazyLoad height={200} once={true}>
                <img src={this.props.imageSrc} style={imageStyle} className={this.props.className} />
                </LazyLoad>
            </span>
        )
    }
}
export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            deWord: "",
            enWord: "",
            searchImageKeyword: "",
            data: initData,
            searchImageResult: [],
            paginationIndex: 0,
            paginationPerPageCount: 20,
            notificationMessage: "",
            notificationState: false
        }
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.handleImageClick = this.handleImageClick.bind(this)
        this.handlePrevNavigation = this.handlePrevNavigation.bind(this)
        this.handleNextNavigation = this.handleNextNavigation.bind(this)
        this.handleReady = this.handleReady.bind(this)
        this.handleRemove = this.handleRemove.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.handleDeInput = this.handleDeInput.bind(this)
        this.handleEnInput = this.handleEnInput.bind(this)
        this.handleDeWordInput = this.handleDeWordInput.bind(this)
        this.handleEnWordInput = this.handleEnWordInput.bind(this)
    }
    componentDidMount() {
        J.emitter.on("init", ()=>{
            J.postData(`${J.ils}/imageless`, {}).then(data => {
                if (data.dePart.length > 72) {
                    setTimeout(()=>{
                        J.postData(`${J.ils}/removeMain`, {id: data.id}).then(()=>{
                            J.postData(`${J.ils}/imageless/count`, {}).then(imagelessCountData=>{
                                this.notify(imagelessCountData)
                                J.emitter.emit("init")
                            })
                        })
                    },300)
                }else{
                    data = J.addSingleProp("childSafetyFlag", true, data)
                    data = J.addSingleProp("imageSrc", false, data)
                    J.log(data)
                    let deWord = data.deWord === undefined ? "" : data.deWord
                    let enWord = data.enWord === undefined ? "" : data.enWord
                    let searchImageKeywordArr = J.stopWordsFilter(data.dePart)
                    searchImageKeywordArr = R.sort((a, b)=>{return a.length - b.length}, searchImageKeywordArr)
                    if (searchImageKeywordArr.length > 0) {
                        this.setState({
                            data,
                            paginationIndex: 0,
                            searchImageKeyword: J.removePunctuation(R.last(searchImageKeywordArr)).cleanStr,
                            deWord,
                            enWord
                        }, ()=>{
                            J.emitter.emit("searchImageFast")
                            setTimeout(()=>{
                                this.setState({searchImageKeyword: ""})
                            }, 1000)
                        })
                    } else {
                        this.setState({
                            data,
                            paginationIndex: 0,
                            searchImageKeyword: "",
                            deWord,
                            enWord
                        })
                    }
                }

            })
        })
        J.emitter.on("ready", ()=>{
            let dataHolder = this.state.data
            let data = this.normalizeData(this.state.data)
            if (data !== false) {
                if (R.type(data.imageSrc) === "String") {
                    J.postData(`${J.ils}/learningMemePublish`, {data}).then(()=>{console.log("server responded")})
                    setTimeout(()=>{
                        J.postData(`${J.ils}/readModel/main`, {key:"id", keyValue: data.id}).then(result=>{
                            if (result.imageSrc === false) {
                                    this.notify("No image saved")
                            } else {
                                    this.notify(`${result.imageSrc} - ${data.deWord}`)
                            }
                        })
                    }, 7000)
                    J.emitter.emit("init")
                } else {
                    this.notify("Something is amiss!!")
                }
            } else {
                this.notify("Something is amiss!!")
            }
        })
        J.emitter.on("remove", ()=>{
            J.log(this.state.data.id)
            J.postData(`${J.ils}/removeMain`, {id: this.state.data.id})
            .then(()=>{
                J.postData(`${J.ils}/imageless/count`, {}).then(this.notify)
            })
            J.emitter.emit("init")
        })
        J.emitter.on("searchImage", ()=>{
            let searchImageKeyword = this.state.searchImageKeyword
            J.postData(`${J.ils}/searchImage`, {searchImageKeyword}).then(data =>{
                data = R.filter(val=>{
                    return val.imageSrc.includes(".jpg") || val.imageSrc.includes(".png")
                }, data)
                this.setState({searchImageResult: J.addProp("className", "unselectedImage", data)})
            })
        })
        J.emitter.on("searchImageFast", ()=>{
            let searchImageKeyword = this.state.searchImageKeyword
            J.postData(`${J.ils}/searchImageFast`, {searchImageKeyword}).then(data =>{
                this.setState({searchImageResult: J.addProp("className", "unselectedImage", data)})
            })
        })
        initOnce()
    }
    normalizeData(data) {
        let willReturn = data
        willReturn.dePart = J.addFullstop(willReturn.dePart)
        willReturn.enPart = J.addFullstop(willReturn.enPart)
        if (willReturn.category === "preDraft" && willReturn.enPart !== "") {
            willReturn.category = "quotes"
        }
        if (willReturn.category === "draft" && willReturn.enPart.length > 5) {
            willReturn.category = "quotes"
        }
        if (this.state.deWord.length > 2) {
            willReturn.deWord = this.state.deWord
            willReturn.enWord = this.state.enWord
            return willReturn
        } else {
            return false
        }
    }
    handleImageClick(event) {
        let searchImageResult = this.state.searchImageResult
        let index = R.compose(R.multiply(1), R.last, R.split(" "))(event.target.className)
        let className = R.compose(R.head, R.split(" "))(event.target.className)
        searchImageResult = J.setProp("className", "unselectedImage", searchImageResult)
        if (className === "unselectedImage") {
            className = "selectedImage"
            this.setState({
                data: R.merge(this.state.data, {
                    imageSrc: this.state.searchImageResult[ index ].imageSrc
                })
            })
        } else {
            className = "unselectedImage"
            this.setState({
                data: R.merge(this.state.data, {imageSrc: false})
            })
        }
        searchImageResult[ index ] = R.merge(searchImageResult[ index ], {className})
        this.setState({searchImageResult})
    }
    handleReady() {J.emitter.emit("ready")}
    handleRemove() {J.emitter.emit("remove")}
    handleToggle() {
        this.setState({
            data: R.set(R.lensProp("childSafetyFlag"), R.not(this.state.data.childSafetyFlag), this.state.data)
        })
    }
    handleNextNavigation() {
        if ((this.state.paginationIndex + this.state.paginationPerPageCount) < this.state.searchImageResult.length) {
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
    handleSearchInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("searchImage")
        }
        this.setState({
            searchImageKeyword: event.target.value
        })
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
            data: R.merge(this.state.data, {dePart: event.target.value})
        })
        if (event.target.value.length > 68) {
            this.notify(`TOO LONG - ${event.target.value.length}`, 5)
        }
    }
    handleEnInput (event) {
        if (event.key === "Enter") {
            J.emitter.emit("ready")
        }
        this.setState({
            data: R.merge(this.state.data, {enPart: event.target.value})
        })
        if (event.target.value.length > 68) {
            this.notify(`TOO LONG - ${event.target.value.length}`, 5)
        }
    }
    notify(msg, seconds = 2, position = "top-right", mode) {
        Alert.closeAll()
        if (R.type(msg) !== "String") {
            msg = JSON.stringify(msg)
        }
        let settings = J.alertRandom()
        Alert[ settings.mode ](msg, {
            position,
            effect: settings.effect,
            timeout: seconds * 1000,
            offset: 100
        })
    }
    render () {
        return (
    <div>
        <div className="columns box">
            <div className="column is-4">
                <a className="button" onClick={this.handlePrevNavigation}><span className="icon"><i className="fa fa-arrow-circle-left"></i></span></a>
                <a className="button" onClick={this.handleNextNavigation}><span className="icon"><i className="fa fa-arrow-circle-right"></i></span></a>
                <a className="button is-primary is-inverted" onClick={this.handleReady}><span className="icon"><i className="fa fa-check"></i></span></a>
                <a className="button is-primary is-inverted" onClick={this.handleRemove}><span className="icon"><i className="fa fa-remove"></i></span></a>
                <a id="toggleId" className={`button ${this.state.data.childSafetyFlag ? "is-success" : "is-danger"} is-inverted`} onClick={this.handleToggle}><span className="icon"><i className="fa fa-child"></i></span></a>
            </div>
            <div className="column is-2">
                <input autoFocus={false} className="searchImageKeyword" type="search" value={this.state.searchImageKeyword} size={this.state.searchImageKeyword.length > 10 ? this.state.searchImageKeyword.length : 10} onChange={this.handleSearchInput} onKeyPress={this.handleSearchInput}/>
            </div>
            <div className="column is-3">
                <input className="deWordInput" type="text" value={this.state.deWord} placeholder="deWord" spellCheck="true" size={this.state.deWord.length > 10 ? this.state.deWord.length : 10} onChange={this.handleDeWordInput} onKeyPress={this.handleDeWordInput}/>
            </div>
            <div className="column is-3">
                <input className="enWordInput" type="text" value={this.state.enWord} placeholder="enWord" spellCheck="true" size={this.state.enWord.length > 10 ? this.state.enWord.length : 10} onChange={this.handleEnWordInput} onKeyPress={this.handleEnWordInput}/>
            </div>
        </div>
        <div className="columns box">
            <div className="column is-6 is-pulled-right">
                <input autoFocus={true} spellCheck="true" type="text" size={this.state.data.dePart.length} className="commonInput" value={this.state.data.dePart} onChange={this.handleDeInput} onKeyPress={this.handleDeInput} />
            </div>
            <div className="column is-6 is-pulled-left">
                <input autoFocus={false} spellCheck="true" type="text" size={this.state.data.enPart.length} className="commonInput" value={this.state.data.enPart} onChange={this.handleEnInput} onKeyPress={this.handleEnInput} />
            </div>
        </div>
        <div className="columns is-multiline box has-text-centered">
        {this.state.searchImageResult.map((val, index)=>{
            if (R.gt(index, this.state.paginationIndex) && R.lte(index, this.state.paginationIndex + this.state.paginationPerPageCount)) {
                return <Image key={index} className={`${val.className} ${index}`} handleImageClick={this.handleImageClick} imageSrc={val.imageThumb} />
            }
        })}
        </div>
        <div id="reactContainer"></div>
        <Alert stack={{limit:5}} />
	</div>
    )}
}
