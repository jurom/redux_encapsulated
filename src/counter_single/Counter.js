import React from 'react'
import {connect} from 'react-redux'
import {counterCountSelector} from './selectors'
import {changeCounter, switchMode} from './actions'
import {bindClosures, compose} from '../utils'

const Counter = ({count, increaseCounter, decreaseCounter, switchMode}) => (
  <div>
    <div>The current count is: {count}</div>
    <div>
      <button type="button" onClick={increaseCounter}>+</button>
      <button type="button" onClick={decreaseCounter}>-</button>
      <button type="button" onClick={switchMode}>Switch mode</button>
    </div>
  </div>
)

export default compose(
  connect(
    (state) => ({
      count: counterCountSelector(state),
    }),
    {
      changeCounter,
      switchMode,
    }
  ),
  bindClosures({
    increaseCounter: ({changeCounter}) => changeCounter({positive: true}),
    decreaseCounter: ({changeCounter}) => changeCounter({positive: false}),
  })
)(Counter)
