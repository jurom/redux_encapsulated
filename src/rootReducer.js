import {compose, forwardReducerTo, setIn} from './utils'
import {setInitialState as setSingleCounterInitialState} from './counter_single/selectors'
import {setInitialState as setTwoCountersInitialState} from './two_counters/selectors'
import {setInitialState as setMultipleCountersInitialState} from './multiple_counters/selectors'
import {setInitialState as setCustomCounterInitialState, reducers as customCounterReducers} from './custom_reducer_counters/reducers'

const getInitialState = () => {
  return compose(
    setSingleCounterInitialState,
    setTwoCountersInitialState,
    setMultipleCountersInitialState,
    setCustomCounterInitialState,
  )({})
}

const matchReducer = (type) => ({
  ...customCounterReducers,
})[type]

const rootReducer = (state = getInitialState(), action) => {

  // Match against another custom reducer first
  if (action.type) {
    const reducer = matchReducer(action.type)
    console.log(reducer)
    if (reducer != null) return reducer(state)
  }

  if (!action.reducer) {
    return state
  }
  if (!action.path) {
    throw new Error('You forgot action.path in action ' + action.type)
  }
  let reducer = forwardReducerTo(action.reducer, action.path)

  return reducer(state, action.payload)
}


export default rootReducer
