import {setIn, getIn, scopeReducers} from '../utils'

export const PATH_CUSTOM_COUNTER = ['customCounter']

const cReducer = scopeReducers('custom-counter')

export const setInitialState = (state) =>
  setIn(state, PATH_CUSTOM_COUNTER, {
    value: 0,
  }, true)


export const increaseCounter = cReducer({
  type: 'INCREASE_COUNTER',
  path: [...PATH_CUSTOM_COUNTER, 'value'],
  reducer: (state, action) => state + action.amount,
})

export const counterDataSelector = (state) =>
  getIn(state, PATH_CUSTOM_COUNTER)

export const reducers = [
  increaseCounter,
]
