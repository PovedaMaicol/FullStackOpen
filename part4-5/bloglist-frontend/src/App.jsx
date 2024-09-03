import { useMutation,  useQuery,  useQueryClient } from 'react-query'
import { useState, useEffect, useReducer } from 'react'
import blogService from './services/blogs'
import AddBlog from './components/AddBlog'
import Notification from './components/Notification'
import Users from './components/Users'
import Login from './components/Login'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import User from './components/User'
import userService from './services/users'
import BlogCard from './components/BlogCard'


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
    

  // Carga de blogs
  const { data: blogs, isLoading: blogsLoading, error: blogsError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll
  });

  // Carga de usuarios
  const { data: users, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll
  });

  if (blogsLoading || usersLoading) {
    return <div>Loading data...</div>;
  }

  if (blogsError || usersError) {
    return <div>An error occurred while fetching data.</div>;
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
    <Route path='/users' element={<Users users={users} />} />
    <Route path='/users/:id' element={<User users={users}/>} />
    <Route path='/blogs/:id' element={<BlogCard blogs={blogs} />}/>
</Routes>
 

  </div>

);
};

export default App;