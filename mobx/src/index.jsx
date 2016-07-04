import React, { Component } from "react"
import { render } from "react-dom"
import { AppContainer } from "react-hot-loader"
import { observable } from "mobx"
import { observer } from "mobx-react"
import DevTools from "mobx-react-devtools"
import reqwest from "reqwest"

@observer
class App extends Component {
    @observable timer = 0

    constructor (props) {
        super(props)
        this.state = {
            index: 0
        }
        this.resetTimer = this.resetTimer.bind(this)
    }

    resetTimer() {
      this.timer = 0
    }
  render() {
    return (
      <div>
        <button onClick={this.onReset}>
          Seconds: {timer}
        </button>
        <DevTools />
      </div>
    )
  }

  onReset = () => {
    this.props.appState.resetTimer()
  }
}

class AppState {
  @observable timer = 0;

  constructor() {
    setInterval(() => {
      this.timer += 1
  }, 10000)
  }

  resetTimer() {
    this.timer = 0
  }
}

const appState = new AppState()

render(
  <AppContainer>
    <App appState={appState} />
  </AppContainer>,
  document.getElementById("root")
)
