import './App.css'
import React from 'react'
import {NavLink, Route, Redirect} from 'react-router-dom'
import SingleCounter from './counter_single/Counter'
import TwoDependentCounters from './counter_single/TwoDependentCounters'
import TwoCounters from './two_counters/TwoCounters'
import MultipleCounters from './multiple_counters/MultipleCounters'
import CounterState from './counter_state'
import CustomCounter from './custom_reducer_counters/Counter'

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App__links">
          <NavLink to="/stateful">Stateful counter</NavLink>
          <NavLink to="/single-counter">Single counter</NavLink>
          <NavLink to="/two-dependent-counters">Two counters - dependent</NavLink>
          <NavLink to="/two-counters">Two counters</NavLink>
          <NavLink to="/multiple-counters">Multiple counters</NavLink>
          <NavLink to="/custom-counter">Custom counter</NavLink>
        </div>
        <div className="App__content">
          <Route path="/" exact render={() => <Redirect to={{pathname: '/single-counter'}} />} />
          <Route path="/stateful" component={CounterState} />
          <Route path="/single-counter" component={SingleCounter} />
          <Route path="/two-dependent-counters" component={TwoDependentCounters} />
          <Route path="/two-counters" component={TwoCounters} />
          <Route path="/multiple-counters" component={MultipleCounters} />
          <Route path="/custom-counter" component={CustomCounter} />
        </div>
      </div>
    )
  }
}

export default App
