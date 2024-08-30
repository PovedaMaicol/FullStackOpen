import { useMutation,  useQuery,  useQueryClient } from 'react-query'
import { useState, useEffect, useReducer } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'


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
  const [user, setUser] = useState(null)
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('') 
  const [notification, notificationDispatch] = useReducer(notificationReducer, '')
  const [formVisible, setFormVisible] = useState(false)

  const queryClient = useQueryClient()


  // validar si hay un usuario logueado en localStorage
  useEffect(() => {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        setUser(user)
        blogService.setToken(user.token)
      }
    }, []);
  

  // LOGIN 
  const loginMutation = useMutation({
    mutationFn: (credentials) => loginService.login(credentials),
  onSuccess: (user) => {
    window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user));
    blogService.setToken(user.token);
    setUser(user)
    setUsername('')
    setPassword('')
    notificationDispatch({ type: 'login', payload: user.name})
    setTimeout(() => {
      notificationDispatch({ type: 'clear'})
    }, 5000);
  },
onError: () => {
  notificationDispatch({ type: 'nologin' });
  setTimeout(() => {
    notificationDispatch({ type: 'clear' });
  }, 5000);
  } 
  })


  
  // MANEJAR LOGIN  
  const handleLogin = (event) => {
    event.preventDefault()
    loginMutation.mutate({ username, password })
    
    }

    
  // CIERRE LOGIN 
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null)
    setFormVisible(false)
    }
    

// carga de blogs al iniciar la app

const { data: blogs, isLoading } = useQuery('blogs', blogService.getAll);

if (isLoading) {
  return <div>Loading data...</div>;
}

const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

return (
  <div>
    <h2>blogs</h2>
    <Notification message={notification} />
    {user ? (
      <div>
        <div style={{ display: formVisible ? 'none' : '' }}>
          <p>{user.name} logged-in<button onClick={handleLogout}>Logout</button></p>
          <button onClick={() => setFormVisible(true)}>Add blog</button>
          <div>
            {sortedBlogs.map(blog => (
              <Blog key={blog.id} blog={blog} notificationDispatch={notificationDispatch} user={user} />
            ))}
          </div>
        </div>
        {formVisible && (
          <AddBlog
            notificationDispatch={notificationDispatch}
            setFormVisible={setFormVisible}
          />
        )}
      </div>
    ) : (
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
    )}
  </div>
);
};

export default App;