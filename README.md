# Reduced redux

Example project with reduced-redux and demonstration of its features.

## Motivation

Standard redux has some additional verbosity that might not be very convenient for the programmer.
For every action, regardless of how simple it is, you are required to create a unique type, an action creator, and a reducer.
This creates sort of a boilerplate and scatters logic through multiple places, which makes Redux unattractive.

We are reducing the boilerplate simply by adding reducer to dispatched action.

## Overview

The project contains simple counters programmed in different fashions.

- stateful-react - regular stateful react component
- standard-redux - standard redux boilerplate for a counter
- reduced-redux - reduced redux implementation for a counter, with batched dispatches and redux component reusability
- reduced-redux-serialized - reduced redux actions are not serializable, this is an experiment how to retain serializability, and logic in one place

## Installing

```
yarn
```

## Running

Generated using [create-react-app](https://github.com/facebook/create-react-app), hence you can start the project by
```
yarn start
```
