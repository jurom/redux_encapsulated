import {compose, forwardReducerTo} from './utils'
import {routerReducer, LOCATION_CHANGE} from 'react-router-redux'
import {setInitialState as setSingleCounterInitialState} from './counter_single/state'
import {setInitialState as setTwoCountersInitialState} from './two_counters/state'

const getInitialState = () => {
  const state = {
    routing: {},
  }

  return compose(
    setSingleCounterInitialState,
    setTwoCountersInitialState,
  )(state)
}

const rootReducer = (state = getInitialState(), action) => {

  if (action.type === LOCATION_CHANGE) {
    return forwardReducerTo(routerReducer, ['routing'])(state, action)
  }

  if (!action.reducer) {
    //return state with notification which use not our redux style
    return state
  }
  if (!action.path) {
    throw new Error('You forgot action.path in action ' + action.type)
  }
  let reducer = forwardReducerTo(action.reducer, action.path)

  return reducer(state, action.payload)
}


export default rootReducer
