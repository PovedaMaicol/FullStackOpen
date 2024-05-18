import './App.css'
import Note from './components/Note'



function App({notes}) {


  return (
  <div>
  
      <h1>Notes</h1>
      <ul>
      {
      // KEY NORMAL 
      notes.map(note => 
       <Note key={note.id} note={note}/>

      // ANTIPATRON -> se puede usar como key, pero NO SE RECOMIENDA
      // notes.map((note, i) => 
      // <li key={i}>
      //   {note.content}
      // </li>
      // )

      )}
      </ul>
      
  </div>
  )
}

export default App

// NOTAS 
// el metodo map recibe como segundo parametro el index de cada elemento que se itera

