import React from 'react'
import ReactDOM from 'react-dom'
import {configureStore, browserHistory} from './configureStore'
import Root from './Root'
import ErrorBoundary from './ErrorBoundary'

const app = document.getElementById('root')

const store = configureStore()

// Hot reload render.
// gist.github.com/gaearon/06bd9e2223556cb0d841#file-naive-js
/* eslint: *//* global module */
if (module.hot && typeof module.hot.accept === 'function') {
  module.hot.accept('./Root', () => {
    const NextRoot = require('./Root').default
    ReactDOM.render(
      <ErrorBoundary>
        <NextRoot {...{store, history: browserHistory}} />
      </ErrorBoundary>
      , app)
  })
}

ReactDOM.render(
  <ErrorBoundary>
    <Root {...{store, history: browserHistory}} />
  </ErrorBoundary>,
  app
)
