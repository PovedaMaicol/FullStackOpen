import { useSelector, useDispatch } from 'react-redux'

// ↑↑ se usa 'react-redux' para conectarse a la store de redux y manejar los votos de las anecdotas
// useSelector --> accedo al estado almacenado en la store desde un componente React
// useDispatch --> es la forma en que interactuo con la store para cambiar su estado

const App = () => {
  const anecdotes = useSelector(state => state)
  //useSelector para acceder al estado global, que en este caso es una lista de anécdotas.

  const dispatch = useDispatch()
  // obtengo la función dispatch para enviar acciones a la store de Redux.

  const vote = (id) => {
dispatch({
  type: 'LIKE',
  data: {id}
})
    console.log('vote', id)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <form>
        <div><input /></div>
        <button>create</button>
      </form>
    </div>
  )
}

export default App