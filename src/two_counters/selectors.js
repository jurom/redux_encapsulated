import {compose, setIn} from '../utils'
import createCounterSelectors from './counterCreator/selectors'

export const PATH_TWO_COUNTERS_SCREEN = ['two_counters']
/// Some other things related to this screen, unrelated to the counters could be stored here...

const _setInitialState = (state) =>
  setIn(state, PATH_TWO_COUNTERS_SCREEN, {}, true)

const PATH_TWO_COUNTERS_COUNTERS = [...PATH_TWO_COUNTERS_SCREEN, 'counters']

const PATH_TWO_COUNTERS_COUNTERS_1 = [...PATH_TWO_COUNTERS_COUNTERS, 'first']

const PATH_TWO_COUNTERS_COUNTERS_2 = [...PATH_TWO_COUNTERS_COUNTERS, 'second']

export const counterSelectors1 = createCounterSelectors({path: PATH_TWO_COUNTERS_COUNTERS_1})
export const counterSelectors2 = createCounterSelectors({path: PATH_TWO_COUNTERS_COUNTERS_2})

export const setInitialState = compose(
  counterSelectors1.setInitialState,
  counterSelectors2.setInitialState,
  _setInitialState,
)
