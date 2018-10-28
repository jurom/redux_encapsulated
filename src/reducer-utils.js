import {generateId} from './utils'

export const registeredReducers = {}

export const registerReducer = (reducerDefinition) => {
  const scopedReducer = ({
    ...reducerDefinition,
    type: `${reducerDefinition.type}---${generateId()}`,
  })

  registeredReducers[scopedReducer.type] = scopedReducer

  return scopedReducer
}
