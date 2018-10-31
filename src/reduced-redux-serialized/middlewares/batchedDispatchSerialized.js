import _ from 'lodash'

const BATCH_DISPATCH = '__BATCH_DISPATCH__'

export const enhanceWithBatchedDispatch = (rootReducer) => (state, action) => {
  if (action.type === BATCH_DISPATCH) {
    const newState = action.actions.reduce(
      (intermediateState, action) => rootReducer(intermediateState, action),
      state
    )
    return newState
  } else {
    // It's a single action
    return rootReducer(state, action)
  }
}

export const batchedDispatchSerialized = (store) => (next) => (actions) => {
  if (_.isArray(actions)) {
    next({
      type: BATCH_DISPATCH,
      actions,
    })
  } else {
    // It's a single action
    next(actions)
  }
}
