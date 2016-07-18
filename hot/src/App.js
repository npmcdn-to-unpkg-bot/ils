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
let mockedImageSearchResult = [{"imageThumb":"http://images.freeimages.com/images/thumbs/974/cat-1192444.jpg","imageSrc":"http://images.freeimages.com/images/previews/974/cat-1192444.jpg"},{"imageThumb":"https://static.pexels.com/photos/62640/pexels-photo-62640-medium.jpeg","imageSrc":"https://static.pexels.com/photos/62640/pexels-photo-62640-medium.jpeg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/f9a/cat-1-1566138.jpg","imageSrc":"http://images.freeimages.com/images/previews/f9a/cat-1-1566138.jpg"},{"imageThumb":"https://static.pexels.com/photos/8923/pexels-photo-medium.jpg","imageSrc":"https://static.pexels.com/photos/8923/pexels-photo-medium.jpg"},{"imageThumb":"https://static.pexels.com/photos/96938/pexels-photo-96938-medium.jpeg","imageSrc":"https://static.pexels.com/photos/96938/pexels-photo-96938-medium.jpeg"},{"imageThumb":"https://static.pexels.com/photos/54632/cat-animal-eyes-grey-54632-medium.jpeg","imageSrc":"https://static.pexels.com/photos/54632/cat-animal-eyes-grey-54632-medium.jpeg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/c17/cat-1399577.jpg","imageSrc":"http://images.freeimages.com/images/previews/c17/cat-1399577.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/707/cat-1410064.jpg","imageSrc":"http://images.freeimages.com/images/previews/707/cat-1410064.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/139/cat-1362530.jpg","imageSrc":"http://images.freeimages.com/images/previews/139/cat-1362530.jpg"},{"imageThumb":"http://images4.fanpop.com/image/photos/16100000/Beautiful-Cat-cats-16121794-1280-800.jpg","imageSrc":"http://images4.fanpop.com/image/photos/16100000/Beautiful-Cat-cats-16121794-1280-800.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/502/cat-1393633.jpg","imageSrc":"http://images.freeimages.com/images/previews/502/cat-1393633.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/e1c/cat-1501949.jpg","imageSrc":"http://images.freeimages.com/images/previews/e1c/cat-1501949.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/763/sniffing-cat-1398165.jpg","imageSrc":"http://images.freeimages.com/images/previews/763/sniffing-cat-1398165.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/485/cat-1391699.jpg","imageSrc":"http://images.freeimages.com/images/previews/485/cat-1391699.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/e65/cat-1459230.jpg","imageSrc":"http://images.freeimages.com/images/previews/e65/cat-1459230.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/c23/cat-1396828.jpg","imageSrc":"http://images.freeimages.com/images/previews/c23/cat-1396828.jpg"},{"imageThumb":"https://static.pexels.com/photos/121920/pexels-photo-121920-medium.jpeg","imageSrc":"https://static.pexels.com/photos/121920/pexels-photo-121920-medium.jpeg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/c22/cat-1395746.jpg","imageSrc":"http://images.freeimages.com/images/previews/c22/cat-1395746.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/338/cat-food-1539260.jpg","imageSrc":"http://images.freeimages.com/images/previews/338/cat-food-1539260.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/817/black-cat-1402633.jpg","imageSrc":"http://images.freeimages.com/images/previews/817/black-cat-1402633.jpg"},{"imageThumb":"https://static.pexels.com/photos/105587/pexels-photo-105587-medium.jpeg","imageSrc":"https://static.pexels.com/photos/105587/pexels-photo-105587-medium.jpeg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/6d4/little-cat-1409488.jpg","imageSrc":"http://images.freeimages.com/images/previews/6d4/little-cat-1409488.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/737/cat-1401863.jpg","imageSrc":"http://images.freeimages.com/images/previews/737/cat-1401863.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/7cc/cat-1410491.jpg","imageSrc":"http://images.freeimages.com/images/previews/7cc/cat-1410491.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/ae3/cat-1372484.jpg","imageSrc":"http://images.freeimages.com/images/previews/ae3/cat-1372484.jpg"},{"imageThumb":"https://static.pexels.com/photos/69932/tabby-cat-close-up-portrait-69932-medium.jpeg","imageSrc":"https://static.pexels.com/photos/69932/tabby-cat-close-up-portrait-69932-medium.jpeg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/1e1/cat-1399848.jpg","imageSrc":"http://images.freeimages.com/images/previews/1e1/cat-1399848.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/162/pet-cat-1561824.jpg","imageSrc":"http://images.freeimages.com/images/previews/162/pet-cat-1561824.jpg"},{"imageThumb":"http://stuffpoint.com/cats/image/60451-cats-cat.jpg","imageSrc":"http://stuffpoint.com/cats/image/60451-cats-cat.jpg"},{"imageThumb":"https://static.pexels.com/photos/41315/africa-african-animal-cat-41315-medium.jpeg","imageSrc":"https://static.pexels.com/photos/41315/africa-african-animal-cat-41315-medium.jpeg"},{"imageThumb":"http://images4.fanpop.com/image/photos/16000000/Beautiful-Cat-cats-16096437-1280-800.jpg","imageSrc":"http://images4.fanpop.com/image/photos/16000000/Beautiful-Cat-cats-16096437-1280-800.jpg"},{"imageThumb":"https://static.pexels.com/photos/4602/jumping-cute-playing-animals-medium.jpg","imageSrc":"https://static.pexels.com/photos/4602/jumping-cute-playing-animals-medium.jpg"},{"imageThumb":"http://www.mrwallpaper.com/wallpapers/Cat-Sad-Annoyed.jpg","imageSrc":"http://www.mrwallpaper.com/wallpapers/Cat-Sad-Annoyed.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/c7d/sleeping-cat-1531012.jpg","imageSrc":"http://images.freeimages.com/images/previews/c7d/sleeping-cat-1531012.jpg"},{"imageThumb":"https://static.pexels.com/photos/65006/pexels-photo-65006-medium.jpeg","imageSrc":"https://static.pexels.com/photos/65006/pexels-photo-65006-medium.jpeg"},{"imageThumb":"https://static.pexels.com/photos/24104/pexels-photo-24104-medium.jpg","imageSrc":"https://static.pexels.com/photos/24104/pexels-photo-24104-medium.jpg"},{"imageThumb":"https://static.pexels.com/photos/26897/pexels-photo-26897-medium.jpg","imageSrc":"https://static.pexels.com/photos/26897/pexels-photo-26897-medium.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/db5/cat-1407260.jpg","imageSrc":"http://images.freeimages.com/images/previews/db5/cat-1407260.jpg"},{"imageThumb":"https://static.pexels.com/photos/47390/pexels-photo-47390-medium.jpeg","imageSrc":"https://static.pexels.com/photos/47390/pexels-photo-47390-medium.jpeg"},{"imageThumb":"https://static.pexels.com/photos/25453/pexels-photo-25453-medium.jpg","imageSrc":"https://static.pexels.com/photos/25453/pexels-photo-25453-medium.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/863/cat-1549038.jpg","imageSrc":"http://images.freeimages.com/images/previews/863/cat-1549038.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/2c1/cat-1188492.jpg","imageSrc":"http://images.freeimages.com/images/previews/2c1/cat-1188492.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/ee6/screaming-cat-1404453.jpg","imageSrc":"http://images.freeimages.com/images/previews/ee6/screaming-cat-1404453.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/f1d/cat-1408257.jpg","imageSrc":"http://images.freeimages.com/images/previews/f1d/cat-1408257.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/730/cat-blue-eyes-1408567.jpg","imageSrc":"http://images.freeimages.com/images/previews/730/cat-blue-eyes-1408567.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/288/cat-1498803.jpg","imageSrc":"http://images.freeimages.com/images/previews/288/cat-1498803.jpg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/299/cat-2-1565759.jpg","imageSrc":"http://images.freeimages.com/images/previews/299/cat-2-1565759.jpg"},{"imageThumb":"http://3.bp.blogspot.com/-WHW5J1uTTCY/UERgSSUImII/AAAAAAAAAMk/JrIBdXHajj0/s1600/Cat+Pictures+8.jpg","imageSrc":"http://3.bp.blogspot.com/-WHW5J1uTTCY/UERgSSUImII/AAAAAAAAAMk/JrIBdXHajj0/s1600/Cat+Pictures+8.jpg"},{"imageThumb":"https://static.pexels.com/photos/115011/cat-face-close-view-115011-medium.jpeg","imageSrc":"https://static.pexels.com/photos/115011/cat-face-close-view-115011-medium.jpeg"},{"imageThumb":"http://images.freeimages.com/images/thumbs/bd1/cat-1404368.jpg","imageSrc":"http://images.freeimages.com/images/previews/bd1/cat-1404368.jpg"}]
class Image extends Component {
    constructor (props) {
        super(props)
        this.state = {}
    }
    static get defaultProps () {
        return {
            handleImageClick: null,
            imageSrc: "",
            className: ""
        }
    }
    render () {
        let numberIs = 15
        let imageStyle = {
            maxWidth: `${J.getWidthPx(numberIs)}px`,
            height: "auto",
            maxHeight: `${J.getHeightPx(numberIs)}px`
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
            searchImage: "",
            imageSearchResult: J.addProp("className", "unselectedImage", mockedImageSearchResult),
            paginationIndex: 0,
            paginationPerPageCount: 10
        }
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.handleImageClick = this.handleImageClick.bind(this)
        this.handlePrevNavigation = this.handlePrevNavigation.bind(this)
        this.handleNextNavigation = this.handleNextNavigation.bind(this)
    }
    componentDidMount() {
        J.emitter.on("init", ()=>{
        })
        J.emitter.on("searchImage", ()=>{
            J.postData("http://localhost:3001/searchImage", JSON.stringify({searchImage: this.state.searchImage})).then(incoming =>{
                J.log(JSON.stringify(incoming).length)
                this.setState({imageSearchResult: J.addProp("className", "unselectedImage", incoming)})
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
    handleNextNavigation() {
        if ((this.state.paginationIndex + this.state.paginationPerPageCount) < this.state.imageSearchResult.length) {
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
            searchImage: event.target.value
        })
    }
    render () {
        return (
    <div>
        <div className="columns box">
            <div className="column">
                <a className="button" onClick={this.handlePrevNavigation}><span className="icon"><i className="fa fa-arrow-circle-left"></i></span></a>
                <a className="button" onClick={this.handleNextNavigation}><span className="icon"><i className="fa fa-arrow-circle-right"></i></span></a>
            </div>
            <div className="column">
                <input autoFocus type="text" value={this.state.searchImage} size={this.state.searchImage.length} onChange={this.handleSearchInput} onKeyPress={this.handleSearchInput}/>
            </div>

        </div>
        <div className="columns is-multiline box has-text-centered">
        {this.state.imageSearchResult.map((val, index)=>{
            if(R.gt(index,this.state.paginationIndex)&&R.lt(index,this.state.paginationIndex+this.state.paginationPerPageCount)){
                return <Image key={index} className={`${val.className} ${index}`} handleImageClick={this.handleImageClick} imageSrc={val.imageThumb} />
            }
        })}
        </div>
	</div>
    )}
}
