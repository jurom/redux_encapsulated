import React from 'react'
import Counter from './Counter'

// Mounting the redux components like this makes them connect to the same state.
// If we want to make them connect to independent states, but still share the code,
// check out ./multipleCounters or ./twoCounters

export default () => (
  <div>
    Redux counters connected to the same state
    <Counter />
    <Counter />
  </div>
)
