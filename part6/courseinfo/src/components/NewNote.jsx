import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

// El hook useDispatch proporciona acceso a cualquier componente de React a la función dispatch de redux-store definida en main.jsx. Esto permite que todos los componentes realicen cambios en el estado de Redux store.


const NewNote = () => {

  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote