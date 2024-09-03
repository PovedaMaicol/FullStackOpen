import React from 'react'
import { useParams } from 'react-router-dom'


const BlogCard = ({ blogs }) => {
    const { id } = useParams()
    const blog = blogs.find(bg => bg.id === id)
    if (!blog) {
        return null
    }
    console.log(blog)

  return (
    <div>
        <h2>{blog.title}</h2>
        <a>{blog.url}</a>
        <p>{blog.likes} likes<button>like</button></p>
        <p>Added by {blog.user.name}</p>
    </div>
  )
}

export default BlogCard