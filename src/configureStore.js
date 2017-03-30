import {loadState, saveState} from './localStorage'
import throttle from 'lodash/throttle'
import {createStore} from 'redux'
import {todoApp} from './reducers'

export default function configureStore() {
  const persistedState = loadState()

  const store = createStore(todoApp, persistedState)

  store.subscribe(throttle(() => { // throttle гарантирует что мы вызываем функцию не чаще раза в секунду
    saveState({
      todos: store.getState().todos
    })
  }, 1000))

  return store
}
