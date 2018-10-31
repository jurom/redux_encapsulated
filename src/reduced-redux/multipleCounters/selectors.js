import lodash from 'lodash'
import {getIn, setIn} from '../../utils'
import createCounterSelectors from '../counterFactory/selectors'

export const PATH_MULTI_COUNTERS = ['multi_counters']

const initialState = {
  // We need to remember the counterIds, so we know where they are in the state
  counterIds: [],
  // Counters will have their substates in counters[counterId]
  counters: {},
}

// Memoization is important here so we don't get a new set of
// selectors with each call.
export const getCounterSelectors = lodash.memoize((counterId) =>
  createCounterSelectors({path: [...PATH_MULTI_COUNTERS, 'counters', counterId]})
)

export const setInitialState = (state) =>
  setIn(state, PATH_MULTI_COUNTERS, initialState, true)

export const counterIdsSelector = (state) =>
  getIn(state, [...PATH_MULTI_COUNTERS, 'counterIds'])
