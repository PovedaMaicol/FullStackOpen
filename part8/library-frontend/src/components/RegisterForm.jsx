import React, { useState } from 'react'
import { Form, Button } from 'react-bootstrap'
import { ADD_USER, ALL_BOOKS } from '../queries'
import { useMutation } from '@apollo/client'

const RegisterForm = (props) => {
const [username, setUsername] = useState('')
const [password, setPassword] = useState('')
const [favoriteGenre, setfavoriteGenre] = useState('')

   
    const groups = {
        display: 'flex', 
        flexDirection: 'column', 
        margin: '0', 
        padding: '0'
    }

    const inputs = {
        width: 'inherit',  
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
        justifyContent: 'space-between'
    }

    const buttons = {
        width: '100%', 
        backgroundColor: '#050522',
        color: '#e1c461',
        height: '40px',
        borderRadius: '5px'
    }

    const form = {
        backgroundColor:'#ffecaa', 
       display: 'flex',
       flexDirection: 'column',
       justifyContent: 'center',
        height: '100vh', 
        padding: '20px'
    }

    const [ addUser ] = useMutation(ADD_USER, {
        refetchQueries: [ { query: ALL_BOOKS}],
        onError: (error) => {
            const messages = error.graphQLErrors.map(e => e.message).join('\n')
            props.setMessage(messages)
        }
    })

    if (!props.show) {
        return null
      }

      const submit = async (e) => {
        e.preventDefault()
    
        try {
            const result = await addUser({ 
                variables: { username, password, favoriteGenre }
            })
            
            if (result) { 
                console.log('add user...')
                props.setMessage(`User ${username} created successfully`)
                setUsername('')
                setPassword('')
                setfavoriteGenre('')
                setTimeout(() => {
                    props.setMessage(null)
                }, 5000)
                props.setIsRegister(false)
                props.setPage("books")
            }
        } catch (error) {
            props.setMessage(`Error: ${error.message}`)
            setTimeout(() => {
                props.setMessage(null)
            }, 5000)
        }
    }

     

  return (
    

    <Form style={form} onSubmit={submit}>
     

    <Form.Group style={{ display: 'flex', justifyContent: 'space-between'}}>
        <h1 style={{ padding: '0'}}>
        <span style={{fontWeight: 'normal'}}>Hello...</span> 
        <br/>
        Register here
        </h1>

        <i className='bx bx-x-circle' 
        style={{fontSize: '25px', color: 'red'}}
        onClick={() => {props.setIsRegister(false), props.setPage('books')}}
        ></i>
    </Form.Group>
    <br/>

        <Form.Group style={groups}>
        <Form.Label>Username</Form.Label>
            <Form.Control 
            style={inputs}
            type='text'
            data-testid='username'
            name='username'
            placeholder='Pepito12'
            value={username}
            onChange={({ target }) => setUsername(target.value)}
            />
        </Form.Group>
        <br/>


        <Form.Group style={groups}>
        <Form.Label>Password</Form.Label>
            <Form.Control 
            style={inputs}
            type='password'
            data-testid='password'
            name='password'
            placeholder='********'
            value={password}
            onChange={({ target }) => setPassword(target.value)}
            />
        </Form.Group>
        <br/>


        <Form.Group style={groups}>
        <Form.Label>Favorite genre</Form.Label>
            <Form.Control
            style={inputs}
            type='text'
            data-testid='genre'
            name='genre'
            placeholder='Terror'
            value={favoriteGenre}
            onChange={({ target }) => setfavoriteGenre(target.value)}
            />
        </Form.Group>
        <br/>
        <br/>


        <Form.Group 
        style={groupButton}>


        <Button 
        style={buttons} 
        type="submit" 
        >Sign up
        </Button>
         <br/>
        <p>Already have account?  <span style={{ color: 'red', fontWeight: 'bold'}}>Login</span></p>
        </Form.Group>
       

    </Form>

  )
}

export default RegisterForm