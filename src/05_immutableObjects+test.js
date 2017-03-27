import expect from 'expect'
import deepFreeze from 'deep-freeze'

const toggleTodo = todo => {
  // todo.completed = !todo.completed
  // return todo

  return Object.assign({}, todo, { // собирает новый объект первый аргумент - объект для мутации {} следующие - свойства нового объекта. Последние свойства перекрывают предыдущие - нужно использовать полифилл
    completed: !todo.completed
  })
}

const testToggleTodo = () => {
  const todoBefore = {
    id: 0,
    test: 'Learn Redux',
    completed: false
  }
  const todoAfter = {
    id: 0,
    test: 'Learn Redux',
    completed: true
  }

  deepFreeze(todoBefore)

  expect(
    toggleTodo(todoBefore)
  ).toEqual(todoAfter)
}

testToggleTodo()
console.log('All tests passed')
