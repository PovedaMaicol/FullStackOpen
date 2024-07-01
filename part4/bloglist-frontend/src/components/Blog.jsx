import { useState, useEffect } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, handleLike, handleRemove }) => {

//   // update likes
//   const handleLike = async () => {
//     const updatedBlog = {...blog, likes: blog.likes + 1, user: blog.user._id}
  
//   try {
//     const returnedBlog = await blogService.updateBlog(blog._id, updatedBlog)
//     updateBlogList(returnedBlog)
//   } catch (error) {
//     console.error('Error updating blog:', error)
//   }
// }


 

  const [isOpen, setIsOpen] = useState(false)

let view = isOpen ? 'hide' : 'view'
  return (
    <div>
    {blog.title}   <button onClick={() => setIsOpen(!isOpen)}>{view}</button>
   
    {
      isOpen&& (
      <>
      <br/>
           {blog.url}<br/>
           likes: {blog.likes}<button onClick={() => handleLike(blog)}>like</button><br/>
           {blog.author}<br/>
           <button onClick={() => handleRemove(blog)}>remove</button>
      
           </>
      )
    }
  
  </div>  

  )
  

}

export default Blog