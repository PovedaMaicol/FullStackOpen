import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [search, setSearch] = useState('') // maneja el valor de input
  const [getCountries, setGetCountries] = useState([]) // maneja la lista de paises obtenidos 
  const [selectCountry, setSelectCountry] = useState(null)

  // estado Clima ciudad
  const [selectWeather, setSelectWeather] = useState({})
  const saveCountry = (countri) => {
  setSelectCountry(countri)
  }

  const APIkey = import.meta.env.VITE_API_KEY;

  // weather map
  // const APIkey = '2334bfb071c9ea1cf54cb6aad47f423f';



  useEffect(() => {
    console.log('el efecto corre cuando cambia el valor de search', search)
  if (search) {
    console.log('cuando ahi algo en search se carga la api')
    setSelectCountry(null)
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then(response => {
        const filterCountries = response.data.filter(pais => pais.name.common.toLowerCase().includes(search.toLowerCase())
      );
      setGetCountries(filterCountries);
      console.log(getCountries)
      })
      .catch(error => {
        console.log(error)
      });
  } else {
     setGetCountries([])
}
}, [search]);

useEffect(() => {
  const fetchWeather = (city) => {
    axios
      .get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${APIkey}`)
      .then(response => {
        console.log(response.data)
        setSelectWeather(response.data);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  };

  if (getCountries.length === 1) {
    console.log('cuando se traiga un solo país se ejecuta el efecto', getCountries);
    let city = getCountries[0].capital[0].toLowerCase();
    console.log(city);
    fetchWeather(city);
  }

  if (selectCountry) {
    console.log('cuando selectCountry sea true se ejecuta el efecto', selectCountry);
    let city = selectCountry.capital[0].toLowerCase();
    console.log(city);
    fetchWeather(city);
  }
}, [getCountries, selectCountry]);


  

  const handleChange = (event) => {
    setSearch(event.target.value)
  }
  return (
    <div>
      <form onSubmit={e => e.preventDefault()}>
        Pais <input value={search} onChange={handleChange} />
      </form>
    
    <ul>
      {

       getCountries.length === 1 ? (
        getCountries.map(country => 
          <div key={country.name.common}>
            <h2>{country.name.common}</h2>
            <br/>
            <h4>capital {country.capital}</h4>
            <h4>area: {country.area}</h4>
            <br/>
            <ul>
              <h4>Languages</h4>
              {
                Object.values(country.languages).map((lang, i) => (
                  <li key={i}>{lang}</li>
                ))
              }
            </ul>
            <br/>
            <img src={country.flags.svg} style={{ width: '300px' }}/>
            <br/>
            <h2>{`Weather in ${country.name.common}`}</h2>
            <h4>{`Temperature: ${Math.floor((selectWeather?.main?.temp - 273.15) * 100) / 100} Celsius`}</h4>

            <figure>
                <img
                  className='weather_img'
                  src={`https://openweathermap.org/img/wn/${selectWeather?.weather?.[0]?.icon}@2x.png`}
                  alt='weather-icon'
                />
              </figure>
            <h4>{`Wind ${selectWeather?.wind?.speed} m/s`}</h4>
          </div>
        ))  
        :

      
        getCountries.length > 9 ? (
          <h2>Too many matches, specify another filter</h2>
        )
        :
        (
          getCountries.map(countri => 
            <li key={countri.name.common}>{countri.name.common}<button onClick={() => saveCountry(countri)}>show</button></li>
          )
        )}

{selectCountry && (
          <div>
            <h2>{selectCountry.name.common}</h2>
            <br/>
            <img src={selectCountry.flags.svg} style={{ width: '300px' }} alt={`Flag of ${selectCountry.name.common}`} />
            <br/>
            <h4>Capital: {selectCountry.capital}</h4>
            <h4>Área: {selectCountry.area}</h4>
            <br/>
            <ul>
              <h4>Idiomas</h4>
              {Object.values(selectCountry.languages).map((lang, index) => (
                <li key={index}>{lang}</li>
              ))}
            </ul>
            <h2>{`Weather in ${selectCountry.name.common}`}</h2>
            <h4>{`temperature ${selectWeather?.main.temp} Celcius`}</h4>
            <figure>
                <img 
                className='weather_img'
                src={`https://openweathermap.org/img/wn/${selectWeather?.weather?.[0].icon}@2x.png`} alt='weather-icon' 
                />
            </figure>
            <h4>{`Wind ${selectWeather?.wind?.speed} m/s`}</h4>
          </div>
        )}
    </ul>
    </div>

    
  )
}

export default App