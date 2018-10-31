import './App.css'
import React from 'react'
import {NavLink, Route, Redirect} from 'react-router-dom'
import SingleCounter from './reduced-redux/singleCounter/Counter'
import TwoDependentCounters from './reduced-redux/singleCounter/TwoDependentCounters'
import TwoCounters from './reduced-redux/twoCounters/TwoCounters'
import MultipleCounters from './reduced-redux/multipleCounters/MultipleCounters'
import CounterState from './stateful-react'
import SerializableCounter from './reduced-redux-serialized/Counter'
import StandardCounter from './standard-redux/Counter'

const Link = ({children, ...props}) => (
  <NavLink {...props} className="App__links__link">{children}</NavLink>
)

class App extends React.Component {
  render() {
    return (
      <div className="App">
        <div className="App__links">
          <Link to="/stateful">Stateful counter</Link>
          <Link to="/standard">standard redux counter</Link>
          <Link to="/single-counter">Single counter</Link>
          <Link to="/two-dependent-counters">Two counters - dependent</Link>
          <Link to="/two-counters">Two counters</Link>
          <Link to="/multiple-counters">Multiple counters</Link>
          <Link to="/serializable-counter">Serializable counter</Link>
        </div>
        <div className="App__content">
          <Route path="/" exact render={() => <Redirect to={{pathname: '/single-counter'}} />} />
          <Route path="/stateful" component={CounterState} />
          <Route path="/standard" component={StandardCounter} />
          <Route path="/single-counter" component={SingleCounter} />
          <Route path="/two-dependent-counters" component={TwoDependentCounters} />
          <Route path="/two-counters" component={TwoCounters} />
          <Route path="/multiple-counters" component={MultipleCounters} />
          <Route path="/serializable-counter" component={SerializableCounter} />
        </div>
      </div>
    )
  }
}

export default App
