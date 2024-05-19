import React from 'react'

const Persons = ({coincidences}) => {
  return (
    <ul>
      {
        coincidences.map(person => 
<li key={person.name}>{person.name} {person.number}</li>
        
          
        )
      }
    </ul>
  )
}

export default Persons