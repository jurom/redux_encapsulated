import createCounterActions from './counterCreator/actions'
import {counterSelectors1, counterSelectors2} from './selectors'

export const counterActions1 = createCounterActions({selectors: counterSelectors1})
export const counterActions2 = createCounterActions({selectors: counterSelectors2})

/// Some other actions related to this screen could be here ..
