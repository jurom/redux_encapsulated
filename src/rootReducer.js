import _ from 'lodash'
import {compose} from 'redux'
import {forwardReducerTo} from './utils'
import {setInitialState as setSingleCounterInitialState} from './counter_single/selectors'
import {setInitialState as setTwoCountersInitialState} from './two_counters/selectors'
import {setInitialState as setMultipleCountersInitialState} from './multiple_counters/selectors'
import * as customCounter from './custom_reducer_counters/reducers'

const getInitialState = () => {
  return compose(
    setSingleCounterInitialState,
    setTwoCountersInitialState,
    setMultipleCountersInitialState,
    customCounter.setInitialState,
  )({})
}

// Approach with dispatching reducers
const rootReducerReduced = (state = getInitialState(), action) => {
  if (!action.reducer) {
    return state
  }
  let reducer = forwardReducerTo(action.reducer, action.path)

  return reducer(state, action.payload)
}


// Approach with dispatching types and paths
const uniqueReducers = [
  ...customCounter.reducers,
]

const indexedReducers = _.fromPairs(
  uniqueReducers.map((reducerDefinition) => [reducerDefinition.type, reducerDefinition])
)

const rootReducerReducedSerializable = (state = getInitialState(), action) => {
  if (action.type) {
    const reducerDefinition = indexedReducers[action.type]
    if (reducerDefinition) {
      const reducer = reducerDefinition.path
        ? forwardReducerTo(reducerDefinition.reducer, reducerDefinition.path)
        : reducerDefinition.reducer
      return reducer(state, action)
    }
  }
  return state
}

export default (state = getInitialState(), action) =>
  rootReducerReducedSerializable(rootReducerReduced(state, action), action)
