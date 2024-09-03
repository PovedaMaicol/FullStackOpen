

import { useQueryClient, useMutation } from 'react-query'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'


const Blog = ({ blogs, notificationDispatch }) => {
  console.log(blogs)
const id = useParams().id
const blog = blogs.find(b => b.id === id)
console.log(blog)
console.log(id)

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


  return (
    <div className='blog'>
    <h2>{blog.title} - {blog.author}</h2> 
    <a>{blog.url}</a>
    <p>likes: {blog.likes}<button onClick={() => handleLike(blog)}>like</button><br/>
    Added by: {blog.user.name}</p> 


  
  </div>  

  )
  

}

export default Blog