import React from 'react'
import {NavLink, Route, Redirect} from 'react-router-dom'
import SingleCounter from './counter_single/Counter'
import TwoCounters from './two_counters/TwoCounters'
import MultipleCounters from './multiple_counters/MultipleCounters'
import CounterState from './counter_state'

class App extends React.Component {
  render() {
    return (
      <div>
        <NavLink to="/stateful">Stateful counter</NavLink>
        <NavLink to="/single-counter">Single counter</NavLink>
        <NavLink to="/two-counters">Two counters</NavLink>
        <NavLink to="/multiple-counters">Multiple counters</NavLink>
        <Route path="/" exact render={() => <Redirect to={{pathname: '/single-counter'}} />} />
        <Route path="/stateful" component={CounterState} />
        <Route path="/single-counter" component={SingleCounter} />
        <Route path="/two-counters" component={TwoCounters} />
        <Route path="/multiple-counters" component={MultipleCounters} />
      </div>
    )
  }
}

export default App
