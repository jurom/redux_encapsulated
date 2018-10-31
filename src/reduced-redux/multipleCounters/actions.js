import lodash from 'lodash'
import {generateId} from '../../utils'
import {PATH_MULTI_COUNTERS, getCounterSelectors} from './selectors'

import createCounterActions from '../counterFactory/actions'

const _addCounterToList = (counterId) => ({
  type: 'Adding counter to counter list',
  payload: {counterId},
  path: [...PATH_MULTI_COUNTERS, 'counterIds'],
  reducer: (state, {counterId}) => [
    ...state,
    counterId,
  ],
})

const initializeCounterState = ({counterId, setInitialState}) => ({
  type: 'Initialize counter state',
  payload: {counterId},
  path: [],
  reducer: (state) => setInitialState(state),
})

// Memoization is important here so we don't get a new set of
// actions with each call.
export const getCounterActions = lodash.memoize((counterId) =>
  createCounterActions({selectors: getCounterSelectors(counterId)})
)

export const addCounter = () =>
  (dispatch, getState) => {
    const counterId = generateId()
    const {setInitialState} = getCounterSelectors(counterId)
    dispatch(initializeCounterState({counterId, setInitialState}))
    dispatch(_addCounterToList(counterId))
  }
