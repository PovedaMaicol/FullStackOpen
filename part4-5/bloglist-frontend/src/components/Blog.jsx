import { useState, useEffect } from 'react'

import { useQueryClient, useMutation } from 'react-query'
import blogService from '../services/blogs'


const Blog = ({ blog, user, notificationDispatch }) => {

const queryClient = useQueryClient()

//UPDATE BLOG
const updateBlogMutation = useMutation({
  mutationFn: ({ id, updatedBlog }) => blogService.update(id, updatedBlog),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['blogs']})
  }, 
  onError: (error) => {
    console.error('Error updating blog', error);
    notificationDispatch({ type: 'error' });
    setTimeout(() => {
      notificationDispatch({ type: 'clear' });
    }, 5000);
  }
})

const handleLike = () => {
  const updatedBlog = ({...blog, likes: blog.likes + 1,user: blog.user.id || blog.user})

updateBlogMutation.mutate({id: blog.id, updatedBlog})
notificationDispatch({ type: 'like', payload: blog.title });
setTimeout(() => {
  notificationDispatch({ type: 'clear' });
}, 5000);

} 

// DELETE BLOG

const deleteBlogMutation = useMutation({
  mutationFn: (id) => blogService.destroy(id),
  onSuccess: () => {
    queryClient.invalidateQueries({queryKey: ['blogs']})
  },
  onError: (error) => {
    console.error('Error deleting blog', error)
    notificationDispatch({ type: 'error' });
    setTimeout(() => {
      notificationDispatch({ type: 'clear' });
    }, 5000);
  }
})

const handleDelete = () => {
  if (window.confirm("Are you sure you want to delete this blog?")){
    console.log(`Deleting blog with id ${blog.id}`);
    deleteBlogMutation.mutate(blog.id);
  }

}

  const [isOpen, setIsOpen] = useState(false)

let view = isOpen ? 'hide' : 'view'
  return (
    <div className='blog'>
    {blog.title} - {blog.author} 
    <button onClick={() => setIsOpen(!isOpen)}>{view}</button>
   
    {
      isOpen&& (
      <>
      <br/>
           {blog.url}<br/>
           likes: {blog.likes}<button onClick={() => handleLike(blog)}>like</button><br/>
           {blog.user && blog.user.username}<br/>
        
           {blog.user.username === user.username && (
        <button onClick={() => handleDelete(blog.id)}>Delete</button>
      )}
           </>
      )
    }
  
  </div>  

  )
  

}

export default Blog