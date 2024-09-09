import React from 'react'
// import './styles/notification.css'
import { Alert } from 'react-bootstrap'

const Notification = ({message}) => {
    if(message === null) {
        return null
    }
  return (
    <div className='container'>
      {(message &&
  <Alert variant='success'>
  {message}
  </Alert>
      )

      }
    
       
    </div>
  )
}

export default Notification