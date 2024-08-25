import { useMutation, useQuery, useQueryClient} from '@tanstack/react-query'
import AnecdoteForm from './components/AnecdoteForm'
import Notification from './components/Notification'
import axios from 'axios'
import { createAnecdote, getAnecdotes, updateAnecdote } from './server'
import { useReducer } from 'react'

const notificationReducer = (state, action) => {
  switch (action.type) {
    case "create":
      return `New anecdote created: ${action.payload}`;
    case "vote":
      return `Voted for: ${action.payload}`;
    case "error":
      return `too short anecdote, must have length 5 or more`;
    case "clear":
      return '';
    default:
      return state;
  
  }
}
const App = () => {

  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
 
    const queryClient = useQueryClient()
  // const handleVote = (anecdote) => {
  //   console.log('vote')
  // }

  const updateAnecdoteMutation = useMutation({
    mutationFn: updateAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries('anecdotes')
    }
  })
  
  
    const updateVote = (anecdote) => {
      console.log('anecdote es', anecdote)
      updateAnecdoteMutation.mutate({...anecdote, votes: anecdote.votes + 1},
        {
          onSuccess: () => {
            queryClient.invalidateQueries(['anecdotes']);

            notificationDispatch({
              type: 'vote',
              payload: anecdote.content,
            });

            setTimeout(() => {
              notificationDispatch({type: 'clear'})
            }, 5000)
          }
        }
      )
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
    
      <Notification message={notification} />
      <AnecdoteForm  notificationDispatch={notificationDispatch}/>
    
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => updateVote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
