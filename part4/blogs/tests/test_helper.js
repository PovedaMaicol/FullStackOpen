const Blog = require('../models/blog')

const initialBlogs = [
    {
        title: 'La vaquita',
        author: 'Alejandro dudamel',
        url: 'String'
    },
    {
        title: 'El bucaros',
        author: 'Alejandro garcia',
        url: 'String',
        likes: 5
    }
]


  const blogsInDb = async () => {
    const blogs = await Blog.find({})
    return blogs.map(blog => blog.toJSON())
  }
  
  module.exports = {
    initialBlogs, blogsInDb
  }