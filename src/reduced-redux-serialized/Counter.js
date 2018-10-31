import React from 'react'
import {connect} from 'react-redux'
import {compose, bindActionCreators} from 'redux'
import {increaseCounter, counterDataSelector} from './reducers'

const Counter = ({count, increaseCounter, decreaseCounter, doubleIncrease}) => (
  <div>
    <div>The current count is: {count}</div>
    <div>
      <button type="button" onClick={doubleIncrease}>++</button>
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
    (dispatch) => bindActionCreators({
      increaseCounter: () => ({type: increaseCounter.type, amount: 1}),
      decreaseCounter: () => ({type: increaseCounter.type, amount: -1}),
      doubleIncrease: () => ([
        {type: increaseCounter.type, amount: 1},
        {type: increaseCounter.type, amount: 1},
      ]),
    }, dispatch)
  ),
)(Counter)
