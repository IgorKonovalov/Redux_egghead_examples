import React from 'react'
import {connect} from 'react-redux'
import Link from './Link'

const setVisibilityFilter = (filter) => ({
  type: 'SET_VISIBILITY_FILTER',
  filter: filter
})

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

export default FilterLink
