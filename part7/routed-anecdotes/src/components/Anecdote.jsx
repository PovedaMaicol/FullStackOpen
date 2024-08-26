import React from 'react'
import { Link, useParams } from 'react-router-dom'

const Anecdote = ({anecdotes}) => {
    const id = useParams().id
    const anecdote = anecdotes.find(n => n.id === Number(id))
  return (
    <div>
        <h2>{anecdote.content}</h2>
        <p>has {anecdote.votes} votes</p>
        <p>for more info <a href={`${anecdote.info}`}>{anecdote.info}</a></p>
    </div>
  )
}

export default Anecdote