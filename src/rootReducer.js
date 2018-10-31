import {compose, combineReducers} from 'redux'
import {forwardReducerTo} from './utils'
import * as singleCounter from './reduced-redux/singleCounter/selectors'
import * as twoCounters from './reduced-redux/twoCounters/selectors'
import * as multipleCounters from './reduced-redux/multipleCounters/selectors'
import standardReduxReducer from './standard-redux/reducers'
import * as serializableCounter from './reduced-redux-serialized/reducers'
import {enhanceWithBatchedDispatch} from './reduced-redux-serialized/middlewares/batchedDispatchSerialized'
import {registeredReducers} from './reducer-utils'

const identityReducer = (state = {}) => state

// standard redux reducer
const standardReduxRootReducer = combineReducers({
  standardRedux: standardReduxReducer,
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
const rootReducerReducedSerializable = enhanceWithBatchedDispatch((state = getInitialState(), action) => {
  if (action.type) {
    const reducerDefinition = registeredReducers[action.type]
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
  standardReduxRootReducer,
  rootReducerReducedSerializable,
  rootReducerReduced
)(state, action)
