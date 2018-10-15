import {Provider} from 'react-redux'
import {Router} from 'react-router-dom'
import React from 'react'
import App from './App'
import DevTools from './DevTools'

// Note(jurom): Root component is here so that
// hot reload of react works.
// We also need to get store as a prop
// because Provider does not like changing of stores
export default ({store, history}) => (
  <Provider store={store}>
    <div>
      <Router history={history}>
        <App />
      </Router>
      <DevTools />
    </div>
  </Provider>
)
