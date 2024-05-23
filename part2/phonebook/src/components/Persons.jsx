import React from 'react'
import './styles/person.css'
const Persons = ({coincidences, deletePerson}) => {
  console.log(coincidences)
  return (
    <ul className='grid-container'>
      {
        coincidences.map(person => 
<li key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></li>

        
          
        )
      }
    </ul>
  )

}

export default Persons