import {CHANGE_COUNTER, SWITCH_MODE} from './types'
import {COUNTER_MODES} from '../constants'

const initialState = {
  count: 0,
  mode: COUNTER_MODES.SIMPLE,
}

export default (state = initialState, action) => {
  switch (action.type) {
    case CHANGE_COUNTER: {
      return {
        ...state,
        count: state.count + action.payload.amount,
      }
    }

    case SWITCH_MODE: {
      return {
        ...state,
        mode: state.mode === COUNTER_MODES.SIMPLE ? COUNTER_MODES.DOUBLE : COUNTER_MODES.SIMPLE,
      }
    }
    default: {
      return state
    }
  }
}
