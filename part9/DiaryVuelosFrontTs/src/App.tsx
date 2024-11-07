import { useEffect, useState } from 'react'
import { Vuelo } from './types'
import { createVuelo, getAllVuelos } from './services/vuelosService';


function App() {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [newVuelo, setNewVuelo] = useState({});

  const [newDate, setDate] = useState('');
  const [newWeather, setWeather] = useState('')
  const [newVisibility, setVisibility] = useState('')
  const [newComment, setComment] = useState('')

  useEffect(() => {
    getAllVuelos().then(data => {
      setVuelos(data)
    })
  }, [])

  const vueloCreation = (event: React.SyntheticEvent) => {
    event.preventDefault();

    const vueloToAdd = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    };
    createVuelo(vueloToAdd)
    .then(data => {
      setVuelos(vuelos.concat(data))
    })
  

    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  };

  return (
    <>
    <h1>Add new entry</h1>
    <form onSubmit={vueloCreation}>
      <input
      value={newDate}
      onChange={(event) => setDate(event.target.value)}
      />
      <br/>

      <input
      value={newWeather}
      onChange={(event) => setWeather(event.target.value)}
      />
      <br/>

      <input 
      value={newVisibility}
      onChange={(event) => setVisibility(event.target.value)}/>
      <br/>

      <input
      value={newComment}
      onChange={(event) => setComment(event.target.value)}
      />
      <br/>

      <button type='submit'>add</button>
    </form>


    <h3>Diary entries</h3>
    <ul style={{listStyle: 'none', padding: '0'}}>
      {
        vuelos.map(vuelo => 
          <li key={vuelo.id}> 
          <h4>{vuelo.date}</h4>
          visibility: {vuelo.visibility} <br/>
          weather: {vuelo.weather}
          </li>
        )
      }
    </ul>


    
      
    </>
  )
}

export default App
