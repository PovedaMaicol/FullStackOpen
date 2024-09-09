import React from 'react'
import { useQueryClient, useMutation } from 'react-query';
import blogService from '../services/blogs'
import { useState } from 'react';
import { Form, Button } from 'react-bootstrap';



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
    <Form onSubmit={addNewBlog}>
<br/>
    <Form.Group>
      Create new Blog
        <Form.Control
        data-testid='title'
        type="text"
        value={title}
        name="Title"
        placeholder='title'
        onChange={({ target }) => setTitle(target.value)}
      />
    </Form.Group>
    <Form.Group>
<br/>
        <Form.Control
        data-testid='author'
        type="text"
        value={author}
        name="Author"
        placeholder='author'
        onChange={({ target }) => setAuthor(target.value)}
      />
    </Form.Group>
    <Form.Group>
<br/>
        <Form.Control
        data-testid='url'
        type="text"
        value={url}
        name="Url"
        placeholder='url'
        onChange={({ target }) => setUrl(target.value)}
      />
    </Form.Group>
    <br/>

    <Form.Group style={{display: 'flex', justifyContent: 'space-around'}}>
    <Button type="submit">Add</Button>
    <Button onClick={(e) => { e.preventDefault(); setFormVisible(false); }}>Cancel</Button>
    </Form.Group>
    
  </Form>  
  )
}

export default AddBlog