import { useMutation, useQueryClient } from "@tanstack/react-query"
import { createAnecdote, updateAnecdote } from "../server"

const AnecdoteForm = () => {

  const queryClient = useQueryClient()

  const newAnecdoteMutation = useMutation({ 
    mutationFn: createAnecdote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['anecdotes']})
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
      console.log('la anecdota debe tener mas caracteres')
    }
  
}
const updateAnecdoteMutation = useMutation({
  mutationFn: updateAnecdote,
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['anecdotes']})
  }
})


  const updateVote = (anecdote) => {
    updateAnecdote.mutate({...anecdote, vote: anecdote.vote + 1})
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
