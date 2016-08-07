import React from 'react';
import Perf from 'react-addons-perf';

export default class PerfMonitor extends React.Component {
  constructor(props) {
    super(props)
    this.state = {perfStarted: false}
  }

  onClickStart = () => {
    Perf.start();
    this.setState({perfStarted: true})
  };

  onClickStop = () => {
    Perf.stop();
    Perf.printWasted();
    Perf.printInclusive();
    this.setState({perfStarted: false})
};

  render() {
    const msg = this.state.perfStarted ? 'Stop recording' : 'Start recording';
    const onClick = this.state.perfStarted ? this.onClickStop : this.onClickStart;

    return (
      <div
        style={{
          position: 'fixed',
          bottom: 0,
          right: 30,
        }}>
        <button onClick={onClick}>{msg}</button>
      </div>
    )
  }
}
