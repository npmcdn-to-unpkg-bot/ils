"use strict"
const ipcRenderer = electronRequire('electron').ipcRenderer
const PubSub      = require("pubsub-js")
ipcRenderer.on('data', function (event, arg) {
	console.log(arg)
	PubSub.publish("just", arg)
})
const React    = require("react")
const ReactDOM = require("react-dom")

class Hello extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			dataIs: "loading"
		}
	}
	componentDidMount() {
		let self = this
		PubSub.subscribe("just", (msg, data)=> {
			self.setState({
				dataIs: data
			})
			ipcRenderer.send('open', msg)
		})
	}
	render() {
		const self = this
		return <div>{self.state.dataIs}</div>
	}
}

ReactDOM.render(<Hello />, document.getElementById('reactContainer'))