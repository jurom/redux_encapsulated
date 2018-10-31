# Reduced-redux component reusability

This example demonstrates how to reuse components which are connected to some part of the state.

All of the actions and selectors are now related to a dynamic *path* in state, because we explicitly dispatch it with every action.
The idea is to create a factory of selectors, actions and components related to this dynamic path.