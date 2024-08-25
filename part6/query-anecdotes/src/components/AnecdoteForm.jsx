import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote, updateAnecdote } from "../server"

const AnecdoteForm = ({notificationDispatch}) => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: (newAnecdote) => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})

      notificationDispatch({
        type: 'create',
        payload: newAnecdote.content
      })
      setTimeout(() => {
        notificationDispatch({ type: 'clear' });
      }, 5000);
    }

    
  })

  const onCreate = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log('new anecdote')
    if(content.length > 4) {
      newAnecdoteMutation.mutate({content, votes: 0})
    } else {
      notificationDispatch({type: 'error'})
      setTimeout(() => {
        notificationDispatch({ type: 'clear' });
      }, 5000);
    }
  
}

  return (
    <div>
      <h3>create new</h3>
      <form onSubmit={onCreate}>
        <input name='anecdote' />
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
