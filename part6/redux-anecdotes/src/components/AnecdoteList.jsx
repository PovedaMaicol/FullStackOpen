import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { like } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationSlice'


const AnecdoteList = () => {

    const dispatch = useDispatch()
    const anecdotes = useSelector((state) => state.anecdotes)

    // const handleNotification = () => {
    //   dispatch(setNotification(`you voted ${}`))
    // }

    const vote = (anecdote) => {
      // console.log(id)
      console.log(anecdote)
        dispatch(like(anecdote.id))
            console.log('vote', anecdote.id)
        dispatch(setNotification(`you voted ${anecdote.content}`))
        setTimeout(() => {
          dispatch(clearNotification());
        }, 5000)
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