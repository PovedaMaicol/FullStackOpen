import React, {useState} from 'react'
import { useMutation  } from 'react-query'
import loginService from '../services/login'
import blogService from '../services/blogs'

const Login = ({notificationDispatch, setUser}) => {

const [username, setUsername] = useState('') 
const [password, setPassword] = useState('') 







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

    


  return (
    <div>
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
    </div>
  )
}

export default Login