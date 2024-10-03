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
        justifyContent: 'flex-end', 
         height: 'calc(100vh - 20px)',
         backgroundColor: '#ffecaa',
         borderRadius: '0px 20px 0 0', 
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
    <div style={form}>
      <Form onSubmit={submit}>
        <Form.Group>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>

        <Form.Group>
        <Button type='submit'>login</Button>
        <a onClick={() => {setPage("register"), setIsRegister(true)}}>Register here</a>
        </Form.Group>
       
      </Form>
      
    </div>
  )
}

export default LoginForm