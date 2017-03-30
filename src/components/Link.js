import React from 'react'

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

export default Link
