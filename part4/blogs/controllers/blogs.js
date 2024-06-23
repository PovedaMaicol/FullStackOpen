// en el controlador van las rutas

const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')

const Blog = require('../models/blog')
const User = require('../models/user')

const middleware = require('../utils/middleware')

// aislar token 
// const getTokenFrom = request => {
//     const authorization = request.get('authorization')
//     if (authorization && authorization.startsWith('Bearer ')) {
//       return authorization.replace('Bearer ', '')
//     }
//     return null
//   }

blogsRouter.post('/', middleware.userExtractor, async (request, response) => {

    try {
        const {title, url, author, likes } = request.body


        if(!title || !url)  {
            return response.status(400).json({error: 'title or url missing'})
        }
    
        const user = request.user;

        if(!user) {
            return response.status(401).json({ error: 'Invalid or missing token' });
        }
    
        const blog = new Blog({
            title,
            author,
            url,
            likes: likes || 0,
            user: user._id,
        });
       
        const savedBlog = await blog.save()
        user.blogs = user.blogs.concat(savedBlog._id)
        await user.save()
    
        response.status(201).json(savedBlog) 
    } catch  (error) {
        console.error(error); // Para depuración, puede removerse en producción
        response.status(500).json({ error: 'An error occurred while creating the blog' });
      }

})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({}).populate('user', { username: 1, name: 1})
    
    response.json(blogs)
})

blogsRouter.delete('/:id', middleware.userExtractor, async (request, response) => {

try {
    const user = request.user;
    const blogId = request.params.id;

    // busco el blog por id
    const blog = await Blog.findById(blogId)
    if(!blog) {
        return response.status(404).json({ error: 'blog not found' });
    }

    // valido si el usuario es propietario del blog
    if(blog.user.toString() !== user._id.toString()){
        return response.status(403).json({ error: 'forbidden' });
    }
    // Eliminar el blog
        await Blog.findByIdAndDelete(blogId);
        response.status(204).end()
} catch (error) {
    console.error(error);
    response.status(500).json({ error: 'An error occurred while deleting the blog' });
}
   

 
})

blogsRouter.put('/:id', async (request, response) => {
    const body = request.body

    const blog = {
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes
    }
        await 
        Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
        response.status(200).end()
     
})
  module.exports = blogsRouter;