import React from 'react'
import {  useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteForm = () => {

    
  const dispatch = useDispatch()

    const addAnecdote = (event) => {
        event.preventDefault()
        const content = event.target.anecdote.value.trim();
        event.target.anecdote.value = '';
        if(content) {
          dispatch(createAnecdote(content))
        } else {
          console.log('No se puede crear una anécdota vacía');
        }
     
      }

  return (
    <div>
         <h2>create new</h2>
      <form onSubmit={addAnecdote}>
        <div><input name='anecdote'/></div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm