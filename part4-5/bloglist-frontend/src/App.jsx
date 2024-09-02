import { useMutation,  useQuery,  useQueryClient } from 'react-query'
import { useState, useEffect, useReducer } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
// import loginService from './services/login'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Users from './components/Users'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'


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

// const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);

return (

  <div>
  <h2>blogs</h2>
  <Notification message={notification} />

  <Routes>
    <Route path='/' element={
      user ? (
        <Home 
        user={user} 
        handleLogout={handleLogout} 
        setFormVisible={setFormVisible} 
        formVisible={formVisible} 
        notificationDispatch={notificationDispatch} 
        blogs={blogs}
        />
      ) : (
        <Login 
        setUser={setUser} 
        notificationDispatch={notificationDispatch}
        />
      )
    } />
    <Route path='/form' element={<AddBlog notificationDispatch={notificationDispatch}/>} />
    <Route path='/users' element={<Users />} />
</Routes>
 

  </div>

);
};

export default App;