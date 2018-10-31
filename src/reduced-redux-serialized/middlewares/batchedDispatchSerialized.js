import _ from 'lodash'

const BATCH_DISPATCH = '__BATCH_DISPATCH__'

// The actions don't contain all the logic for what should happen to the state,
// hence we can't simply compose them. That's why we need to make the root reducer aware
// of this special, composed action - where it should take all of the actions and apply the
// root reducer to each of them, one by one.
// We implement this as a decorator, to be able to simply plug in / out this functionality.
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

// Middleware for transforming an array of serialized redux actions into a single action.
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
