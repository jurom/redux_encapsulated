import React from 'react'
import {COUNTER_MODES} from '../constants'

export default class Counter extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      count: 0,
      mode: COUNTER_MODES.SINGLE,
    }
  }

  modeToDifference = (mode) => ({
    [COUNTER_MODES.SINGLE]: 1,
    [COUNTER_MODES.DOUBLE]: 2,
  })[mode]

  changeCounter = (positive) =>
    this.setState((state) => ({
      ...state,
      count: state.count + this.modeToDifference(state.mode) * (positive ? 1 : -1),
    }))

  increaseCounter = () => this.changeCounter(true)
  decreaseCounter = () => this.changeCounter(false)

  switchMode = () => {
    const modes = Object.values(COUNTER_MODES).sort()
    this.setState((state) => ({
      ...state,
      mode: modes[(modes.indexOf(state.mode) + 1) % modes.length],
    }))
  }

  render() {
    return (
      <div>
        <div>The current count is: {this.state.count}</div>
        <div>
          <button type="button" onClick={this.increaseCounter}>+</button>
          <button type="button" onClick={this.decreaseCounter}>-</button>
          <button type="button" onClick={this.switchMode}>Switch mode</button>
        </div>
      </div>
    )
  }
}
