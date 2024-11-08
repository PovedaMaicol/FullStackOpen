import React, { useEffect, useState } from 'react'
import { Vuelo } from './types'
import { createVuelo, getAllVuelos } from './services/vuelosService';
import Notification from './components/Notification';


function App() {
  const [vuelos, setVuelos] = useState<Vuelo[]>([]);
  const [newVuelo, setNewVuelo] = useState({});

  const [newDate, setDate] = useState<string>('');
  const [newWeather, setWeather] = useState<string>('')
  const [newVisibility, setVisibility] = useState<string>('')
  const [newComment, setComment] = useState<string>('')
  const [notify, setNotify] = useState(null)

  useEffect(() => {
    getAllVuelos().then(data => {
      if (data) {
        setVuelos(data)
      }
    });
  }, []);

  const vueloCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const vueloToAdd = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    };
    createVuelo(vueloToAdd)
    .then(data => {
      if (data) {
        setVuelos(vuelos.concat(data))
      }
    })
  

    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');
  };

  return (
    <>
    <h1>Add new entry</h1>
    <Notification message={notify}/>
    <form onSubmit={vueloCreation}>
      <input
      type='date'
      value={newDate}
      placeholder='date'
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDate(event.target.value)}
      />
      <br/>

      <input
      value={newWeather}
      placeholder='weather'
      onChange={(event) => setWeather(event.target.value)}
      />
      <br/>

      <input 
      value={newVisibility}
      placeholder='visibility'
      onChange={(event) => setVisibility(event.target.value)}/>
      <br/>

      <input
      value={newComment}
      placeholder='comment'
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
