import { useMutation,  useQueryClient } from 'react-query'
import { useState, useEffect, useReducer } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import { createBlog, initializeBlogs } from './reducers/blogReducer'


// REDUCER  manejar notificaciones 
const notificationReducer = (state, action) => {

  switch(action.type){
    case "login":
      return `Login successful: ${action.payload}`
    case "nologin":
      return 'Incorrect credentials'
    case "create":
     return `New anecdote created: ${action.payload}`;
    case "like":
     return `You liked: ${action.payload}`;
    case "clear":
     return '';
    case "error":
      return "An error has occurred"
    default:
     return state;
  }
}

const App = () => {
 
  const dispatch = useDispatch()
  const blogs = useSelector(state => state.blogs)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const [formVisible, setFormVisible] = useState(false)
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const queryClient = useQueryClient()

// carga de blogs al iniciar la app
  useEffect(() => {

      dispatch(initializeBlogs())
 
  }, [dispatch])


// validar si hay un usuario logueado en localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])
// cierre de login
  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
    setFormVisible(false)
  }

// funcion para manejar login 
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user)

    )
    blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      notificationDispatch({ type: 'login', payload: user.name})
      setTimeout(() => {
        notificationDispatch({ type: 'clear'})
      }, 5000);
    } catch (exception) {
      notificationDispatch({ type: 'nologin'})
      setTimeout(() => {
        notificationDispatch({ type: 'clear'})
      }, 5000);
    }
  }


  const newBlogMutation = useMutation({
    mutationFn: blogService.create,
    onSuccess: (newBlog) => {
      queryClient.invalidateQueries({queryKey: ['blogs']});
      notificationDispatch({ type: 'create', payload: newBlog.title });
      setTimeout(() => {
        notificationDispatch({ type: 'clear'})
      }, 5000);
    }
  })

// añadir un blog
  const addNewBlog = (event) => {
    event.preventDefault()
    const blogObject = { title, author, url };
    newBlogMutation.mutate(blogObject)
    }

    // update likes
    const handleLike = async (blog) => {
      const updatedBlog = {...blog, likes: blog.likes + 1, user: blog.user.id || blog.user}
    
    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      dispatch(initializeBlogs())
      // setBlogs(blogs.map(b => (b.id === blog.id ? returnedBlog : b)))
      notificationDispatch({type: 'like', payload: blog.title})
      setTimeout(() => {
        notificationDispatch({ type: 'clear'})
      }, 5000);

    } catch (error) {
      console.error('Error updating blog:', error)
      notificationDispatch({type: 'error'})
      setTimeout(() => {
        notificationDispatch({ type: 'clear'})
      }, 5000);
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
      message={notification}/>
      
      {user === null ?
      loginForm() :
      blogsForm()
    

    }

     
    </div>
  )
}

export default App