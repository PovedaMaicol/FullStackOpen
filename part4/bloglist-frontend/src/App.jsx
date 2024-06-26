import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [notificationMessage, setNotificationMessage] = useState(null)

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


  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
          <input
          type="text"
          value={username}
          name="Username"
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        password
          <input
          type="password"
          value={password}
          name="Password"
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogsList = () => (
    <div>
     {blogs.map(blog =>
      <Blog key={blog.id} blog={blog} />
    )}
    </div>
   
  )

  return (
    <div>
      <h2>blogs</h2>
      <Notification
      message={notificationMessage}/>
      
      {user === null ?
      loginForm() :
      <div>
      <AddBlog
      addNewBlog={addNewBlog}
      title={title}
      author={author}
      url={url}
      setTitle={setTitle}
      setAuthor={setAuthor}
      setUrl={setUrl}
      />
      <p>{user.name} logged-in<button onClick={handleLogout}>Logout</button></p>
      {blogsList()}
      </div>

    }

     
    </div>
  )
}

export default App