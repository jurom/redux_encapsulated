import React from 'react'
import {NavLink, Route} from 'react-router-dom'
import SingleCounter from './counter_single/Counter'
import TwoCounters from './two_counters/TwoCounters'
import MultipleCounters from './multiple_counters/MultipleCounters'

const Home = () => 'Encapsulated redux components example'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/single-counter">Single counter</NavLink>
        <NavLink to="/two-counters">Two counters</NavLink>
        <NavLink to="/multiple-counters">Multiple counters</NavLink>
        <Route path="/" exact component={Home} />
        <Route path="/single-counter" component={SingleCounter} />
        <Route path="/two-counters" component={TwoCounters} />
        <Route path="/multiple-counters" component={MultipleCounters} />
      </div>
    )
  }
}

export default App
