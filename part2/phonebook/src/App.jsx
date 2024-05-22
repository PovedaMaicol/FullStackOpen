import { useEffect, useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from './services/contacts'

function App() {
 const [persons, setPersons] = useState([])
 const [newName, setNewName] = useState('')
 const [newNumber, setNewNumber] = useState('')
 const [search, setSearch] = useState('')



 const deletePersonOf = (id) => {
  if(window.confirm("Are you sure you want to delete this contact?")){
    console.log(`Deleting person with id ${id}`)
    contactService
    .destroy(id)
    .then(() => {
      setPersons(persons.filter(person => person.id !== id))
    })
    .catch(error => {
      console.error('There was an error deleting the person', error)
    })
  }

 }


 // GET ALL
 useEffect(() => {
  contactService
   .getAll()
   .then(initialContacts => {
    console.log('completed')
    setPersons(initialContacts)
  }) 
 }, [])


 // UPDATE
 const updateContact = (id) => {
  const contact = persons.find(per => per.id === id)
  const changedContact = {...contact, number: newNumber}

  contactService
  .update(id, changedContact)
  .then(() => {
    console.log(`this is the ${id}`)
    setPersons(persons.map(person => person.id !== id ? person : changedContact))
    setNewName('');
  setNewNumber('')
  })
  .catch(error => {
   console.log(error)
  })
  
}

// POST
 const addContact = (event) => {
  event.preventDefault()
    const contactObject = {  name: newName, number: newNumber} 
    console.log(contactObject)

let found = false;

persons.forEach(person => {

//
  if(normalize(person.name) === normalize(newName)) {

    if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
     const idToUpdate = person.id;
     updateContact(idToUpdate)
    

    contactObject.name = '';
    setNewName('');
    setNewNumber('')
    found = true;
  }
}
});
  if(!found && contactObject.name !== '' && contactObject.number !== ''){
    contactService
    .create(contactObject)
    .then(returnedContacts => {
      setPersons([...persons,returnedContacts]);
      setNewName('');
      setNewNumber('');
    })
    .catch(error => {
      console.error('There was an error creating the contact', error)
    })
   
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
    <Persons  coincidences={coincidences} deletePerson={deletePersonOf}/>
    </div>
)
}

export default App
