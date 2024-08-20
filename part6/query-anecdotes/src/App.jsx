import { useMutation, useQuery} from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import { createAnecdote, getAnecdotes } from './server'

const App = () => {

  const newAnecdoteMutation = useMutation({ mutationFn: createAnecdote})

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.input.value
    event.target.input.value = ''
    newAnecdoteMutation.mutate({content, votes: 0})
  }

  const handleVote = (anecdote) => {
    console.log('vote')
  }

  const result = useQuery({
    queryKey: ['anecdotes'],
    queryFn: getAnecdotes,
    retry: 1
  })
  console.log(JSON.parse(JSON.stringify(result)))
  console.log(result.status)

  if (result.isLoading) {
    return <div>Loading...</div>
  }

  if(result.status === 'error') {
    return <div>Anecdote service not available due to problems in server</div>
  }

  const anecdotes = result.data

  return (
    <div>
      <h3>Anecdote app</h3>
    
      <Notification />
      <AnecdoteForm />
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => handleVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
