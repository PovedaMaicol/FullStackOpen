import { useState, useEffect } from 'react'


const Blog = ({ blog, handleLike, handleDelete, user }) => {



 
let name = blog.user.username
  const [isOpen, setIsOpen] = useState(false)

let view = isOpen ? 'hide' : 'view'
  return (
    <div>
    {blog.title}  <button onClick={() => setIsOpen(!isOpen)}>{view}</button>
   
    {
      isOpen&& (
      <>
      <br/>
           {blog.url}<br/>
           likes: {blog.likes}<button onClick={() => handleLike(blog)}>like</button><br/>
           {blog.author}<br/>
           {blog.user && blog.user.username}<br/>
        
           {blog.user.username === user.username && (
        <button onClick={() => handleDelete(blog.id)}>Eliminar</button>
      )}
           </>
      )
    }
  
  </div>  

  )
  

}

export default Blog