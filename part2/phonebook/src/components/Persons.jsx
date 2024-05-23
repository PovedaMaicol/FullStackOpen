import React from 'react'
import './styles/person.css'
const Persons = ({coincidences, deletePerson}) => {
  console.log(coincidences)
  return (
    <ul className='grid-container'>
      {
        coincidences.map(person => 
<li key={person.id}>
  <div>
<i onClick={() => deletePerson(person.id)} className='bx bx-x borrar' ></i>
</div>

  <h1 className='identificador'>{person.name[0]}</h1>
    
  <div className='contact-info'> 
  <span className='contact-name'>{person.name}</span> 
  <span className='contact-number'>{person.number}</span>
   </div>
 
  

  
  </li>

        
          
        )
      }
    </ul>
  )

}

export default Persons