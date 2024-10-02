import React from 'react'
import { Form, Button } from 'react-bootstrap'


const RegisterForm = (props) => {

    if (!props.show) {
        return null
      }

  return (
    // <div className='container'>
    <div>
    <br/>

    <h1 style={{textAlign: 'center'}}>Create account</h1>
    <br/>
    <Form >
        <Form.Group>
        <Form.Label>Username</Form.Label>
            <Form.Control 
            type='text'
            data-testid='username'
            name='username'
            placeholder='Pepito12'
            />
        </Form.Group>
        <br/>
        <Form.Group>
        <Form.Label>Password</Form.Label>
            <Form.Control 
            type='password'
            data-testid='password'
            name='password'
            placeholder='********'
            />
        </Form.Group>
        <br/>
        <Form.Group>
        <Form.Label>Favorite genre</Form.Label>
            <Form.Control
            type='text'
            data-testid='genre'
            name='genre'
            placeholder='Terror'
            />
        </Form.Group>
        <br/>
        <Button style={{ width: '100%'}} type="submit" >Sign up</Button>
    </Form>
// </div>
  )
}

export default RegisterForm