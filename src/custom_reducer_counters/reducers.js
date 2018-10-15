import {setIn, getIn, forwardReducerTo} from '../utils'

export const actions = ({
  INCREASE_BY: 'INCREASE_BY',
})

export const PATH_CUSTOM_COUNTER = ['customCounter']

export const setInitialState = (state) =>
  setIn(state, PATH_CUSTOM_COUNTER, {
    value: 0,
  }, true)

export const reducers = ({
  [actions.INCREASE_BY]: ({path, value}) => (state) => forwardReducerTo((localState) => localState + value, path)(state),
})

export const counterDataSelector = (state) =>
  getIn(state, PATH_CUSTOM_COUNTER)
