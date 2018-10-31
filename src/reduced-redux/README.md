# Reduced-redux principles

This folder contains examples on how to use reduced-redux.

Instead of dispatching an action and then matching it against a reducer, we dispatch the reducer directly. The actions should look like this:

```
const someAction = (arg1, arg2) => ({
  type: 'Some action happened',
  payload: {arg1, arg2},
  path: ['path', 'to', 'subState'],
  reducer: (state, {arg1, arg2}) => ({
    ... new substate
  })
})
```
The reducer in the action gets a substate on the given path as a parameter, and should return a new substate on the given path.
Check for examples in one of the folders.

The type doesn't need to be unique anymore, because it's not used anywhere else but logging.
