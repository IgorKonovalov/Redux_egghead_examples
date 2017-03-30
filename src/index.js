import React from 'react'
import ReactDOM from 'react-dom'
import {Provider} from 'react-redux'
import {createStore} from 'redux'
import TodoApp from './app'
import {todoApp} from './reducers'
import {loadState, saveState} from './localStorage'
import throttle from 'lodash/throttle'

const persistedState = loadState()

const store = createStore(todoApp, persistedState)

store.subscribe(throttle(() => { // throttle гарантирует что мы вызываем функцию не чаще раза в секунду
  saveState({
    todos: store.getState().todos
  })
}, 1000))

ReactDOM.render(
  <Provider store={store}>
    <TodoApp />
  </Provider>,
  document.getElementById('root')
)

module.hot.accept()
