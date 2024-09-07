import React from 'react'
import { useQueryClient, useMutation } from 'react-query';
import blogService from '../services/blogs'
import { useState } from 'react';



const AddBlog = ({ setFormVisible, notificationDispatch}) => {

  const queryClient = useQueryClient()


  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')


  
  const newBlogMutation = useMutation({ 
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({ queryKey: ['blogs']});
      // reset fields form
      setAuthor('')
      setTitle('')
      setUrl('')
      // close form
      setFormVisible(false)
      // notification
      notificationDispatch({ 
        type: 'create', 
        payload: newBlog.title 
      });
      setTimeout(() => {
        notificationDispatch({ type: 'clear'})
      }, 5000);
    },
    onError: (error) => {
      console.error('Error creating blog:', error);
      notificationDispatch({ type: 'error' });
      setTimeout(() => {
        notificationDispatch({ type: 'clear' });
      }, 5000);
    },
  })

  const addNewBlog = async (event) => {
    event.preventDefault()
    const blogObject = { title, author, url };
 newBlogMutation.mutate(blogObject)
        }
      


  
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
    <button type="submit">Add</button>
    <button onClick={(e) => { e.preventDefault(); setFormVisible(false); }}>Cancel</button>

  </form>  
  )
}

export default AddBlog