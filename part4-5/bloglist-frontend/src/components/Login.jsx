import React, {useState} from 'react'
import { useMutation  } from 'react-query'
import loginService from '../services/login'
import blogService from '../services/blogs'
import './styles/login.css'
import { Form, Button} from 'react-bootstrap'
import Notification from './Notification'
import { Link } from 'react-router-dom'

const Login = ({notificationDispatch, setUser}) => {

const [username, setUsername] = useState('') 
const [password, setPassword] = useState('') 
const btn = {
  margin: '0 auto',
  display: 'flex',
  textAlign: 'center', // Propiedad corregida
  width: '150px',
  justifyContent: 'center'
}






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
    <div className='padre container'>
     
    <div className='contenedor'>

      <div className='cabezote'>
      <i className="fa-regular fa-pen-to-square"></i>
      <h1>Blog App</h1>
      <br/>
      <p>SIGN IN TO CONTINUE<br/>
      OR <span style={{color: '#0b5ed7', fontWeight: '600'}}><Link to={`/register`}>REGISTER HERE</Link></span></p>
      </div>
     


         <Form className='form' onSubmit={handleLogin}>
        <Form.Group>
          <Form.Control
            type="text"
            data-testid='username'
            value={username}
            name="Username"
            placeholder='username'
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <br/>
        <Form.Group>
          <Form.Control
            type="password"
            data-testid='password'
            value={password}
            name="Password"
            placeholder='password'
            onChange={({ target }) => setPassword(target.value)}
          />
          <br/>
        </Form.Group>
        <br/>
        <Button style={btn} variant="primary" type="submit">login</Button>
      </Form>
    </div>
    </div>
  )
}

export default Login