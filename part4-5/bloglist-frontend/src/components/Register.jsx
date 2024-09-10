import React from 'react'
import { Form, Button } from 'react-bootstrap'
import { useState } from 'react'
import userService from '../services/users'
import { Link, useNavigate } from 'react-router-dom'

const Register = ({notificationDispatch}) => {



 const [usuario, setUsuario] = useState('')
 const [name, setName] = useState('')
 const [password, setPassword] = useState('')
 const navigate = useNavigate()

const handleRegister = async (event) => {
    event.preventDefault()
    try {
        const newUser = {
          username: usuario,
          name,
          password,
        }
        await userService.create(newUser) // Llama al servicio para crear el usuario
        setUsuario('')
        setName('')
        setPassword('')
        notificationDispatch({ type: "newuser"})
        setTimeout(() => {
            notificationDispatch({ type: 'clear'})
          }, 5000);
        navigate('/')
      } catch (error) {
        console.error('Error al crear el usuario:', error)
       notificationDispatch({ type: 'error'})
       setTimeout(() => {
        notificationDispatch({ type: 'clear' });
      }, 5000);
      }
}

  return (
    <div className='container'>
        <br/>
        <p style={{textAlign: 'right'}}><Link to={'/'}>skip</Link></p>
        <h1 style={{textAlign: 'center'}}>Create account</h1>
        <br/>
        <Form onSubmit={handleRegister}>
            <Form.Group>
                <Form.Control
                type='text'
                data-testid='name'
                name='name'
                placeholder='name'
                value={name}
                onChange={(e) => setName(e.target.value)}
                
                />
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control 
                type='text'
                data-testid='username'
                name='username'
                placeholder='username'
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                />
            </Form.Group>
            <br/>
            <Form.Group>
                <Form.Control 
                type='password'
                data-testid='password'
                name='password'
                placeholder='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                />
            </Form.Group>
            <br/>
            <Button style={{ width: '100%'}} type="submit" >Sign up</Button>
        </Form>
    </div>
  )
}

export default Register