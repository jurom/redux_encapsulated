import {PATH_SINGLE_COUNTER} from './state'

export const increaseCounter = () => ({
  type: 'Increasing counter',
  path: [...PATH_SINGLE_COUNTER, 'count'],
  reducer: (state) => state + 1,
})

export const decreaseCounter = () => ({
  type: 'decreaseCounter',
  path: [...PATH_SINGLE_COUNTER, 'count'],
  reducer: (state) => state - 1,
})
