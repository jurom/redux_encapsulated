import {getIn, setIn} from '../../utils'
import {COUNTER_MODES} from '../../constants'

export default ({path}) => {

  const initialState = {
    count: 0,
    mode: COUNTER_MODES.SIMPLE,
  }

  const counterModeSelector = (state) =>
    getIn(state, [...path, 'mode'])

  const counterCountSelector = (state) =>
    getIn(state, [...path, 'count'])

  const setInitialState = (state) =>
    setIn(state, path, initialState, true)

  return {
    path,
    counterModeSelector,
    setInitialState,
    counterCountSelector,
  }
}
