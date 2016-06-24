"use strict"
const React = require('react')
const ReactDOM = require('react-dom')
const mainData = require("./data.json")
const dataCountries = require("./dataCountries.json")
const testData = "115-AL|193-DZ|125-AR|038-AM|074-AU|153-AT|152-AZ|054-BH|056-BD|302-BB|085-BY|112-BE|243-BO|078-BA|109-BR|059-BG|047-KH|072-CA|237-CL|086-CN|126-CO|067-CR|102-HR|337-CW|095-CY|196-CZ|103-DK|132-DO|210-EC|119-EG|459-SV|104-EE|158-FI|163-FR|323-PF|339-GE|179-DE|113-GH|125-GR|080-GT|313-HN|053-HK|172-HU|203-IS|033-IN|083-ID|112-IR|113-IQ|096-IE|059-IL|129-IT|127-JM|238-JP|063-JO|209-KZ|104-KE|173-KW|044-KG|075-LV|071-LB|076-LY|098-LT|074-LU|386-MO|106-MK|301-MG|083-MY|087-MT|252-MQ|155-MU|123-MX|037-MD|095-ME|070-MA|131-MM|043-NP|071-NL|076-NZ|182-NI|060-NG|131-NO|144-OM|063-PK|105-PS|121-PA|068-PY|116-PE|135-PH|179-PL|087-PT|310-PR|112-QA|080-RO|060-RU|116-SA|096-RS|063-SG|236-SK|072-SI|083-ZA|065-KR|084-ES|090-LK|085-SE|115-CH|093-SY|082-TW|190-TZ|111-TH|291-TT|053-TN|058-TR|062-UG|071-UA|099-AE|095-GB|078-US|103-UY|087-UZ|250-VE"

function dataQuery(keyword) {
	if (mainData["main"][keyword]) {
		return mainData.main[keyword]
	}
	else {
		return "no data"
	}
}

function countryFn(countryCode) {
	var willReturn = ""
	dataCountries.map(function(val){
		if(val.Code===countryCode){
			willReturn += val.Name
		}
	})
	return willReturn
}

console.log(countryFn("DZ"))


var DataContainer = React.createClass({
	getDefaultProps() {
			return {
				dataIs: testData
			}
		},
		getInitialState() {
			return {
				arrOfCountries: testData
			}
		},
		componentWillMount() {
			let willChangeState = []
			this.props.dataIs.split("|").sort().map(function(val, key) {
				if (key < 10) {
					willChangeState.push(val)
				}
			})
			this.setState(function() {
				return {
					arrOfCountries: willChangeState
				}
			})
		},
		render: function() {
			var self = this
			var justStyle = {
				backgroundColor: this.props.backgroundColorIs
			}
			var limit = 15
			return (
				<div>
  					<SingleContainer heightIs="300">
	  					<ul>
					        {self.state.arrOfCountries.map(function(val, key) {
					        if(key<limit){

					        }
					          return <li>{result}</li>
					        })}
					      </ul>
  					</SingleContainer>
				</div>
			)
		}
})

var SingleContainer = React.createClass({
	getDefaultProps() {
			return {
				backgroundColorIs: "#f1a716",
				borderIs: "3px solid chucknorris",
				heightIs: "200",
				widthIs: "6"
			}
		},
		getInitialState() {
			return {
				flag: true
			}
		},
		customFn: function() {

		},
		componentWillMount() {
			console.log(this.props)

		},
		componentDidMount() {
			console.log("componentWillMount")
		},
		render: function() {
			var outerStyle = {
				height: `${this.props.heightIs}px !important`,
				backgroundColor: this.props.backgroundColorIs
			}
			var innerStyle = {
				height: `${this.props.heightIs*1-30}px !important`
			}
			let widthIs = this.props.widthIs * 1
			let offsetIs = Math.floor((12 - widthIs) / 2)
			var classNameIs = `column is-${widthIs} is-offset-${offsetIs}`
			var self = this
			return (
				<div style={outerStyle} className={classNameIs}>
  					<div style={innerStyle}>
  						{self.props.children}
  					</div>
				</div>
			)
		}
})

var InputContainer = React.createClass({
	getDefaultProps() {
			return {
				heightIs: "60",
				backgroundColorIs: "#f1f4a3",
				sizeIs: "30",
				placeholderIs: "write your query",
				labelIs: "I am important, kind of"
			}
		},
		getInitialState() {
			return {
				flag: true,
				currentState: ""
			}
		},
		willHandleKeyPress(event) {
			//http://www.w3schools.com/jsref/tryit.asp?filename=tryjsref_event_key_keycode2
			console.log(event.key)
			console.log(event.which)
			if (event.key === 'Enter') {

				//ReactDOM.unmountComponentAtNode(document.getElementById('reactContainerJust'))
			}
		},
		componentWillMount() {},
		render: function() {
			var self = this
			var justStyle = {
				backgroundColor: this.props.backgroundColorIs
			}
			return (
				<div>
  					<SingleContainer customText={self.props.labelIs} heightIs={self.props.heightIs}>
	  					<div style={justStyle} className="is-text-centered">
		  					<input type="text" size="55" onKeyPress={self.willHandleKeyPress} />
		  				</div>
  					</SingleContainer>
				</div>
			)
		}
})

/*var DataContainer = React.createClass({
	getDefaultProps() {
			return {
				flagProp: true
			}
		},
		getInitialState() {
			return {
				flag: true
			}
		},
		customFn: function() {

		},
		componentWillMount() {
			console.log(this.props)
			console.log(this.props.flagProp)
			if (typeof this.props.flagProp !== "boolean") {
				console.log('is not boolean')
			}
			else {
				console.log('is boolean')
			}

			function asyncFn(callback) {
				console.log("asyncFn")
				callback()
			}
			asyncFn(function() {
				console.log("componentWillMount")
			})
		},
		componentDidMount() {
			function asyncFn(callback) {
				console.log("asyncFn2")
				callback()
			}
			asyncFn(function() {
				console.log("componentWillMount2")
			})
			console.log("componentWillMount")
		},
		render: function() {
			var customStyle = {
					backgroundColor: "#f1f4a3",
					zIndex: "100",
					marginLeft: "10px",
					padding: "20px 4px 11px 1px",
					border: "3px solid chucknorris",
					height: "200px !import"
				}
				//var self = this
			return (
				<div className="uk-grid">
	                <div className="uk-width-1-3" style={customStyle}>
	                1
	                </div>
            	</div>
			)
		}
})*/

ReactDOM.render(<DataContainer />, document.getElementById('reactContainer'))
