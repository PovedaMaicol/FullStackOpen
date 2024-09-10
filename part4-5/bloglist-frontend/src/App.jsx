import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useState, useEffect, useReducer } from 'react';
import blogService from './services/blogs';
import AddBlog from './components/AddBlog';
import Notification from './components/Notification';
import Users from './components/Users';
import Login from './components/Login';
import { Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import UserCard from './components/UserCard';
import userService from './services/users';
import Blog from './components/Blog';
import NavBar from './components/NavBar';
import { useNavigate } from 'react-router-dom';
import Register from './components/Register';

// REDUCER para manejar notificaciones
const notificationReducer = (state, action) => {
  switch(action.type){
    case "login":
      return `Login successful: ${action.payload}`;
    case "nologin":
      return 'Incorrect credentials';
    case "create":
      return `New anecdote created: ${action.payload}`;
    case "like":
      return `You liked: ${action.payload}`;
    case "clear":
      return '';
    case "error":
      return "An error has occurred";
    case "newuser":
      return "User created successfully";
    default:
      return state;
  }
};

const App = () => {
  const [user, setUser] = useState(null);
  const [notification, notificationDispatch] = useReducer(notificationReducer, '');
  const [formVisible, setFormVisible] = useState(false);
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  
  

  // Validar si hay un usuario logueado en localStorage
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser');
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
    }
  }, []);

  // CIERRE LOGIN
  const handleLogout = () => {
    window.localStorage.clear();
    setUser(null);
    navigate('/')

  };

  // Carga de blogs
  const { data: blogs, isLoading: blogsLoading, error: blogsError } = useQuery({
    queryKey: ['blogs'],
    queryFn: blogService.getAll,
  });

  // Carga de usuarios
  const { data: users, isLoading: usersLoading, error: usersError } = useQuery({
    queryKey: ['users'],
    queryFn: userService.getAll,
  });

  if (blogsLoading || usersLoading) {
    return <div>Loading data...</div>;
  }

  if (blogsError || usersError) {
    return <div>An error occurred while fetching data.</div>;
  }


  return (
    <div>
      {user && <NavBar user={user} handleLogout={handleLogout}/>}
   
     
      <Notification message={notification} />
      <Routes>

      <Route
        path='/register'
        element={<Register notificationDispatch={notificationDispatch}/>}
        />

        <Route 
          path='/' 
          element={
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
          } 
        />
        <Route 
          path='/form' 
          element={<AddBlog notificationDispatch={notificationDispatch} />} 
        />
        <Route 
          path='/users' 
          element={<Users users={users} />} 
        />
        <Route 
          path='/users/:id' 
          element={<UserCard users={users} />} 
        />
        <Route 
          path='/blogs/:id' 
          element={<Blog user={user} blogs={blogs} notificationDispatch={notificationDispatch} />} 
        />
      </Routes>
    </div>
  );
};

export default App;
