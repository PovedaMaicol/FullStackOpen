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
  const [notify, setNotify] = useState<{ message: string, type: string } | null>(null)

  useEffect(() => {
    const fetchVuelos = async () => {
      const data =  await getAllVuelos();
      setVuelos(data)
    }
    // getAllVuelos().then(data => {
    //   if (data) {
    //     setVuelos(data)
    //   }
    // });
    fetchVuelos();
  }, []);

  const vueloCreation = async (event: React.SyntheticEvent) => {
    event.preventDefault();

    const vueloToAdd = {
      date: newDate,
      weather: newWeather,
      visibility: newVisibility,
      comment: newComment
    };

    try {
      const data = await createVuelo(vueloToAdd);
      if (data && !('error' in data)) {
        setVuelos(vuelos.concat(data));
        setNotify({ message: 'Vuelo creado con éxito', type: 'success' });
      } else {
        setNotify({ message: data.error || 'Error en la creación del vuelo.', type: 'error' });
      }
    } catch (error) {
      setNotify({ message: 'Ocurrió un error inesperado.', type: 'error' });
    }

    setDate('');
    setWeather('');
    setVisibility('');
    setComment('');

    setTimeout(() => {
      setNotify(null);
    }, 5000);
  };

  return (
    <>
    <h1>Add new entry</h1>
    <Notification message={notify?.message || ''} type={notify?.type || ''}/>
    <form onSubmit={vueloCreation}>
      <div>
      <label>date</label>
      <input
      type='date'
      value={newDate}
      placeholder='date'
      onChange={(event: React.ChangeEvent<HTMLInputElement>) => setDate(event.target.value)}
      />
      </div>
      
      <br/>

      <fieldset style={{display: 'flex'}}>

      <legend>Weather:</legend>

      <div>
      <input
      type='radio'
      id='sunny'
      name='weather'
      value='sunny'
      checked={newWeather === 'sunny'}
      onChange={() => setWeather('sunny')}
      />
      <label htmlFor='sunny'>sunny</label>
      </div>

      <div>
      <input
      type='radio'
      id='rainy'
      name='weather'
      value='rainy'
      checked={newWeather === 'rainy'}
      onChange={() => setWeather('rainy')}
      />
      <label htmlFor='rainy'>rainy</label>
      </div>

      <div>
      <input
      type='radio'
      id='cloudy'
      name='weather'
      value='cloudy'
      checked={newWeather === 'cloudy'}
      onChange={() => setWeather('cloudy')}
      />
      <label htmlFor='cloudy'>cloudy</label>
      </div>

      <div>
      <input
      type='radio'
      id='stormy'
      name='weather'
      value='stormy'
      checked={newWeather === 'stormy'}
      onChange={() => setWeather('stormy')}
      />
      <label htmlFor='stormy'>stormy</label>
      </div>

      <div>
      <input
      type='radio'
      id='windy'
      name='weather'
      value='windy'
      checked={newWeather === 'windy'}
      onChange={() => setWeather('windy')}
      />
      <label htmlFor='windy'>windy</label>
      </div>

      </fieldset>

      <br/>


      <fieldset style={{display:'flex'}}>
      
      <legend>Visibility</legend>
      <div>
      <input
      type='radio'
      id='great'
      name='visibility'
      value='great'
      checked={newVisibility === 'great'}
      onChange={() => setVisibility('great')}
      />
      <label htmlFor='great'>great</label>
      </div>

      <div>
      <input
      type='radio'
      id='good'
      name='visibility'
      value='good'
      checked={newVisibility === 'good'}
      onChange={() => setVisibility('good')}
      />
      <label htmlFor='good'>good</label>
      </div>

      <div>
      <input
      type='radio'
      id='ok'
      name='visibility'
      value='ok'
      checked={newVisibility === 'ok'}
      onChange={() => setVisibility('ok')}
      />
      <label htmlFor='ok'>ok</label>
      </div>

      <div>
      <input
      type='radio'
      id='poor'
      name='visibility'
      value='poor'
      checked={newVisibility === 'poor'}
      onChange={() => setVisibility('poor')}
      />
      <label htmlFor='poor'>poor</label>
      </div>
      </fieldset>


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
