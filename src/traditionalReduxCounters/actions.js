import {CHANGE_COUNTER, SWITCH_MODE} from './types'
import {counterModeSelector} from './selectors'
import {COUNTER_MODES} from '../constants'

export const changeCounterBy = (amount) => ({
  type: CHANGE_COUNTER,
  payload: {amount},
})

export const switchMode = () => ({
  type: SWITCH_MODE,
})

export const changeCounter = ({positive}) =>
  (dispatch, getState) => {
    const mode = counterModeSelector(getState())

    dispatch(changeCounterBy({
      [COUNTER_MODES.SIMPLE]: 1,
      [COUNTER_MODES.DOUBLE]: 2,
    }[mode] * (positive ? 1 : -1)))
  }
