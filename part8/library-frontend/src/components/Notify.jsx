import React from 'react'
import { Alert } from 'react-bootstrap'

const Notify = ({message}) => {
    if ( message === null) {
        return null
      }
  return (
    <div style={{color: 'red'}}>
      {
        message && 
        <Alert variant='success'>
          {message}
        </Alert>
      }
    </div>
  )
}

export default Notify