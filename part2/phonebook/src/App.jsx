import { useEffect, useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import axios from 'axios'

function App() {
 const [persons, setPersons] = useState([])
 const [newName, setNewName] = useState('')
 const [newNumber, setNewNumber] = useState('')
 const [search, setSearch] = useState('')

 useEffect(() => {
  console.log('effect')
  axios
   .get('http://localhost:3001/persons')
   .then(response => {
    console.log('completed')
    setPersons(response.data)
  }) 
 }, [])

 // guardar el nuevo nombre en un objeto
 // prevenir la recarga del formulario
 // guardar el objeto que tiene el nuevo nombre en persons
 // seteo newName  en ''

 const addContact = (event) => {
  event.preventDefault()
    const contactObject = {  name: newName, number: newNumber} 
    console.log(contactObject)

 

let found = false;

persons.forEach(person => {
  if(normalize(person.name) === contactObject.name.toUpperCase().trim().replace(/\s+/g, '')) {
    contactObject.name = '';
    setNewName('');
    setNewNumber('')
    alert(`${newName} is already added to phonebook`);
    found = true;
  }
});
  if(!found && contactObject.name !== '' && contactObject.number !== ''){
    setPersons([...persons,contactObject]);
    setNewName('');
    setNewNumber('');
  }else{
    setNewName('');
    setNewNumber('');
  }

// persons.forEach(persona => {
// persona.name.toUpperCase().trim() === contactObject.name.toUpperCase().trim() ? contactObject.name = '' :   setPersons(persons.concat(contactObject))
// setNewName('')
// })

  

  console.log('la persona es', contactObject)
  console.log('en personas esta', persons)
 }


 const searchContact = (event) => {
  event.preventDefault()
 }

 // NORMALIZAR NOMBRES
 const normalize = (text) => text.toUpperCase().trim().replace(/\s+/g, '');

 // NORMALIZAR BUSQUEDA
 const normalizedSearch = search ? normalize(search) : '';
 
 const coincidences =  search ?  persons.filter(person => normalize(person.name).includes(normalizedSearch)) : persons;

  // para que el input setee lo que escribo
  const handleChangeName = (event) => {
    console.log(event.target.value)
      setNewName(event.target.value)
  }
  const handleChangeNuber = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }
  const handleChangeSearch = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
  }

 return (
  <div>
    <h2>Phonebook</h2>
<Filter 
searchContact={searchContact} 
search={search} 
handleChangeSearch={handleChangeSearch}
/>

<h2>Add a contatc</h2>

    <PersonForm 
    addContact={addContact}
    newName={newName}
    handleChangeName={handleChangeName}
    newNumber={newNumber}
    handleChangeNuber={handleChangeNuber}
    />

    <h2>Numbers</h2>
    <Persons coincidences={coincidences}/>
    </div>
)
}

export default App