
import { useState } from 'react'
import { useQueryClient, useMutation } from 'react-query'
import blogService from '../services/blogs'
import { useParams } from 'react-router-dom'
import { Table, Form, Button } from 'react-bootstrap'

const Blog = ({ blogs, notificationDispatch }) => {
const id = useParams().id
const blog = blogs.find(b => b.id === id)
const [newComment, setNewComment] = useState('')
const [isLike, setIsLike] = useState(false)
const queryClient = useQueryClient()

if (!blog) {
  return <div>Loading blog...</div>
}

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

// COMENTAR BLOG 
const addCommentMutation = useMutation({
  mutationFn: ({id, comment}) => blogService.addComment(id, comment),
  onSuccess: () => {
    queryClient.invalidateQueries({ queryKey: ['blogs']})
  },
  onError: (error) => {
    console.error('Error adding comment', error)
    notificationDispatch({ type: 'error' })
    setTimeout(() => {
      notificationDispatch({ type: 'clear' })
    }, 5000)
  }
})


const handleLike = () => {
  const updatedBlog = ({
    ...blog, 
    likes: isLike ? blog.likes -1 : blog.likes + 1,
    user: blog.user.id || blog.user
  })

updateBlogMutation.mutate({id: blog.id, updatedBlog})
if (!isLike) {
  notificationDispatch({ 
    type: 'like', 
    payload: blog.title 
  });
  
  setTimeout(() => {
    notificationDispatch({ type: 'clear' });
  }, 5000);
}


// Alternar el estado de isLike
setIsLike(!isLike)

} 


const addComment = (event) => {
  event.preventDefault()
  addCommentMutation.mutate({ id: blog.id, comment: newComment})
  setNewComment('') 
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
    <div className='container'>
      <br/>
    <h2 style={{fontStyle:'italic'}}>{blog.title} <span style={{fontWeight: '300', fontSize: 'revert'}}>by {blog.author}</span>
    </h2>

    <a style={{textDecoration:'underline', fontStyle: 'italic', color: '#0b5ed7'}}>{blog.url}</a>

    <p style={{fontWeight: '300'}}>
      <span style={{fontWeight: '400'}}>{blog.likes}</span> likes
      
      <button style={{border: 'none', background: 'none'}} onClick={() => handleLike(blog)}>

      <i className={isLike ? "fa-solid fa-heart" : "fa-regular fa-heart"}></i>
      </button>
      <br/>
      Added by: <span style={{fontWeight:'500'}}>{blog.user.name}</span></p> 


    <Form onSubmit={addComment}>
        <Form.Group style={{display: 'flex', width: '100%', justifyContent: 'space-between'}}
       >
          <Form.Control 
          type='text'
          data-testid='comment'
          value={newComment}
          onChange={(event) => setNewComment(event.target.value)}
          placeholder='add a comment'
          style={{ width: '72%' }}
          />
   <Button variant="primary" type="submit" style={{width: '25%'}}>comment</Button>
        </Form.Group>
     

      </Form>
<br/>
    {
      blog.comments.length === 0 ? (
        <p>No comments yet</p>
      ) : (
        <Table striped>
          <tbody>
           {
            blog.comments.map((comment, index) => (
              <tr key={index}>
                <td style={{color: '#0b5ed7'}}>{comment}</td>
              </tr>
            ))
           } 
          </tbody>
        </Table>
        // blog.comments.map((comment, index) => (
        //   <li key={index}>{comment}</li>
        // ))  
      )}

      

 

  
  </div>  

  )
  

}

export default Blog