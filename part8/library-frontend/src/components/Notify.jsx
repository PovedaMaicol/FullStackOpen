import React from 'react'
import { Alert } from 'react-bootstrap'

const Notify = ({message}) => {
    if ( message === null) {
        return null
      }
  return (
    <div >
      {
        message && 
        <Alert style={{
     
          backgroundColor: 'white',
          borderColor: '#ffecaa',
          padding: '10px 20px',
          margin: '10px 0',
          position: 'fixed', // Posición fija
          top: '30px', // Controla la distancia desde la parte superior de la pantalla
          left: '50%', // Posición horizontal en el 50% de la pantalla
          transform: 'translateX(-50%)', // Mueve la notificación para que quede centrada horizontalmente
          zIndex: 1000, // Asegura que esté por encima de otros elementos
          width: 'auto', // Ajusta el tamaño según el contenido
          maxWidth: '300px', // Limita el ancho máximo
          borderRadius: '8px', // Bordes redondeados
          lineHeight: '1'
          }} variant='success'>
          {message}
        </Alert>
      }
    </div>
  )
}

export default Notify