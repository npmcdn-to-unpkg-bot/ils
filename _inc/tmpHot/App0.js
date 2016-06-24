import React, { Component } from 'react'

const winWidthIs = window.innerWidth*1
const winHeightIs = window.innerHeight*1
const singleGridInPxs = Math.floor(winWidthIs/12)
const topGitter = Math.floor(winWidthIs/33)
const heightInPxs = Math.floor(winHeightIs/12)
const noEighter = Math.floor(singleGridInPxs/8)
const noEighterHeight = Math.floor(heightInPxs/8)
const noQuarter = Math.floor(singleGridInPxs/4)
const noQuarterHeight = Math.floor(heightInPxs/4)
const noHalfer = Math.floor(singleGridInPxs/2)
const noHalferHeight = Math.floor(heightInPxs/2)
console.log(singleGridInPxs, heightInPxs, topGitter)

class InputContainer extends Component {
    constructor(props) {
            super(props)
            this.state = {value: ""}
            this.willHandleKeyPress = this.willHandleKeyPress.bind(this)
            this.handleState = this.handleState.bind(this)
    }
    static get defaultProps() {
            return {
                sizeJ: "2",
                sizeF: "2",
                placeholderIs: "",
                isOffset: "",
                backgroundColorIs: "#607D8B",
				borderIs: "1px solid #607D8B",
				innerBorderIs: "1px solid #4CAF50"
            }
    }
    willHandleKeyPress(event) {
        // console.log(event.target.value)
        // console.log(event.charCode)
        // console.log(event.key)
        // console.log(event.keyCode)
        // console.log(event.ctrlKey)
        // console.log(event.location)
        // console.log(event.which)
        if (event.key === 'Enter') {
            let query = event.target.value
        }
    }
    handleState(event){
        this.setState({value: event.target.value})
    }
    render() {
        let sizeJ = this.props.sizeJ*1
        let sizeF = this.props.sizeF*1
        let localHeight = Math.floor(heightInPxs*sizeF)
        console.log(localHeight)
        let offsetIncluded = this.props.isOffset===""?"":` is-offset-${this.props.isOffset}`
        let localClassName = `column is-${sizeJ}${offsetIncluded}`
        let parsedProps = {
            marginTop: Math.floor((localHeight)/2)-topGitter,
            marginLeft: Math.floor(noEighter*sizeJ),
            marginRight: Math.floor(noEighter*sizeJ),
            width: Math.floor(noQuarter*sizeJ),
            size: sizeJ===2?Math.floor(5*sizeJ):Math.floor(6*sizeJ)
        }

        let outerStyle = {
            marginTop: `${parsedProps.marginTop}px`,
            marginLeft: `${parsedProps.marginLeft}px`,
            marginRight: `${parsedProps.marginRight}px`,
            backgroundColor: "#d7a7aa"
        }
        let innerStyle = {
            textAlign: "center"
        }

        return (
            <SingleColumn widthIs={sizeJ} heightIs={localHeight} backgroundColorIs={this.props.backgroundColorIs}>
                <div style={outerStyle}>
                    <input style={innerStyle} type="text" size={parsedProps.size} onKeyPress={this.willHandleKeyPress}  placeholder={this.props.placeholderIs} />
                </div>
            </SingleColumn>
            )
      }
}

class Navigation extends Component {
    constructor(props) {
            super(props)
    }
    static get defaultProps() {
            return {
                heightIs: "200",
                widthIs: "2"
            }
    }
    render() {
        let outerStyle = {
            height: "53px"
        }
        let localClassName = "somw"
        return (
            <div>
                <nav className="navbar">
                    <div className="navbar-item is-text-centered"><a href="/" rel="nofollow">Home</a></div>
                    <div className="navbar-item"><a href="/about" rel="nofollow">About</a></div>
                    <p className="navbar-item is-text-centered">
                            <img src="logo.jpg" alt="logo" style={outerStyle} />
                    </p>
                    <div className="navbar-item"><a href="/login" rel="nofollow">Login</a></div>
                    <div className="navbar-item"><a href="/help" rel="nofollow">Instructions</a></div>
              </nav>
            </div>
        )
      }
}

class MainContainer extends Component {
    constructor(props) {
            super(props)
    }
    static get defaultProps() {
            return {
                heightIs: "200",
                widthIs: "2"
            }
    }
    render() {
        let outerStyle = {}
        let localClassName = "columns"
        return (
            <div style={outerStyle} className="columns" >
                {this.props.children}
            </div>
        )
      }
}

class SingleColumn extends Component {
    constructor(props) {
            super(props)
    }
    static get defaultProps() {
            return {
                heightIs: "200",
                widthIs: "2",
                isOffset: "",
                backgroundColorIs: "#f1a716",
				borderIs: "1px solid #607D8B",
				innerBorderIs: "1px solid #607D8B"
            }
    }
    render() {
        let offsetIncluded = this.props.isOffset===""?"":` is-offset-${this.props.isOffset}`
        let localClassName = `column is-${this.props.widthIs}${offsetIncluded}`
        let outerStyle = {
            height: `${this.props.heightIs}px`,
            border: `${this.props.borderIs}`,
            backgroundColor: this.props.backgroundColorIs
        }
        return (
            <div style={outerStyle} className={localClassName} >
                {this.props.children}
            </div>
        )
      }
}

export default class App extends Component {
    constructor(props) {
            super(props)
            this.state = {x: "y"}
            this.handleClick = this.handleClick.bind(this)
    }
    propTypes: {
            a: String
    }
    defaultProps() {
            return {
                a: "b"
            }
    }
    handleClick() {
        console.log(this); // React Component instance
    }
    componentWillMount(){}
    componentDidMount(){
            console.log(this.state, this.props)
    }
    render() {
        return (
        <div>
            <div className="columns">
                    <div className="column">azoooooooooooooooooooo</div>
                    <div className="column">azoooooooooooooooooooo</div>
                    <div className="column">azoooooooooooooooooooo</div>
                    <div className="column">b</div>
                    <div className="column">b</div>
                    <div className="column">b</div>
                    <div className="column">b</div>
                    <div className="column">b</div>
            </div>
        </div>
        )
      }
}
