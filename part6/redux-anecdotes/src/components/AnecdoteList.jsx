import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { like } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => state.anecdotes)

    const vote = (id) => {
      console.log(id)
        dispatch(like(id))
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
    </div>
  )
}

export default AnecdoteList