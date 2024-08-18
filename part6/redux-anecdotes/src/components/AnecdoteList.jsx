import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { like } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification, setTimedNotification } from '../reducers/notificationSlice'
import { updateAnecdote } from '../reducers/anecdoteReducer'


const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => state.anecdotes)

    // const handleNotification = () => {
    //   dispatch(setNotification(`you voted ${}`))
    // }

    const vote = (anecdote) => {
      const anecdoteLike = { ...anecdote, votes: anecdote.votes + 1}
      dispatch(updateAnecdote(anecdote.id, anecdoteLike))

        dispatch(setTimedNotification(`you voted ${anecdote.content}`, 5))
       
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
            <button onClick={() => vote(anecdote)}>vote</button>
          </div>
        </div>
      )}
    </div>
  )
}

export default AnecdoteList