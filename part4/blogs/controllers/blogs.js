// en el controlador van las rutas

const blogsRouter = require('express').Router()

const Blog = require('../models/blog')
const User = require('../models/user')


blogsRouter.post('/',  async (request, response) => {
    const {title, url, author, likes, userId} = request.body


    if(!title || !url)  {
        return response.status(400).json({error: 'title or url missing'})
    }
    const user = await User.findById(userId)
    const blog = new Blog({
        title,
        author,
        url,
        likes: likes || 0,
        user: user.id
    })
    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog._id)
    await user.save()

    response.status(201).json(savedBlog) 
})

blogsRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    
    response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
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