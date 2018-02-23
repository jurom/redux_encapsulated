import React from 'react'
import {NavLink} from 'react-router-dom'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/two-counters">Two counters</NavLink>
      </div>
    )
  }
}

export default App
