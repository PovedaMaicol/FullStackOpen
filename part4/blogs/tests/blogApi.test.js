const { test, after, beforeEach } = require('node:test')
const assert = require('assert')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const supertest = require('supertest')
const app = require('../app')
const Blog =  require('../models/blog')
const api = supertest(app)


beforeEach(async() => {
    await Blog.deleteMany({})
    let blogObject = new Blog(helper.initialBlogs[0])
    await blogObject.save()
    blogObject =  new Blog(helper.initialBlogs[1])
    await blogObject.save()
})


test('blogs are returned as json', async () => {
    const response = await api.get('/api/blogs')
    console.log('this is ' ,response.body[0])
    assert.strictEqual(response.body.length, 2)
})


test('blogs have id property', async () => {
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.id)
    console.log(contents)
    assert.strictEqual(response.body.length, contents.length)
})

test.only('check if the property likes is defined', async() => {
    const newBlog = {
        title: 'Bucaros campeon',
        author: 'dudamel',
        url: 'String'
    }

    
    const response = await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)


    // Verifica que la respuesta tenga la propiedad likes con valor 0
    assert.strictEqual(response.body.likes, 0)

    const blogsAtEnd = await helper.blogsInDb()
    const savedBlog = blogsAtEnd.find(blog => blog.title === 'Bucaros campeon')

    assert.strictEqual(savedBlog.likes, 0)
})

test('a valid blog can be added', async () => {
    const newBlog = {
        title: 'The blog',
        author: 'Alberto Gamero',
        url: 'String',
        likes: 7
    }

    await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(201)
    .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
})


test.only('title or url is not defined', async() => {
    const newBlogWithoutTitle = {
        author: 'Author',
        url: 'http://example.com',
        likes: 5
    }

    const newBlogWithoutUrl = {
        title: 'No URL Blog',
        author: 'Author',
        likes: 5
    }

    await api
    .post('/api/blogs')
    .send(newBlogWithoutTitle)
    .expect(400)

    await api
    .post('/api/blogs')
    .send(newBlogWithoutUrl)
    .expect(400)
})
// test.only('checking that likes are defined', async () => {
// const newBlog = {
//     title: 'The blog',
//     author: 'Alberto Gamero',
//     url: 'String',
  
// }
// newBlog.likes ? newBlog.likes : newBlog.likes = 0
// console.log(newBlog)

// // await api
// // .post('/api/notes')
// // .send(newBlog)

// assert.strictEqual(newBlog.likes, 0)
// })

// cerrar conexion
after(async () => {
    await mongoose.connection.close()
  })