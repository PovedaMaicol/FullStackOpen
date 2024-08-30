import React from 'react'
import { useQueryClient, useMutation } from 'react-query';
import blogService from '../services/blogs'
import { useState } from 'react';



const AddBlog = ({ setFormVisible, notificationDispatch}) => {

  const queryClient = useQueryClient()



  
  const newBlogMutation = useMutation({ 
    mutationFn: blogService.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs']})
    }
  })

  const addNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = { title, author, url };
 newBlogMutation.mutate(blogObject)
    setAuthor('')
    setTitle('')
    setUrl('')
    notificationDispatch({ 
            type: 'create', 
            payload: blogObject.title 
          });
          setTimeout(() => {
            notificationDispatch({ type: 'clear'})
          }, 5000);
        }
      


        const [title, setTitle] = useState('')
        const [author, setAuthor] = useState('')
        const [url, setUrl] = useState('')

  
  return (
    <form onSubmit={addNewBlog}>
      <h2>Create new Blog</h2>
    <div>
      title:
        <input
        data-testid='title'
        type="text"
        value={title}
        name="Title"
        placeholder='title'
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author:
        <input
        data-testid='author'
        type="text"
        value={author}
        name="Author"
        placeholder='author'
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url:
        <input
        data-testid='url'
        type="text"
        value={url}
        name="Url"
        placeholder='url'
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit" onClick={() => setFormVisible(false)}>Add</button>
    <button onClick={(e) => { e.preventDefault(); setFormVisible(false); }}>Cancel</button>

  </form>  
  )
}

export default AddBlog