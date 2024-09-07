import React from 'react'
import './styles/notification.css'

const Notification = ({message}) => {
    if(message === null) {
        return null
    }
  return (
    <div className='notification'>
        {message}
    </div>
  )
}

export default Notification