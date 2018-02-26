import React from 'react'
import {counterActions1, counterActions2} from './actions'
import {counterSelectors1, counterSelectors2} from './selectors'
import counterCreator from './counterCreator/component'

const FirstCounter = counterCreator({actions: counterActions1, selectors: counterSelectors1})
const SecondCounter = counterCreator({actions: counterActions2, selectors: counterSelectors2})

const TwoCounters = () => (
  <div>
    Two independent selectors connected to their state subparts
    <FirstCounter />
    <SecondCounter />
  </div>
)

export default TwoCounters
