import React from 'react'
// import './styles/notification.css'
import { Alert } from 'react-bootstrap'

const Notification = ({message}) => {
    if(message === null) {
        return null
    }
  return (
    <div style={{
      paddingTop: '10px', 
      position: 'fixed', 
      // top: '50%', 
      // left: '50%', 
      // right: '50%',
      // transform: 'translate(-50%, -50%)', 
      display: 'flex', 
      justifyContent: 'center', 
    
      width: '100%' // Se ajusta al tamaño de la pantalla
    }}>
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