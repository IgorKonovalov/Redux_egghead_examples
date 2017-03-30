import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import TodoApp from './app'
import {todoApp} from './reducers'
import {loadState} from './localStorage'

const persistedState = loadState()

const store = createStore(todoApp, persistedState)
console.log(store);

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)

module.hot.accept()
