import {getIn, setIn} from '../../utils'
import {COUNTER_MODES} from '../../constants'

const initialState = {
  count: 0,
  mode: COUNTER_MODES.SIMPLE,
}

export const PATH_SINGLE_COUNTER = ['single_counter']

export const counterCountSelector = (state) =>
  getIn(state, [...PATH_SINGLE_COUNTER, 'count'])

export const setInitialState = (state) =>
  setIn(state, PATH_SINGLE_COUNTER, initialState, true)

export const counterModeSelector = (state) =>
  getIn(state, [...PATH_SINGLE_COUNTER, 'mode'])
