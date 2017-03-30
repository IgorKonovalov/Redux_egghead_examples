/*eslint-disable*/
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import {v4} from 'node-uuid'

// ACTION CREATORS

let nextTodoId = 0
const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
})


const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter: filter
})


const toggleTodo = (id) => ({
  type: 'TOGGLE_TODO',
  id
})



const Link = ({ // presentational component - view only, doesn't know about state
  active,
  children,
  onClick
}) => {
  if (active) {
    return <span>{children}</span>
  }
  return (
    <a href="#"
        onClick = {e => {
          e.preventDefault()
          onClick()
        }}
    >
      {children}
    </a>
  )
}

const mapStateToLinkProps = (
  state,
  ownProps // см Footer компонент
) => ({active: ownProps.filter === state.visibilityFilter})
const mapDispatchToLinkProps = (
  dispatch,
  ownProps
) => ({
  onClick: (() => {dispatch(setVisibilityFilter(ownProps.filter))})
})

const FilterLink = connect(
  mapStateToLinkProps,
  mapDispatchToLinkProps
)(Link)

const Footer = () => (
  <p>
    Show:
    {' '}
    <FilterLink filter='SHOW_ALL'>
      All
    </FilterLink>,
    <FilterLink filter='SHOW_ACTIVE'>
      Active
    </FilterLink>,
    <FilterLink filter='SHOW_COMPLETED'>
      Completed
    </FilterLink>

  </p>
)

const Todo = ({
  onClick,
  completed,
  text
}) => (
  <li
      onClick = {onClick}
      style={{
        'textDecoration':
          completed ?
            'line-through' :
            'none'
      }}>
    {text}
  </li>
)

const TodoList = ({
  todos,
  onTodoClick
}) => (
  <ul>
    {todos.map(todo =>
        <Todo
          key = {todo.id}
          {...todo}
          onClick = {() => onTodoClick(todo.id)}
        />
      )}
  </ul>
)

let AddTodo = ({dispatch}) => {
  let input
  return (
    <div>
      <input ref = {node => {
        input = node
      }} />
      <button onClick = {() => {
        dispatch(addTodo(input.value))
        input.value = ''
      }}>
        Add Todo
      </button>
    </div>
  )
}
AddTodo = connect( // можно connect()(AddTodo) - по дефолту передает dispatch метод
  null,
  dispatch => {
    return {dispatch}
  }
)(AddTodo)

const getVisibleTodos = (
  todos,
  filter
) => {
  switch (filter) {
    case 'SHOW_ALL':
      return todos
    case 'SHOW_COMPLETED':
      return todos.filter(t => t.completed)
    case 'SHOW_ACTIVE':
      return todos.filter(t => !t.completed)
    default:
      return todos
  }
}

const mapStateToTodoListProps = (state) => ({
  todos: getVisibleTodos(
    state.todos,
    state.visibilityFilter
  )
})
const mapDispatchToTodoListProps = (dispatch) => ({
  onTodoClick: (id) => {
    dispatch(toggleTodo(id))
  }
})
const VisibleTodoList = connect( // react-redux создает контейнер компонент, и пропсы этого контейнера использует presentational компонент
  mapStateToTodoListProps,
  mapDispatchToTodoListProps
)(TodoList)


const TodoApp = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default TodoApp
