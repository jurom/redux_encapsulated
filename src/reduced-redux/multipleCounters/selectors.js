import lodash from 'lodash'
import {getIn, setIn} from '../../utils'
import createCounterSelectors from '../counterFactory/selectors'

export const PATH_MULTI_COUNTERS = ['multi_counters']

const initialState = {
  counterIds: [],
  counters: {},
}

export const getCounterSelectors = lodash.memoize((counterId) =>
  createCounterSelectors({path: [...PATH_MULTI_COUNTERS, 'counters', counterId]})
)

export const setInitialState = (state) =>
  setIn(state, PATH_MULTI_COUNTERS, initialState, true)

export const counterIdsSelector = (state) =>
  getIn(state, [...PATH_MULTI_COUNTERS, 'counterIds'])
