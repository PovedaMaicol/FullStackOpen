import { useEffect, useState } from 'react'
import { Vuelo } from './types'
import { getAllVuelos } from './services/vuelosService';


function App() {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);

  useEffect(() => {
    getAllVuelos().then(data => {
      setVuelos(data)
    })
  }, [])

  return (
    <>
    <h1>Add new entry</h1>


    <ul>
      {
        vuelos.map(vuelo => 
          <li key={vuelo.id}>{vuelo.weather}</li>
        )
      }
    </ul>


    
      
    </>
  )
}

export default App
