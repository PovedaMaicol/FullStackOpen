import React from 'react'
import { useState } from 'react'
import { useField } from '../hooks'



const CreateNew = (props) => {

const content = useField('text')
const author = useField('text')
const info = useField('text')


const handleSubmit = (e) => {
e.preventDefault()
console.log('content es' ,content)
props.addNew({
content: content.inputProps.value,
author: author.inputProps.value,
info: author.inputProps.value,
votes: 0
})

props.notificationDispatch({
  type: 'create',
  payload: content.inputProps.value
})
setTimeout(() => {
  props.notificationDispatch({ type: 'clear'})
}, 5000)
}

const handleReset = () => {
  content.reset()
  author.reset()
  info.reset()
}

  return (
    <div>
       <h2>create a new anecdote</h2>
       <form onSubmit={handleSubmit}>
       <div>content
       <input name='content' {...content.inputProps} />
       </div>
       <div>author
       <input name='author' {...author.inputProps} />
       </div>
       <div> url for more info
       <input name='info' {...info.inputProps} />
       </div>

       <div>
        <button type='submit'>create</button>
        <button type='button' onClick={handleReset}>reset</button>
        </div>
       
       </form>
    </div>
  )
}

export default CreateNew