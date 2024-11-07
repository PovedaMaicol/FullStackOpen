import { useEffect, useState } from 'react'
import { Note } from './types';
import { createNote, getAllNotes } from './services/noteService';



const App = () => {
  const [newNote, setNewNote] = useState('');
  const [notes, setNotes] = useState<Note[]>([
    { id: 1, content: 'testing' }
  ]);

   // aqui uso asercion de tipo
   useEffect(() => {
    getAllNotes().then(data => {
      setNotes(data)
    })
    }, [])

  // handler event(add note a notes)
  const noteCreation = (event: React.SyntheticEvent) => {
    event.preventDefault()
    createNote({ content: newNote }).then(data => {
      setNotes(notes.concat(data))
    })
    setNewNote('')
  };

 

  return (
    <div>
      <form onSubmit={noteCreation}>
        <input
          value={newNote}
          onChange={(event) => setNewNote(event.target.value)} 
        />
        <button type='submit'>add</button>
      </form>

      <ul>
      {notes.map(note =>
        <li key={note.id}>{note.content}</li>
      )}
      </ul>
  </div>
  )
}

export default App;