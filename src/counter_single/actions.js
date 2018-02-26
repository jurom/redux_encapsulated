import {COUNTER_MODES} from '../constants'
import {PATH_SINGLE_COUNTER, counterModeSelector} from './selectors'

const changeCounterBy = (count) => ({
  type: 'Change counter',
  payload: count,
  path: [...PATH_SINGLE_COUNTER, 'count'],
  reducer: (state) => state + count,
})

const _switchMode = (mode) => ({
  type: 'Switching mode',
  path: [...PATH_SINGLE_COUNTER, 'mode'],
  payload: mode,
  reducer: (state) => mode,
})

export const switchMode = () =>
  (dispatch, getState) => {
    const currentMode = counterModeSelector(getState())
    const modes = Object.values(COUNTER_MODES).sort()
    return dispatch(_switchMode(modes[(modes.indexOf(currentMode) + 1) % modes.length]))
  }

export const changeCounter = ({positive}) =>
  (dispatch, getState) => {
    const mode = counterModeSelector(getState())

    dispatch(changeCounterBy({
      [COUNTER_MODES.SIMPLE]: 1,
      [COUNTER_MODES.DOUBLE]: 2,
    }[mode] * (positive ? 1 : -1)))
  }
