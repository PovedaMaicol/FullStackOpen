import { useEffect, useState } from 'react'
import './App.css'
import Note from './components/Note'
import axios from 'axios'
import noteService from './services/notes'




function App() {
const [notes, setNotes] = useState([])
const [newNote, setNewNote] = useState('')
const [showAll, setShowAll] = useState(true) 

// solicitud GET
useEffect(() => {
  noteService
  .getAll()
  .then(initialNotes => {
    setNotes(initialNotes)
  })
}, [])

// añadir una nota
const addNote = (event) => {
  event.preventDefault()
  const noteObject = {
    content: newNote,
    important: Math.random() < 0.5,
    id: notes.length + 1
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
      alert(
        `the note '${note.content}' was already deleted from server`
      )
      setNotes(notes.filter(n => n.id !== id))
    })
}

const handleNoteChange = (event) => {
  console.log(event.target.value)
  setNewNote(event.target.value)
}



  // notas importantes
  const noteToShow = showAll
  ? notes 
  :
  notes.filter(note => note.important)


  return (
    <div>
      <h1>Notes</h1>
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
    </div>
  )
}

export default App

// NOTAS 
// el metodo map recibe como segundo parametro el index de cada elemento que se itera

