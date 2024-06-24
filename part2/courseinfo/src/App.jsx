import { useEffect, useState } from 'react'
import './App.css'
import Note from './components/Note'
import Notification from './components/Notification'
import axios from 'axios'
import noteService from './services/notes'
import Footer from './components/Footer'
import loginService from './services/login'




function App() {
const [notes, setNotes] = useState([])
const [newNote, setNewNote] = useState('')
const [showAll, setShowAll] = useState(true) 
const [errorMessage, setErrorMessage] = useState(null)
const [username, setUsername] = useState('') 
const [password, setPassword] = useState('') 
const [user, setUser] = useState(null)

// solicitud GET
useEffect(() => {
  noteService
  .getAll()
  .then(initialNotes => {
    setNotes(initialNotes)
  })
}, [])

useEffect(() => {
  const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
  if(loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    setUser(user)
    noteService.setToken(user.token)
  }
}, [])
// añadir una nota
const addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5
  }

// solicitud POST
  noteService
  .create(noteObject)
  .then(returnedNote => {
    setNotes(notes.concat(returnedNote))
    setNewNote('')
  })
}


// cambiar el estado de la nota IMPORTANT/NOT IMPORTANT
const toggleImportanceOf = id => {
  const url = `http://localhost:3001/notes/${id}`
  const note = notes.find(n => n.id === id)
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



  // notas importantes
  const noteToShow = showAll
  ? notes 
  :
  notes.filter(note => note.important)


  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const noteForm = () => (
    <form onSubmit={addNote}>
      <input
        value={newNote}
        onChange={handleNoteChange}
      />
      <button type="submit">save</button>
    </form>  
  )

  return (
    <div>
      <h1>Notes</h1>
      <Notification message={errorMessage}/>

      {user === null ?
      loginForm() :
      <div>
      <p>{user.name} logged-in</p>
      {noteForm()}
    </div>
    }

<h2>Notes</h2>

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
      <form onSubmit={addNote}>
        <input 
        value={newNote} 
        onChange={handleNoteChange}/>
        <button type="submit">save</button>
      </form>  
      <Footer/> 
    </div>
  )
}

export default App

// NOTAS 
// el metodo map recibe como segundo parametro el index de cada elemento que se itera

