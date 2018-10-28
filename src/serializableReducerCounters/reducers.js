import {setIn, getIn, scopeReducers} from '../utils'

export const PATH_SERIALIZABLE_COUNTER = ['serializableCounter']

const cReducer = scopeReducers('serializable-counter')

export const setInitialState = (state) =>
  setIn(state, PATH_SERIALIZABLE_COUNTER, {
    value: 0,
  }, true)


export const increaseCounter = cReducer({
  type: 'INCREASE_COUNTER',
  path: [...PATH_SERIALIZABLE_COUNTER, 'value'],
  reducer: (state, action) => state + action.amount,
})

export const counterDataSelector = (state) =>
  getIn(state, PATH_SERIALIZABLE_COUNTER)

export const reducers = [
  increaseCounter,
]
