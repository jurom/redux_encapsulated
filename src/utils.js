import React from 'react'
import assert from 'assert'
import lodash from 'lodash'

const _hasOwnProp = (obj, key) => {
  assert(typeof key === 'string' || typeof key === 'number', 'bad key type')
  assert(key !== '', 'empty key') // empty key is a terrible idea in general

  // Fun fact: "ab".hasOwnProperty(1) -> true
  if (typeof obj !== 'object') return false
  // Fun fact: typeof null === 'object'
  if (!obj) return false
  // Ok, now we are reasonably sure this is a valid object
  // Func fact: ({hasOwnProperty:()=>true}).hasOwnProperty("blah") -> true
  return Object.prototype.hasOwnProperty.call(obj, `${key}`)
}
/*
 * Apply function composition.
 * compose(f,g,h)(x) is equivalent to f(g(h(x)))
 */

export const compose = (f, ...fs) => fs.length > 0 ? (x) => f(compose(...fs)(x)) : f

export const forwardReducerTo = (reducer, path) => (
  (state, payload) => {
    const dummy = {}
    const oldValue = getIn(state, path, {last: dummy})
    const newValue = reducer(oldValue !== dummy ? oldValue : undefined, payload)
    return setIn(state, path, newValue)
  }
)

export function getIn(state: any, path: (string | number)[], {last, any} = {}) {
  checkValidPath(path)
  let value = state
  for (let i = 0; i < path.length; i++) {
    if (_hasOwnProp(value, path[i])) {
      value = value[path[i]]
    } else {
      if (i === path.length - 1 && last !== undefined) {
        return last
      } else if (any !== undefined) {
        return any
      } else {
        throwError('getIn', state, path.slice(0, i + 1), value)
      }
    }
  }
  return value
}

export function setIn(state: any, path: (string|number)[], val:any, force?:boolean = false) {
  checkValidPath(path, 0)
  if (path.length === 0) {
    return val
  }
  return recursiveUpdate('setIn', state, state, path, 0, () => val, force)
}

function recursiveUpdate(taskName, state, resolvedState, path, index, fn, force = false) {
  const key = path[index]
  let shallowCopy = cloneObject(resolvedState)
  if (!shallowCopy && force) {
    shallowCopy = {}
  }
  if (path.length - 1 === index) {
    // Note(ppershing): we cannot simply use shallowCopy[key] here.
    // Counterexample: "ab"[0], etc. (see _hasOwnProp)
    const old = _hasOwnProp(shallowCopy, key) ? shallowCopy[key] : undefined
    shallowCopy[key] = fn(old)
  } else {
    if (!_hasOwnProp(shallowCopy, key)) {
      if (force) {
        shallowCopy[key] = {}
      } else {
        throwError(taskName, state, path.slice(0, index + 1), shallowCopy)
      }
    }
    shallowCopy[key] = recursiveUpdate(taskName, state,
      shallowCopy[key], path, index + 1, fn, force)
  }
  return shallowCopy
}

function checkValidPath(path, minLength = 0) {
  if (!(path instanceof Array) || path.length < minLength) {
    throw new Error(`Expected path to be non-empty array, got: ${path}`)
  }
  // path may consist only of numbers and strings
  for (let e of path) {
    if (!((typeof e === 'string') || (typeof e === 'number'))) {
      throw new TypeError(`Path contains element that is not a number or a string. Path: ${path} Element: ${e}`)
    }
  }
}

function throwError(taskName, state, pathSegment, value) {
  /* eslint-disable no-console */
  console.error(`${taskName} failed - can not find
    ${pathSegment[pathSegment.length - 1]} in ${JSON.stringify(value)}`)
  console.error('State: ', state)
  console.error('Path (until failure): ', pathSegment)
  /* eslint-enable no-console */
  throw new Error(`${taskName} Can not find ${pathSegment[pathSegment.length - 1]} in
  ${JSON.stringify(value)}`)
}

function cloneObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (lodash.isArray(obj)) return [...obj]
  return {...obj}
}


export const bindClosures = (closureMap) =>
  (BaseComponent) => class BindClosures extends React.Component {
    componentWillMount = () => {
      this.closures = lodash.mapValues(
        closureMap,
        (fn) => (...args) => fn(this.props, ...args)
      )
    }

    render = () => <BaseComponent {...{...this.props, ...this.closures}} />
  }
