import {Provider} from 'react-redux'
import {ConnectedRouter} from 'connected-react-router'
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
      <ConnectedRouter history={history}>
        <App />
      </ConnectedRouter>
      {process.env.REACT_APP_DEVTOOLS ? <DevTools /> : null}
    </div>
  </Provider>
)
