import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { LOGIN, ME } from '../queries'
import { Form, Button } from 'react-bootstrap'

const LoginForm = ({ setMessage, setToken, show, setPage, setIsVisible, setIsRegister}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

const form = {
  display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
         height: '100vh',
         backgroundColor: '#ffecaa',
   
         alignItems: 'center',
         padding: '20px'
}

const groups = {
  display: 'flex', 
  flexDirection: 'column', 
  margin: '0', 
  padding: '0',
  width: '80%'
}

const inputs = {
  width: '100%',  
  height: '40px',
  borderRadius: '5px',
  paddingLeft: '10px',
  backgroundColor: 'transparent',
  border: '2px solid gray'

}

const groupButton = {
  display: 'flex', 
  flexDirection: 'column', 
  textAlign: 'center', 
  justifyContent: 'space-between',
  width: '80%'
}


const buttons = {
  width: '100%', 
  backgroundColor: '#050522',
  color: '#e1c461',
  height: '40px',
  borderRadius: '5px'
}


  const [ login, result ] = useMutation(LOGIN, {
    onError: (error) => {
      setMessage(error.graphQLErrors[0].message)
    },

    onCompleted: () => {
        
    }
  })


  const token =  localStorage.getItem('bookApp-user-token') || '';


  useEffect(() => {
    if ( result.data ) {
      const token = result.data.login.value
      setToken(token)
      localStorage.setItem('bookApp-user-token', token)
      setMessage(`${username} loggin`)
      setUsername('')
      setPassword('')
      setTimeout(() => {
        setMessage(null)
      }, 5000);   
      setPage("authors")
      setIsVisible(true)
      setIsRegister(false)
      console.log("Token almacenado en localStorage:", localStorage.getItem('bookApp-user-token'));
    
  
    }
  }, [result.data, setPage, setToken, setIsVisible]) // eslint-disable-line




  const submit = async (event) => {
    event.preventDefault()
   
    try {
      await login({ variables: { username, password } })
  
    } catch (error) {
  

    }
  }

  if (!show) {
    return null
  }

  return (
        <Form onSubmit={submit} style={form}>

       
        <Form.Group style={{ display: 'flex', justifyContent: 'space-between', textAlign: 'center'}}>
        <h1 style={{ padding: '0'}}>
        <span style={{fontWeight: 'normal'}}>Welcome to</span> 
        <br/>
        AppBook
        </h1>

      
        </Form.Group>
        <br/>



          
        <Form.Group style={groups}>
        <Form.Label>Username</Form.Label>
        <Form.Control
          placeholder='Pepito12'
          style={inputs}
          value={username}
          onChange={({ target }) => setUsername(target.value)}
        />
        </Form.Group>
        <br/>


        <Form.Group style={groups}>
        <Form.Label>Password</Form.Label>
        <Form.Control
          placeholder='********'
          style={inputs}
          type='password'
          value={password}
          onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <br/>

        <Form.Group style={groupButton}>
          <br/>
        <Button type='submit' style={buttons}>
          login
        </Button>
        <br/>

        <div style={{ 
          width: '100%', 
     
          display: 'flex',
          justifyContent: 'center'}}>


        <a 
        onClick={() => {
        setPage("register"),
        setIsRegister(true)}}
        style={{fontWeight: 'bold'}}>
        Register
        </a>

        <a style={{ padding: '0 10px 0 10px'}}>|</a>

        <a
        onClick={() => {setIsRegister(false), setPage('books')}}>
        Cancel
        </a>
        </div>
        
        </Form.Group>
       
      </Form>
      

  )
}

export default LoginForm