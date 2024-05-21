import React from 'react'

const Persons = ({coincidences, deletePerson}) => {
  console.log(coincidences)
  return (
    <ul>
      {
        coincidences.map(person => 
<li key={person.id}>{person.name} {person.number} <button onClick={() => deletePerson(person.id)}>delete</button></li>

        
          
        )
      }
    </ul>
  )

}

export default Persons