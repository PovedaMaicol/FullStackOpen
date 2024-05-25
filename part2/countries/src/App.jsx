import React, { useEffect } from 'react'
import { useState } from 'react'
import axios from 'axios'

const App = () => {

  const [search, setSearch] = useState('') // maneja el valor de input
  const [getCountries, setGetCountries] = useState([]) // maneja la lista de paises obtenidos 
  const [selectCountry, setSelectCountry] = useState(null)
  const saveCountry = (countri) => {
  setSelectCountry(countri)
  }



  useEffect(() => {
    console.log('el efecto corre cuando cambia el valor de search', search)
  if (search) {
    console.log('cuando ahi algo en search se carga la api')
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
        getCountries.map(countri => 
          <div key={countri.name.common}>
            <h2>{countri.name.common}</h2>
            <br/>
            <h4>capital {countri.capital}</h4>
            <h4>area: {countri.area}</h4>
            <br/>
            <ul>
              <h4>Languages</h4>
              {
                Object.values(countri.languages).map((lang, i) => (
                  <li key={i}>{lang}</li>
                ))
              }
            </ul>
            <br/>
            <img src={countri.flags.svg} style={{ width: '300px' }}/>
          </div>
        ))  
        :

      
        getCountries.length > 9 ? (
          <h2>Too many matches, specify another filter</h2>
        )
        :
        
        getCountries.map(countri => 
            <li key={countri.name.common}>{countri.name.common}<button onClick={() => saveCountry(countri)}>show</button></li>
          )
      }

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
          </div>
        )}
    </ul>
    </div>

    
  )
}

export default App