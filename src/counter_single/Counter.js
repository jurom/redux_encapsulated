import React from 'react'
import {connect} from 'react-redux'
import {singleCounterSelector} from './state'
import {increaseCounter, decreaseCounter} from './actions'

const Counter = ({count, increaseCounter, decreaseCounter}) => (
  <div>
    <div>The current count is: {count}</div>
    <div>
      <button type="button" onClick={increaseCounter}>+</button>
      <button type="button" onClick={decreaseCounter}>-</button>
    </div>
  </div>
)

export default connect(
  (state) => ({
    count: singleCounterSelector(state).count,
  }),
  {
    increaseCounter,
    decreaseCounter,
  }
)(Counter)
