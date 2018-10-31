import {setIn, getIn} from '../utils'
import {registerReducer} from '../reducer-utils'

export const PATH_SERIALIZABLE_COUNTER = ['serializableCounter']

export const setInitialState = (state) =>
  setIn(state, PATH_SERIALIZABLE_COUNTER, {
    value: 0,
  }, true)


export const increaseCounter = registerReducer({
  type: 'Change counter by',
  path: [...PATH_SERIALIZABLE_COUNTER, 'value'],
  reducer: (state, action) => state + action.amount,
})

export const counterDataSelector = (state) =>
  getIn(state, PATH_SERIALIZABLE_COUNTER)
