'use strict';

var PubSub     = require('pubsub-js')
var React      = require('react')
var Firebase   = require('firebase')
var ReactDOM   = require('react-dom')
var ref        = new Firebase("https://restly.firebaseio.com/order")
var currentArr = []
ref.once('value', function (dataSnapshot) {
	// handle read data.
	let obj = dataSnapshot.val()
	for (var prop in obj) {
		currentArr.push(obj[prop]);
	}
	PubSub.publish('ready', 'data')
})


function getData() {
	if (currentArr.length === 0) {
		return null
	} else {
		let randomIndex = Math.floor(Math.random()*currentArr.length)
		let willReturn = currentArr.splice(randomIndex, 1)
		return JSON.stringify(willReturn)
	}
}

var WillAsk = React.createClass({
	componentDidMount(){
	},
	render: function () {
		var self = this
		return (
			<div>
				meybe  {self.props.dataIs}
			</div>
		)
	}
})

PubSub.subscribe('ready', function (msg, data) {
	ReactDOM.render(<WillAsk dataIs={getData()}/>, document.getElementById('just'))
})

