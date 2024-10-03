import React, { useState, useEffect } from 'react'
import { useMutation, useQuery } from '@apollo/client'
import { LOGIN, ME } from '../queries'

const LoginForm = ({ setMessage, setToken, show, setPage, setIsVisible, setUser, user}) => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')




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
    <div>
      <form onSubmit={submit}>
        <div>
          username <input
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password <input
            type='password'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type='submit'>login</button>
        <a onClick={() => setPage("register")}>Register here</a>
      </form>
      
    </div>
  )
}

export default LoginForm