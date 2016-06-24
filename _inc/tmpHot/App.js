import React, { Component } from 'react'
import * as V from "victory"
const dataCountries = {
    "US": "USA",
    "BG": "Bulgaria",
    "DE": "Germany"
}
var testData = "115-US|193-DE|125-BG"
var mockedData = "115-AL|193-DZ|125-AR|038-AM|074-AU|153-AT|152-AZ|054-BH|056-BD|302-BB|085-BY|112-BE|243-BO|078-BA|109-BR|059-BG|047-KH|072-CA|237-CL|086-CN|126-CO|067-CR|102-HR|337-CW|095-CY|196-CZ|103-DK|132-DO|210-EC|119-EG|459-SV|104-EE|158-FI|163-FR|323-PF|339-GE|179-DE|113-GH|125-GR|080-GT|313-HN|053-HK|172-HU|203-IS|033-IN|083-ID|112-IR|113-IQ|096-IE|059-IL|129-IT|127-JM|238-JP|063-JO|209-KZ|104-KE|173-KW|044-KG|075-LV|071-LB|076-LY|098-LT|074-LU|386-MO|106-MK|301-MG|083-MY|087-MT|252-MQ|155-MU|123-MX|037-MD|095-ME|070-MA|131-MM|043-NP|071-NL|076-NZ|182-NI|060-NG|131-NO|144-OM|063-PK|105-PS|121-PA|068-PY|116-PE|135-PH|179-PL|087-PT|310-PR|112-QA|080-RO|060-RU|116-SA|096-RS|063-SG|236-SK|072-SI|083-ZA|065-KR|084-ES|090-LK|085-SE|115-CH|093-SY|082-TW|190-TZ|111-TH|291-TT|053-TN|058-TR|062-UG|071-UA|099-AE|095-GB|078-US|103-UY|087-UZ|250-VE"

function whichCountry(keyword) {
	if (dataCountries[keyword]) {
		return dataCountries[keyword]
	}
	else {
		return "no data"
	}
}
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
                    <input style={innerStyle} type="text" size={parsedProps.size} onKeyPress={this.willHandleKeyPress}  placeholder={this.props.placeholderIs}/>
                </div>
            </SingleColumn>
            )
      }
}

class Empty extends Component {
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
        let localClassName = "somw"
        return (
            <div style={outerStyle} className={localClassName} >
                {this.props.children}
            </div>
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
                    <div className="navbar-item is-text-centered"><a className="button is-medium" href="/" rel="nofollow">Home</a></div>
                    <div className="navbar-item is-text-centered"><a className="button is-medium" href="/blog" rel="nofollow">Blog</a></div>
                    <p className="navbar-item is-text-centered">
                            <img src="logo.jpg" alt="logo" style={outerStyle} />
                    </p>
                    <div className="navbar-item"><a className="button is-medium" href="/login" rel="nofollow">Login</a></div>
                    <div className="navbar-item"><a className="button is-medium" href="/help" rel="nofollow">Instructions</a></div>
              </nav>
            </div>
        )
      }
}

class IndexContainer extends Component {
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
            <div className="columns">
                 <div className="column is-11 is-offset-1">
                      <div className="content">
                          <h1>One project of Dejan Toteff</h1>
                          <p>Hello, there and welcome to my website!</p>
                          <h1>Learn German Language</h1>
                          <p>The Germans has the saying that life is too short for a man to learn proper German.
                              While I somehow agree with it, I think that the main reason is the lack of proper tooling.</p>
                          <p>Private lessons, educational courses, online courses, language partner exchange, all those practices are considered useful. I won't debate over their usefulness, but I claim that all off them are very slow, compared to what actually can be build today</p>
                          <h2>Applications</h2>
                          <ol>
                              <li><a href="/learningMeme">Learning Meme</a> - A word with related image and related translated sentence are displayed. The aim is to find the hidder word.</li>
                              <li><a href="/einEine">EinEine</a> - Select the right German article form. It is working with both indefinite and definite articles.</li>
                              <li><a href="/orderTheSentence">Order German Sentences</a> - The user see the words of a German sentence in random order. The goal is to order the words, so at the end the correct sentence is displayed.</li>
                              <li><a href="/guessTheWord">Guess The Word</a> - The user must write the hidden word. As clues are displayed related words and example sentences.</li>
                          </ol>
                          <h3>About</h3>
                          <p>This is project developed solely by Dejan Toteff. You can reach me out at Twitter @self_refactor in case you have some feedback or questions aboout this project.</p>
                          <h4>The Stack</h4>
                          <p>Nodejs, React, Bulma, Firebase, Babel, Express</p>
                          <p>I need to mention also Ubuntu 15 Desktop Edition, as it brings such order in the dev process</p>
                      </div>
                  </div>
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
            <IndexContainer />
            <div className="columns">
                    <InputContainer />
                    <SingleColumn backgroundColorIs="pink"/>
            </div>
            <V.VictoryPie
              data={[
                {x: "Ca", y: 62},
                {x: "Dog", y: 91}
                ]} />
            <V.VictoryPie
                  data={[
                    {x: "Cata", y: 62},
                    {x: "Dog", y: 91},
                    {x: "Fish", y: 55},
                    {x: "Bird", y: 55}
                    ]} />
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

class SingleContainer extends Component {
    constructor(props) {
            super(props)
    }
    static get defaultProps() {
            return {
                backgroundColorIs: "#f1a716",
				borderIs: "1px solid #607D8B",
				innerBorderIs: "1px solid #607D8B",
				heightIs: Math.floor(winHeightIs*1/5),
				widthIs: "6"
            }
    }
    render() {
        var outerStyle = {
            height: `${this.props.heightIs}px`,
            border: `${this.props.borderIs}`,
            backgroundColor: this.props.backgroundColorIs
        }
        var innerStyle = {
            border: `${this.props.innterBorderIs}`,
            height: `${this.props.heightIs*1-30}px !important`
        }
        let widthIs = this.props.widthIs * 1
        let classNameIs = `column is-${widthIs}`
        console.log(widthIs,classNameIs)
        return (
            <div style={outerStyle} className={classNameIs}>
                <div style={innerStyle}>
                    {this.props.children}
                </div>
            </div>
        )
      }
}
