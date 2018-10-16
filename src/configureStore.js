import {createStore, compose, applyMiddleware} from 'redux'
import rootReducer from './rootReducer'
import {connectRouter, routerMiddleware} from 'connected-react-router'
import {createBrowserHistory} from 'history'
import {createLogger} from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import DevTools from './DevTools'

export const browserHistory = createBrowserHistory()

export const configureStore = () => {
  const initialState = undefined
  const loggerMiddleware = createLogger()

  const store = createStore(
    connectRouter(browserHistory)(rootReducer),
    initialState,
    compose(
      applyMiddleware(
        routerMiddleware(browserHistory),
        thunkMiddleware,
        loggerMiddleware,
      ),
      process.env.REACT_APP_DEVTOOLS ? DevTools.instrument() : (_) => _
    )
  )

  return store
}
