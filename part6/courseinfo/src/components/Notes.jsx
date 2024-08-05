import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}


const Notes = () => {
  const dispatch = useDispatch();
  const notes = useSelector((state) => {
    const { type, text } = state.filter;
    return state.notes.filter((note) => {
      const matchesType =
        type === 'ALL' ||
        (type === 'IMPORTANT' && note.important) ||
        (type === 'NONIMPORTANT' && !note.important);
      const matchesText = note.content
        .toLowerCase()
        .includes(text.toLowerCase());
      return matchesType && matchesText;
    });
  });

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes