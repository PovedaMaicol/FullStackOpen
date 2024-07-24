import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)
  const [formVisible, setFormVisible] = useState(false)


  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setFormVisible(false)
  }
  const handleLogin = async (event) => {
    event.preventDefault()
    // console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      setNotificationMessage(`approved login`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)
    )
    blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setNotificationMessage('Wrong credentials')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    }
  }



// añadir un blog
  const addNewBlog =  (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url
    }


    // solicitud post
    blogService
    .create(blogObject)
    .then(returnedBlog => {
      setBlogs(blogs.concat(returnedBlog))


      setNotificationMessage(`A new blog '${title}' by ${author} added`)
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)


      setAuthor('')
      setTitle('')
      setUrl('')
      
    })
    .catch( error => {
      console.log(error)
      setNotificationMessage('Fill all the boxes')
      setTimeout(() => {
        setNotificationMessage(null)
      }, 3000)
    })
  }

    // update likes
    const handleLike = async (blog) => {
      const updatedBlog = {...blog, likes: blog.likes + 1, user: blog.user.id || blog.user}
    
    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      setBlogs(blogs.map(b => (b.id === blog.id ? returnedBlog : b)))
      setNotificationMessage(`You liked '${blog.title}'`);
      setTimeout(() => setNotificationMessage(null), 3000);

    } catch (error) {
      console.error('Error updating blog:', error)
      setNotificationMessage('Error while liking the blog');
      setTimeout(() => setNotificationMessage(null), 3000);
    }
  }
  
// delete blog
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this blog?")) {
      console.log(`Deleting blog with id ${id}`);
      blogService
        .destroy(id)
        .then(() => {
          setBlogs(blogs.filter(blog => blog.id !== id));
        })
        .catch(error => {
          console.error('There was an error deleting this blog', error);
        });
    }
  };
  

  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          data-testid='username'
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
            data-testid='password'
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )
const ordenarLike = (a, b) => b.likes - a.likes ;

  const blogsList = () => (
    <div>
     {[...blogs].sort(ordenarLike).map(blog =>
      <Blog key={blog.id} blog={blog} handleLike={handleLike} handleDelete={handleDelete} user={user}/>
    )}
    
    </div>
   
  )




  const blogsForm = () => {
    const hideWhenVisible = { display: formVisible ? 'none' : '' }
    const showWhenVisible = { display: formVisible ? '' : 'none' }


    return (
      <div>
      <div style={hideWhenVisible}>
      <p>{user.name} logged-in<button onClick={handleLogout}>Logout</button></p>

      <button onClick={() => setFormVisible(true)}>Add blog</button>
      {blogsList()}
      </div>
   

{/*       
      <p>{user.name} logged-in<button onClick={handleLogout}>Logout</button></p> */}
      <div style={showWhenVisible}>
      <AddBlog
      addNewBlog={addNewBlog}
      title={title}
      author={author}
      url={url}
      setTitle={setTitle}
      setAuthor={setAuthor}
      setUrl={setUrl}
      setFormVisible={setFormVisible}
      />
  {/* <button onClick={() => setFormVisible(false)}>Cancel</button>
      */}
      </div>


      </div>
    )
  }

  return (
    <div>
      <h2>blogs</h2>
      <Notification
      message={notificationMessage}/>
      
      {user === null ?
      loginForm() :
      blogsForm()
    

    }

     
    </div>
  )
}

export default App