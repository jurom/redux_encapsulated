import {generateId} from './utils'

export const registeredReducers = {}

// Responsible for registering the reduced-redux-serialized reducer to the root reducer.

export const registerReducer = (reducerDefinition) => {
  const scopedReducer = ({
    ...reducerDefinition,
    // You could ensure the type uniqueness like this, or some scoping.
    type: `${reducerDefinition.type}---${generateId()}`,
  })

  registeredReducers[scopedReducer.type] = scopedReducer

  return scopedReducer
}
