import _ from 'lodash'
import {compose, combineReducers} from 'redux'
import {forwardReducerTo} from './utils'
import * as singleCounter from './counter_single/selectors'
import * as twoCounters from './two_counters/selectors'
import * as multipleCounters from './multiple_counters/selectors'
import traditionalReduxReducer from './traditionalReduxCounters/reducers'
import * as customCounter from './custom_reducer_counters/reducers'

// Traditional redux reducer
const combinedReducers = combineReducers({
  traditionalRedux: traditionalReduxReducer,
})

const traditionalReduxRootReducer = (state, action) => {
  return {
    ...state,
    ...combinedReducers(state, action),
  }
}

//
//
// Initial state creation shared for the new approaches
const getInitialState = () => {
  return compose(
    singleCounter.setInitialState,
    twoCounters.setInitialState,
    multipleCounters.setInitialState,
    customCounter.setInitialState,
  )({})
}

//
//
//
// Approach with dispatching reducers
const rootReducerReduced = (state = getInitialState(), action) => {
  if (!action.reducer || !action.path) {
    return state
  }
  let reducer = forwardReducerTo(action.reducer, action.path)

  return reducer(state, action.payload)
}

//
//
//
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


const composeReducers = (reducer, ...reducers) =>
  reducers.length > 0 ? (state, action) => reducer(composeReducers(...reducers)(state, action), action) : reducer

export default (state = getInitialState(), action) =>
  composeReducers(
    traditionalReduxRootReducer,
    rootReducerReducedSerializable,
    rootReducerReduced
  )(state, action)
