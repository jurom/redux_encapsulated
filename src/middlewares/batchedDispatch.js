import _ from 'lodash'
import {forwardReducerTo} from '../utils'

const isReducedReduxAction = (action) => action.reducer != null && action.path != null

export default (store) => (next) => (actions) => {
  if (_.isArray(actions)) {
    if (actions.every(isReducedReduxAction)) {
      const newAction = {
        type: `Batched dispatch: [${actions.map(({type}) => type).join(', ')}]`,
        actions,
        path: [],
        reducer: actions.reduce((intermediateReducer, currentAction) =>
          (state) => forwardReducerTo(currentAction.reducer, currentAction.path)(
            intermediateReducer(state), currentAction.payload
          ),
        _.identity),
      }
      next(newAction)
    } else if (actions.some(isReducedReduxAction)) {
      // eslint-disable-next-line max-len
      throw new Error(`Some of the dispatched actions are reduced redux, some not. Actions: ${actions.map(({type}) => type || 'UNKNOWN').join(', ')}`)
    } else {
      next(actions)
    }
  } else {
    next(actions)
  }
}
