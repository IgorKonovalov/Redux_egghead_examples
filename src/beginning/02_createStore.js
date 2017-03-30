import {createStore} from 'redux'

export const counter = (state = 0, action) => {
  switch (action.type) {
    case 'INCREMENT':
      return state + 1
    case 'DECREMENT':
      return state - 1
    default:
      return state
  }
}


const createStoreImplementation = (reducer) => {
  let state
  let listeners = []

  const getState = () => state

  const dispatch = action => {
    state = reducer(state, action)
    listeners.forEach(listener => listener())
  }

  const subscribe = listener => {
    listeners.push(listener)
    return () => {
      listeners = listeners.filter(l !== listener)
    }
  }

  dispatch({})

  return {getState, dispatch, subscribe}
}

const store = createStoreImplementation(counter) // то же что и createStore от redux

const render = () => {
  document.body.innerText = store.getState()
}

store.subscribe(render)

document.addEventListener('click', () => {
  store.dispatch({type: 'INCREMENT'})
})
