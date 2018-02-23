import React from 'react'
import {NavLink, Route} from 'react-router-dom'
import SingleCounter from './counter_single/Counter'
import TwoCounters from './two_counters/TwoCounters'

const Home = () => 'Encapsulated redux components example'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/single-counter">Single counter</NavLink>
        <NavLink to="/two-counters">Two counters</NavLink>
        <Route path="/" exact component={Home} />
        <Route path="/single-counter" component={SingleCounter} />
        <Route path="/two-counters" component={TwoCounters} />
      </div>
    )
  }
}

export default App
