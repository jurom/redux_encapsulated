import _ from 'lodash'
import {compose, combineReducers} from 'redux'
import {forwardReducerTo} from './utils'
import * as singleCounter from './counterSingle/selectors'
import * as twoCounters from './twoCounters/selectors'
import * as multipleCounters from './multipleCounters/selectors'
import traditionalReduxReducer from './traditionalReduxCounters/reducers'
import * as serializableCounter from './serializableReducerCounters/reducers'
import {enhanceWithBatchedDispatch} from './middlewares/batchedDispatchSerialized'

const identityReducer = (state = {}) => state

// Traditional redux reducer
const traditionalReduxRootReducer = combineReducers({
  traditionalRedux: traditionalReduxReducer,
  serializableCounter: identityReducer,
  multi_counters: identityReducer,
  router: identityReducer,
  single_counter: identityReducer,
  two_counters: identityReducer,
})


//
//
// Initial state creation shared for the new approaches
const getInitialState = () => {
  return compose(
    singleCounter.setInitialState,
    twoCounters.setInitialState,
    multipleCounters.setInitialState,
    serializableCounter.setInitialState,
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
  ...serializableCounter.reducers,
]

const indexedReducers = _.fromPairs(
  uniqueReducers.map((reducerDefinition) => [reducerDefinition.type, reducerDefinition])
)

const rootReducerReducedSerializable = enhanceWithBatchedDispatch((state = getInitialState(), action) => {
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
})


const composeReducers = (reducer, ...reducers) =>
  reducers.length > 0 ? (state, action) => reducer(composeReducers(...reducers)(state, action), action) : reducer

export default (state, action) => composeReducers(
  traditionalReduxRootReducer,
  rootReducerReducedSerializable,
  rootReducerReduced
)(state, action)
