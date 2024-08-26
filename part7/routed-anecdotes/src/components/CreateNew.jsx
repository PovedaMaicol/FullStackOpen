import React from 'react'
import { useState } from 'react'
import { useField } from '../hooks'



const CreateNew = (props) => {
// const [content, setContent] = useState('')
// const [author, setAuthor] = useState('')
// const [info, setInfo] = useState('')

const content = useField('text')
const author = useField('text')
const info = useField('text')


const handleSubmit = (e) => {
e.preventDefault()
console.log('content es' ,content)
props.addNew({
content: content.value,
author: author.value,
info: author.value,
votes: 0
})

props.notificationDispatch({
  type: 'create',
  payload: content.value
})
setTimeout(() => {
  props.notificationDispatch({ type: 'clear'})
}, 5000)
}

  return (
    <div>
       <h2>create a new anecdote</h2>
       <form onSubmit={handleSubmit}>
       <div>content
       <input name='content' {...content} />
       </div>
       <div>author
       <input name='author' {...author} />
       </div>
       <div> url for more info
       <input name='info' {...info} />
       </div>

       <div>
        <button>create</button>
        <button>reset</button>
        </div>
       
       </form>
    </div>
  )
}

export default CreateNew