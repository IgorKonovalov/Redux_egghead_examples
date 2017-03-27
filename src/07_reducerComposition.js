import {createStore} from 'redux'

const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }
      return Object.assign({}, state, {completed: !state.completed})
    default:
      return state
  }
}

const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action) // reducer can call a reducer!
      ]
    case 'TOGGLE_TODO':
      return state.map(t => todo(t, action))
    default:
      return state
  }
}

const vidibilityFilter = ( // предположим мы захотели добавить функционал
  state = 'SHOW_ALL',
  action
) => {
  switch (action.type) {
    case 'SET_VISIBILITY_FILTER':
      return action.filter
    default:
      return state
  }
}

const todoApp = (state = {}, action) => { // может воспользоваться коспозицией -
  return {
    todos: todos(
      state.todos,
      action
    ),
    visibilityFilter: vidibilityFilter(
      state.visibilityFilter,
      action
    )
  }
}

const store = createStore(todoApp)
console.log('initial')
console.log(store.getState())
console.log('-------------------')
console.log('Dispatching ADD_TODO')

store.dispatch({
  type: 'ADD_TODO',
  id: 0,
  text: 'Learn Redux'
})
console.log('current st')
console.log(store.getState())

console.log('Dispatching ADD_TODO')

store.dispatch({
  type: 'ADD_TODO',
  id: 1,
  text: 'Go Shopping'
})

console.log('current st')
console.log(store.getState())

console.log('-------------------')

console.log('TOGGLE_TODO')
store.dispatch({
  type: 'TOGGLE_TODO',
  id: 0
})

console.log('current st')
console.log(store.getState())

console.log('SET_VISIBILITY_FILTER')
store.dispatch({
  type: 'SET_VISIBILITY_FILTER',
  filter: 'SHOW_COMPLETED'
})

console.log('current st')
console.log(store.getState())
