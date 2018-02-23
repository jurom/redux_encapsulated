import React from 'react'
import {NavLink, Route} from 'react-router-dom'
import SingleCounter from './counter_single/Counter'

const Home = () => 'Encapsulated redux components example'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/single-counter">Single counter</NavLink>
        <Route path="/" exact component={Home} />
        <Route path="/single-counter" component={SingleCounter} />
      </div>
    )
  }
}

export default App
