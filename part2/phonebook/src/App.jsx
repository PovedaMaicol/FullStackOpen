import { useEffect, useState } from 'react'
import './App.css'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import Persons from './components/Persons'
import contactService from './services/contacts'
import Notification from './components/Notification'
import {Routes,Route, useNavigate} from 'react-router-dom'
import CardPerson from './components/CardPerson'


function App() {
 const [persons, setPersons] = useState([])
 const [newName, setNewName] = useState('')
 const [newNumber, setNewNumber] = useState('')
 const [newMail, setNewMail] = useState('')
 const [newBirthday, setNewBirthday] = useState('')
 const [search, setSearch] = useState('')
 const [idUpdate, setIdUpdate] = useState()
 const [isEdit, setIsEdit] = useState(false)
 const [isContact, setIsContact] = useState()
const [notificationMessage, setNotificationMessage] = useState('nulls')
 const navigate = useNavigate();



 
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


 
 // UPDATE TODO
 const updatePersonOf = (person) => {
  setIdUpdate(person.id)
  doRegister()
  setNewName(person.name)
  setNewMail(person.gmail)
  setNewNumber(person.number)
  setNewBirthday(person.birthday)
  setIsEdit(true)
  console.log(person, person.id)

 }


 // UPDATE POR REPEAT
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
    setNotificationMessage('This contact is not saved to the phonebook')
    setTimeout(() => {
    setNotificationMessage(null)
    }, 5000)
   console.log(error)
  })
  
}

// POST
 const addContact = (event) => {
  event.preventDefault()


  if(isEdit) {
    const updateCont = {name: newName, number: newNumber, gmail: newMail, birthday: newBirthday}

    contactService
    .update(idUpdate, updateCont)
    .then(() => {
      console.log(`this is the ${idUpdate}`)
      setPersons(persons.map(person => person.id !== idUpdate ? person : updateCont))
      doHome()
      setNewName('')
      setNewMail('')
      setNewNumber('')
      setNewBirthday('')
    })
  } else {
    const contactObject = {  name: newName, number: newNumber, gmail: newMail, birthday: newBirthday } 
    

    let found = false;
    
    persons.forEach(person => {
    
    //
      if(normalize(person.name) === normalize(newName) && newNumber) {
    
        if(window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
         const idToUpdate = person.id;
         updateContact(idToUpdate)
        
    
        contactObject.name = '';
        setNewName('');
        setNewNumber('')
        found = true;
        doHome()
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
          setNewMail('');
          setNewBirthday('')
          setNotificationMessage(`Added ${contactObject.name}`)
          setIsEdit(false)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          navigate("/")
           
        })
        .catch(error => {
          console.log('error es: ', error, 'error.response.data.error es: ', error.response.data.error )
          setNotificationMessage(error.response.data.error)
          setTimeout(() => {
            setNotificationMessage(null)
          }, 5000)
          // console.error('There was an error creating the contact', error.response.data.error)
        })
       
      }else{
        setNewName('');
        setNewNumber('');

  }
   
  }

// persons.forEach(persona => {
// persona.name.toUpperCase().trim() === contactObject.name.toUpperCase().trim() ? contactObject.name = '' :   setPersons(persons.concat(contactObject))
// setNewName('')
// })

  

  // console.log('la persona es', contactObject)
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
  const handleChangeMail = (event) => {
    console.log(event.target.value)
    setNewMail(event.target.value)
  }
  const handleChangeBirthday = (event) => {
    console.log(event.target.value)
    setNewBirthday(event.target.value)
  }


// navegar a rutas
  const doHome = () => {
    navigate("/")
    setNewName('')
    setNewMail('')
    setNewNumber('')
    setNewBirthday('')
    setIsEdit(false)
  } 

  const doRegister = () => {
      navigate("register") 
  }

  const doContact = (person) => {
    // console.log(person)
    navigate("contact")
    console.log(`this is the person ${person}`)
    setIsContact(person)
    console.log('contact is', isContact)
 
  }

 


 return (
  <div className='app'>
    <div className='contenedor-phonebook'>
   

    
   
  
      <Routes>
        <Route 
          path='/' 
            element={
            <>
            
               
              <Filter 
              searchContact={searchContact} 
              search={search} 
              handleChangeSearch={handleChangeSearch}
              doRegister={doRegister}
              />
           
              <Notification message={notificationMessage}/>
              
              <Persons  
              coincidences={coincidences} deletePerson={deletePersonOf} updatePerson={updatePersonOf} doContact={doContact}
            
              />
            </>
            } 
            />

            <Route 
            path='register' 
            element={
            <PersonForm 
            notificationMessage={notificationMessage}
            addContact={addContact}
            newName={newName}
            handleChangeName={handleChangeName}
            newNumber={newNumber}
            handleChangeNuber={handleChangeNuber}
            newMail={newMail}
            handleChangeMail={handleChangeMail}
            newBirthday={newBirthday}
            handleChangeBirthday={handleChangeBirthday}
            doHome={doHome} />
            }
            />
<Route path='contact' element={<CardPerson doHome={doHome}  contact={isContact}/>}/>

      </Routes>
  


{/* <h2>Add a contatc</h2> */}
{/* <br/>
    <PersonForm 
    addContact={addContact}
    newName={newName}
    handleChangeName={handleChangeName}
    newNumber={newNumber}
    handleChangeNuber={handleChangeNuber}
    /> */}

    {/* <h2>Numbers</h2> */}
    
    </div>
    </div>
)
}

export default App
