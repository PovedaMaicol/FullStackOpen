// import { useSelector, useDispatch } from 'react-redux'
// import { addVote } from './reducers/anecdoteReducer'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'

// ↑↑ se usa 'react-redux' para conectarse a la store de redux y manejar los votos de las anecdotas
// useSelector --> accedo al estado almacenado en la store desde un componente React
// useDispatch --> es la forma en que interactuo con la store para cambiar su estado

const App = () => {


  return (
    <div>
      <h2>Anecdotes</h2>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App