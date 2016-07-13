"use strict"
import React, { Component } from "react"
import R from "ramda"
import LazyLoad from "react-lazyload"
import J from "./components/commonReact.js"

let initOnce = R.once(()=>{
    J.emitter.emit("init")
})
let store = {}

let mockedData = [{
    "dePart": "Alle Menschen sind gleich. Nur die Gehälter sind verschieden.",
    "enPart": "",
    "category": "preDraft",
    "id": 419
}, {
    "dePart": "Jedenfalls ist es besser, ein eckiges Etwas zu sein als ein rundes Nichts.",
    "enPart": "",
    "category": "preDraft",
    "id": 420
}, {
    "dePart": "Die Hälfte aller Menschen wollen abnehmen, die andere Hälfte verhungert.",
    "enPart": "",
    "category": "preDraft",
    "id": 421
}]
let mockedImage = [{"src":"http://3.bp.blogspot.com/-5tna2I9cHPo/TV5XB85nTTI/AAAAAAAAAvY/uPnXQA8sxn8/s1600/cat-allergy.jpg", "width":"1595", "height":"1075"},
{"src":"http://dianakhayyat.files.wordpress.com/2011/05/animals_cats_small_cat_005241_.jpg", "width":"1152", "height":"864"},
{"src":"http://3.bp.blogspot.com/-pZMZb0rC6qI/UTHNYH7mi7I/AAAAAAAAAPA/m_VYPjtLG8w/s1600/cat.jpeg", "width":"1600", "height":"1200"}, {"src":"http://3.bp.blogspot.com/-5tna2I9cHPo/TV5XB85nTTI/AAAAAAAAAvY/uPnXQA8sxn8/s1600/cat-allergy.jpg", "width":"1595", "height":"1075"},
{"src":"http://dianakhayyat.files.wordpress.com/2011/05/animals_cats_small_cat_005241_.jpg", "width":"1152", "height":"864"},
{"src":"http://3.bp.blogspot.com/-pZMZb0rC6qI/UTHNYH7mi7I/AAAAAAAAAPA/m_VYPjtLG8w/s1600/cat.jpeg", "width":"1600", "height":"1200"}, {"src":"http://3.bp.blogspot.com/-5tna2I9cHPo/TV5XB85nTTI/AAAAAAAAAvY/uPnXQA8sxn8/s1600/cat-allergy.jpg", "width":"1595", "height":"1075"},
{"src":"http://dianakhayyat.files.wordpress.com/2011/05/animals_cats_small_cat_005241_.jpg", "width":"1152", "height":"864"},
{"src":"http://3.bp.blogspot.com/-pZMZb0rC6qI/UTHNYH7mi7I/AAAAAAAAAPA/m_VYPjtLG8w/s1600/cat.jpeg", "width":"1600", "height":"1200"}]
class Image extends Component {
    constructor (props) {
        super(props)
        this.state = {}
        //this.handleImageClick = this.handleImageClick.bind(this)
    }
    static get defaultProps () {
        return {
            handleImageClick: null,
            imageSrc: "",
            className: "",
            imageHeight:"100",
            imageWidth: "100"
        }
    }
    render () {
        let numberIs = 15
        let just = J.getPart(this.props.imageHeight, this.props.imageWidth)
        let only = J.getPercent(just, numberIs)

        let imageStyle = {
            width: `${J.getWidthPx(numberIs)}px`,
            height: `${J.getWidthPx(only)}px`
        }
        return (
            <span className="column" onClick={this.props.handleImageClick}>
                <img src={this.props.imageSrc} style={imageStyle} className={this.props.className} />
            </span>
        )
    }
}

export default class App extends Component {
    constructor (props) {
        super(props)
        this.state = {
            index: 0,
            searchKeyword: "",
            imageSearchResult: J.addProp("className", "unselectedImage", mockedImage)
        }
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.handleImageClick = this.handleImageClick.bind(this)
    }
    componentDidMount() {
        J.emitter.on("init", ()=>{
        })
        J.emitter.on("imageSearch", ()=>{
            J.postData("http://localhost:3001/alt", JSON.stringify({imageSearch: store.imageSearch})).then(incoming =>{
                J.log(JSON.stringify(incoming))
                this.setState({imageSearchResult: incoming})
            })
        })
    }
    handleImageClick(event) {
        let oldState = this.state.imageSearchResult
        let index = R.compose(R.multiply(1), R.last, R.split(" "))(event.target.className)
        let className = R.compose(R.head, R.split(" "))(event.target.className)
        oldState = J.addProp("className", "unselectedImage", oldState)
        if (className === "unselectedImage") {
            className = "selectedImage"
        } else {
            className = "unselectedImage"
        }
        oldState[ index ] = R.merge(oldState[ index ], {
            className: className
        })
        this.setState({
            imageSearchResult: oldState
        })
    }
    handleSearchInput (event) {
        if (event.key === "Enter") {
            store.imageSearch = this.state.searchKeyword
            J.emitter.emit("imageSearch")
        }
        this.setState({
            searchKeyword: event.target.value
        })
    }
    render () {
        return (
    <div>
        <div className="box">
            <input autoFocus type="text" value={this.state.searchKeyword} size={this.state.searchKeyword.length} onChange={this.handleSearchInput} onKeyPress={this.handleSearchInput}/>
        </div>
        <div className="box has-text-centered">
        {this.state.imageSearchResult.map((val, index)=>{
            return <Image key={index} className={`${val.className} ${index}`} handleImageClick={this.handleImageClick} imageSrc={val.src} imageHeight={val.height} imageWidth={val.width}/>
        })}
        </div>
	</div>
    )}
}
