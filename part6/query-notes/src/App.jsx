import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import { createNote, getNotes } from "../services/request"


const App = () => {

  const queryClient = useQueryClient()
  // useQueryClient() es un hook de React Query que proporciona acceso al QueryClient, el cual es la instancia que maneja la cache de todas las consultas (queries) y mutaciones (mutations) en tu aplicación.

  const newNoteMutation = useMutation({
  
  //useMutation es un hook de React Query usado para realizar mutaciones, es decir, para realizar operaciones que cambian los datos en el servidor (como crear, actualizar o eliminar un recurso).

    mutationFn: createNote,
    onSuccess: (newNote) => {
      const notes = queryClient.getQueryData(['notes'])
      queryClient.setQueryData(['notes'], notes.concat(newNote))
    }
  })
  const addNote = async (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    console.log(content)
  }

  const toggleImportance = (note) => {
    console.log('toggle importance of', note.id)
  }

  const result = useQuery({
    queryKey: ['notes'],
    queryFn: getNotes,
    refetchOnWindowFocus: false
  })
  console.log(JSON.parse(JSON.stringify(result)))

  if ( result.isLoading ) {
    return <div>loading data...</div>
  }

  const notes = result.data

  return(
    <div>
      <h2>Notes app</h2>
      <form onSubmit={addNote}>
        <input name="note" />
        <button type="submit">add</button>
      </form>
      {notes.map(note =>
        <li key={note.id} onClick={() => toggleImportance(note)}>
          {note.content} 
          <strong> {note.important ? 'important' : ''}</strong>
        </li>
      )}
    </div>
  )
}

export default App