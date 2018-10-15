import {compose, forwardReducerTo} from './utils'
import {setInitialState as setSingleCounterInitialState} from './counter_single/selectors'
import {setInitialState as setTwoCountersInitialState} from './two_counters/selectors'
import {setInitialState as setMultipleCountersInitialState} from './multiple_counters/selectors'

const getInitialState = () => {
  return compose(
    setSingleCounterInitialState,
    setTwoCountersInitialState,
    setMultipleCountersInitialState,
  )({})
}

const rootReducer = (state = getInitialState(), action) => {

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
