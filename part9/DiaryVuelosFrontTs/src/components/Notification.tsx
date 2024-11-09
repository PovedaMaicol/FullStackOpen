import React from 'react';

interface NotificationProps {
  message?: string | null;
  type: string | null;
}

const Notification: React.FC<NotificationProps> = ({ message, type }) => {
    if(message === null) {
        return null
    }
    const notificationStyle = {
      color: type === 'error' ? 'red' : 'green',
      background: 'lightgrey',
      fontSize: '20px',
      border: `2px solid ${type === 'error' ? 'red' : 'green'}`,
      borderRadius: '5px',
      padding: '10px',
      marginBottom: '10px'
    };


  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification