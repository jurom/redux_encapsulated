import {actions, PATH_CUSTOM_COUNTER} from './reducers'

export const increaseCounter = (amount) => ({
  type: actions.INCREASE_BY,
  path: [...PATH_CUSTOM_COUNTER, 'value'],
  value: amount,
})
