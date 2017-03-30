/*eslint-disable*/
import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {connect} from 'react-redux'
import AddTodo from './AddTodo'
import VisibleTodoList from './VisibleTodoList'
import Footer from './Footer'

const App = () => (
  <div>
    <AddTodo />
    <VisibleTodoList />
    <Footer />
  </div>
)

export default App
