import {getIn, setIn} from '../utils'

const initialState = {
  count: 0,
}

export const PATH_SINGLE_COUNTER = ['single_counter']

export const singleCounterSelector = (state) =>
  getIn(state, PATH_SINGLE_COUNTER)

export const setInitialState = (state) =>
  setIn(state, PATH_SINGLE_COUNTER, initialState, true)
