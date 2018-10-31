import _ from 'lodash'
import {forwardReducerTo} from '../../utils'

// In reduced-redux, the action and reducer is tightly coupled. Only one reducer is always matched.
// This allows for updating multiple parts of the state with a single action, simply by dispatching an array of actions.

// We need to distinguish between a reduced-redux action and reduced-redux-serialized actions,
// as both are co-existing here, and both listen to array of actions.
const isReducedReduxAction = (action) => action.reducer != null && action.path != null

// Transforms an array of reduced-redux actions into a single reduced-redux action,
// which contains the reducers from dispatched actions composed into a single action.
export default (store) => (next) => (actions) => {
  if (_.isArray(actions)) {
    if (actions.every(isReducedReduxAction)) {
      const newAction = {
        type: `Batched dispatch: [${actions.map(({type}) => type).join(', ')}]`,
        // Add the actions to dispatch for debugging purposes
        actions,
        path: [],
        // Compose the reducers.
        reducer: actions.reduce((intermediateReducer, currentAction) =>
          // Take reducer and its path, and create a reducer that operates on the whole state
          (state) => forwardReducerTo(currentAction.reducer, currentAction.path)(
            intermediateReducer(state), currentAction.payload
          ),
        _.identity),
      }
      next(newAction)
    } else if (actions.some(isReducedReduxAction)) {
      // eslint-disable-next-line max-len
      throw new Error(`Some of the dispatched actions are reduced-redux, some not. Actions: ${actions.map(({type}) => type || 'UNKNOWN').join(', ')}`)
    } else {
      next(actions)
    }
  } else {
    next(actions)
  }
}
