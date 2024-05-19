import { useState } from 'react'
import './App.css'
import Note from './components/Note'



function App(props) {
// const [notes, setNotes] = useState()
const [notes, setNotes] = useState(props.notes)
const [newNote, setNewNote] = useState('')
const [showAll, setShowAll] = useState(true) 

  const addNote = (event) => {
    event.preventDefault()

  // creamos el objeto que guarda la nueva nota
    const noteObject = {
      content: newNote,
      import: Math.random() < 0.5,
      id: notes.length + 1,
    }
    // guardamos la nota en notes
    setNotes(notes.concat(noteObject))
    setNewNote('')
    
  }

  // notas importantes
  const noteToShow = showAll
  ? notes 
  :
  notes.filter(note => note.important)

  const handleNoteChange = (event) => {
    console.log(event.target.value)
    setNewNote(event.target.value)
  }

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
          <Note key={note.id} note={note} />
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

