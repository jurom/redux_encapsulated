import './App.css'
import React from 'react'
import {NavLink, Route, Redirect} from 'react-router-dom'
import SingleCounter from './counterSingle/Counter'
import TwoDependentCounters from './counterSingle/TwoDependentCounters'
import TwoCounters from './twoCounters/TwoCounters'
import MultipleCounters from './multipleCounters/MultipleCounters'
import CounterState from './counterState'
import CustomCounter from './customReducerCounters/Counter'
import TraditionalCounter from './traditionalReduxCounters/Counter'

const Link = ({children, ...props}) => (
  <NavLink {...props} className="App__links__link">{children}</NavLink>
)

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App__links">
          <Link to="/stateful">Stateful counter</Link>
          <Link to="/traditional">Traditional redux counter</Link>
          <Link to="/single-counter">Single counter</Link>
          <Link to="/two-dependent-counters">Two counters - dependent</Link>
          <Link to="/two-counters">Two counters</Link>
          <Link to="/multiple-counters">Multiple counters</Link>
          <Link to="/custom-counter">Custom counter</Link>
        </div>
        <div className="App__content">
          <Route path="/" exact render={() => <Redirect to={{pathname: '/single-counter'}} />} />
          <Route path="/stateful" component={CounterState} />
          <Route path="/traditional" component={TraditionalCounter} />
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
