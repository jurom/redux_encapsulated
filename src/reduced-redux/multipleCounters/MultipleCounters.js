import React from 'react'
import {connect} from 'react-redux'
import {compose} from 'redux'
import lodash from 'lodash'
import {counterIdsSelector, getCounterSelectors} from './selectors'
import {getCounterActions, addCounter} from './actions'

import counterCreator from '../counterFactory/component'

// Memoization is important here so that we don't return a new set
// of counters with each call.
const getCounterComponent = lodash.memoize((counterId) =>
  counterCreator({actions: getCounterActions(counterId), selectors: getCounterSelectors(counterId)})
)

const CounterById = ({counterId}) => {
  const Counter = getCounterComponent(counterId)
  return (
    <Counter />
  )
}

const MultipleCounters = ({counterIds, addCounter}) => (
  <div>
    Multiple counters:
    <button type="button" onClick={addCounter}>Add counter</button>
    {counterIds.map((counterId) => (
      <CounterById counterId={counterId} key={counterId} />
    ))}
  </div>
)

export default compose(
  connect(
    (state) => ({
      counterIds: counterIdsSelector(state),
    }),
    {
      addCounter,
    }
  )
)(MultipleCounters)
