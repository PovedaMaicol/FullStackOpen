import { useEffect, useState, useRef } from 'react'
import './App.css'
import Note from './components/Note'
import Notification from './components/Notification'
import axios from 'axios'
import noteService from './services/notes'
import Footer from './components/Footer'
import loginService from './services/login'
import Login from './services/login'
import LoginUser from './components/LoginUser'
import Togglable from './components/Togglable'
import NoteForm from './components/NoteForm'




function App() {
const [notes, setNotes] = useState([])
const [newNote, setNewNote] = useState('')
const [showAll, setShowAll] = useState(true) 
const [errorMessage, setErrorMessage] = useState(null)
const [username, setUsername] = useState('') 
const [password, setPassword] = useState('') 
const [user, setUser] = useState(null)
const [loginVisible, setLoginVisible] = useState(false)
const noteFormRef = useRef()

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  if(loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    noteService.setToken(user.token)
  }
}, [])

// solicitud GET
useEffect(() => {
  noteService
  .getAll()
  .then(initialNotes => {
    setNotes(initialNotes)
  })
}, [])

// // añadir una nota
// const addNote = (event) => {
//   event.preventDefault()
//   const noteObject = {
//     content: newNote,
//     important: Math.random() < 0.5
//   }

// solicitud POST
const addNote = (noteObject) => {
  noteFormRef.current.toggleVisibility()
  noteService
  .create(noteObject)
  .then(returnedNote => {
    setNotes(notes.concat(returnedNote))
  })

}



// cambiar el estado de la nota IMPORTANT/NOT IMPORTANT
const toggleImportanceOf = id => {

  if (!id) {
    console.error('ID is undefinded or null');
  }
  // const url = `http://localhost:3001/notes/${id}`
  console.log(`toggleImportanceOf called with id: ${id}`);
  console.log('Current notes state:', notes);

  const note = notes.find(n => n.id === id)

  if (!note) {
    console.error(`note with id: ${id}, not found`)
    return;
  }
  const changedNote = {...note, important: !note.important }
  console.log(`importance of ${id} needs to be toggled`)


// solicitud PUT(UPDATE)
    noteService
    .update(id, changedNote)
    .then(returnedNote => {
      setNotes(notes.map(note => note.id !== id ? note : returnedNote))
    })
    .catch(error => {
      setErrorMessage(
        `Note '${note.content}' was already removed from server`
      )
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
      setNotes(notes.filter(n => n.id !== id))
    })
}

const handleNoteChange = (event) => {
  console.log(event.target.value)
  setNewNote(event.target.value)
}

// hacer login 
const handleLogin = async (event) => {
  event.preventDefault()
  console.log('logging in with', username, password)

  try {
    const user = await loginService.login({
      username, password,
    })

    window.localStorage.setItem(
      'loggedNoteappUser', JSON.stringify(user)
    )

    noteService.setToken(user.token)
    setUser(user)
    setUsername('')
    setPassword('')
  } catch (exception) {
    setErrorMessage('Wrong credentials')
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }
}
// cerrar login 
const handleLogout = () => {
  window.localStorage.clear()
  setUser(null)
}



  // notas importantes
  const noteToShow = showAll
  ? notes 
  :
  notes.filter(note => note.important)


 // login visible - no visible

 const loginForm = () => {
  const hideWhenVisible = { display: loginVisible ? 'none' : '' }
  const showWhenVisible = { display: loginVisible ? '' : 'none' }

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={() => setLoginVisible(true)}>log in</button>
      </div>
      <div style={showWhenVisible}>
        <LoginUser
          handleLogin={handleLogin}
          setUsername={setUsername}
          setPassword={setPassword}
          username={username}
          password={password}
        />
        <button onClick={() => setLoginVisible(false)}>cancel</button>
      </div>
    </div>
  )
}



  // const noteForm = () => (
  //   <form onSubmit={addNote}>
  //     <input
  //       value={newNote}
  //       onChange={handleNoteChange}
  //     />
  //     <button type="submit">save</button>
  //   </form>  
  // )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>

      {!user && loginForm()}
      {user && <div>
       <p>{user.name} logged in</p>
       <button onClick={handleLogout}>exit</button>
       <Togglable buttonLabel="new note" ref={noteFormRef}>
        <NoteForm
       createNote={addNote}
        />
      </Togglable>
      </div>
     } 

      <div>
        <button onClick={() => setShowAll(!showAll)}>
          show {showAll ? 'important' : 'all'}
        </button>
      </div>
      <ul>
        {noteToShow.map(note => 
          <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)}/>
        )}
      </ul>
     
      <Footer/> 
    </div>
  )
}

export default App

// NOTAS 
// el metodo map recibe como segundo parametro el index de cada elemento que se itera

