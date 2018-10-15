import {createStore, compose, applyMiddleware} from 'redux'
import rootReducer from './rootReducer'
import {routerMiddleware} from 'react-router-redux'
import {createBrowserHistory} from 'history'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import DevTools from './DevTools'

export const browserHistory = createBrowserHistory()

export const configureStore = () => {
  const initialState = undefined
  const browserMiddleware = routerMiddleware(browserHistory)
  const loggerMiddleware = createLogger()

  const enhancer = compose(
    applyMiddleware(
      thunkMiddleware,
      browserMiddleware,
      loggerMiddleware,
    ),
    DevTools.instrument()
  )

  const store = createStore(rootReducer, initialState, enhancer)

  return store
}
