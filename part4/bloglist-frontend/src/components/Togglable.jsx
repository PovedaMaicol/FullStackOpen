import React from 'react'
import { useState } from 'react'

const Togglable = (props) => {
   const [formVisible, setFormVisible] = useState(false)

   const hideWhenVisible = { display: formVisible ? 'none' : '' }
   const showWhenVisible = { display: formVisible ? '' : 'none' }

   const toggleVisibility = () => {
    setFormVisible(!visible)
   }

  return (
    <div>
        <div style={hideWhenVisible}>
            <button onClick={toggleVisibility}>{props.buttonLabel}</button>
        </div>
        <div style={showWhenVisible}>
            {props.children}
            <button onClick={toggleVisibility}>cancel</button>
        </div>
    </div>
  )
}

export default Togglable