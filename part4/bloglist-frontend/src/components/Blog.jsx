import { useState, useEffect } from 'react'


const Blog = ({ blog, handleLike, handleDelete, user }) => {



 

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