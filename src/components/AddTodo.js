import {v4} from 'node-uuid'
import {connect} from 'react-redux'
import React from 'react'

const addTodo = (text) => ({
  type: 'ADD_TODO',
  id: v4(),
  text
})

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

export default AddTodo
