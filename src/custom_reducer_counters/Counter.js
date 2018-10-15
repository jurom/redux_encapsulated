import React from 'react'
import {connect} from 'react-redux'
import {increaseCounter} from './actions'
import {bindClosures, compose} from '../utils'
import {counterDataSelector} from './reducers'

const Counter = ({count, increaseCounter, decreaseCounter}) => (
  <div>
    <div>The current count is: {count}</div>
    <div>
      <button type="button" onClick={increaseCounter}>+</button>
      <button type="button" onClick={decreaseCounter}>-</button>
    </div>
  </div>
)

export default compose(
  connect(
    (state) => ({
      count: counterDataSelector(state).value,
    }),
    {
      increaseCounter,
    }
  ),
  bindClosures({
    increaseCounter: ({increaseCounter}) => increaseCounter(1),
    decreaseCounter: ({increaseCounter}) => increaseCounter(-1),
  })
)(Counter)
