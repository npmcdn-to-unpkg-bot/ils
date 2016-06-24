"use strict"
var React    = require("react")
var ReactDOM = require("react-dom")

var WillAsk = React.createClass({
	render: function () {
		return <div><div>HelloHello</div></div>
	}
})
ReactDOM.render(<WillAsk />, document.getElementById('reactContainer'))