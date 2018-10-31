import {COUNTER_MODES} from '../../constants'

// Actions require selectors. Instead of importing them statically, we'll abstract them into
// a factory, that gets the selectors and returns a set of actions.
// This allows to use the selectors created dynamically by a factory.
export default ({selectors}) => {

  const {
    path,
    counterModeSelector,
  } = selectors

  const changeCounterBy = (count) => ({
    type: 'Change counter',
    payload: {count},
    path: [...path, 'count'],
    reducer: (state, {count}) => state + count,
  })

  const _switchMode = (mode) => ({
    type: 'Switching mode',
    path: [...path, 'mode'],
    payload: {mode},
    reducer: (state, {mode}) => mode,
  })

  const switchMode = () =>
    (dispatch, getState) => {
      const currentMode = counterModeSelector(getState())
      const modes = Object.values(COUNTER_MODES).sort()
      return dispatch(_switchMode(modes[(modes.indexOf(currentMode) + 1) % modes.length]))
    }

  const changeCounter = ({positive}) =>
    (dispatch, getState) => {
      const mode = counterModeSelector(getState())

      dispatch(changeCounterBy({
        [COUNTER_MODES.SIMPLE]: 1,
        [COUNTER_MODES.DOUBLE]: 2,
      }[mode] * (positive ? 1 : -1)))
    }

  return {
    changeCounter,
    switchMode,
  }
}
