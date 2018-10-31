import assert from 'assert'
import lodash from 'lodash'

/*
 * Checks whether obj[key] exists.
 * This is a helper function used by getIn
 */
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
 * Forward reducer transform to a particular state path.
 * If the last path element does not exist, reducer will get undefined
 * so that you can use reduce(state=initialState(), payload) => ...
 */
export const forwardReducerTo = (reducer, path) => (
  (state, payload) => {
    const dummy = {}
    const oldValue = getIn(state, path, {last: dummy})
    const newValue = reducer(oldValue !== dummy ? oldValue : undefined, payload)
    return setIn(state, path, newValue)
  }
)

/*
 * Lookups value on a specific path in a given state. If the lookup fails, the error is thrown
 * unless default value is specified. Last argument is a map of default values:
 * - last is used when access fails at last step
 * - any is used when access fails at any step
 */
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

/*
 * Sets a specific `path` in a `state` to a given value, immutable style.
 *
 * path: array of string keys
 * returns: new state
 */
export function setIn(state: any, path: (string|number)[], val:any, force?:boolean = false) {
  checkValidPath(path, 0)
  if (path.length === 0) {
    return val
  }
  return _recursiveUpdate('setIn', state, state, path, 0, () => val, force)
}

function _recursiveUpdate(taskName, state, resolvedState, path, index, fn, force = false) {
  const key = path[index]
  let shallowCopy = shallowCloneObject(resolvedState)
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
    shallowCopy[key] = _recursiveUpdate(taskName, state,
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

function shallowCloneObject(obj) {
  if (obj === null || typeof obj !== 'object') {
    return obj
  }
  if (lodash.isArray(obj)) return [...obj]
  return {...obj}
}

export const generateId = ():string =>
  `${Date.now()}-${Math.floor(Math.random() * 1000)}`
