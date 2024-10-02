import React from 'react'
import { Form, Button } from 'react-bootstrap'


const RegisterForm = (props) => {

    const groups = {
        display: 'flex', 
        flexDirection: 'column', 
        margin: '0', 
        padding: '0'
    }

    const inputs = {
        width: 'inherit',  
        height: '35px',
        borderRadius: '5px',
        paddingLeft: '10px'
    }

    const buttons = {
        
    }

    if (!props.show) {
        return null
      }

  return (
    <div style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'flex-end', 
         height: 'calc(100vh - 20px)'
        }}>

    <Form style={{ 
        backgroundColor:'#ffecaa', 
        borderRadius: '20px 20px 0 0', 
        height: '90%', 
        padding: '0 20px 0 20px',
      
        }}>

    <Form.Group>
        <h2>
        <span style={{fontWeight: 'normal'}}>Hello...</span> 
        <br/>
        Register
        </h2>
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
            />
        </Form.Group>
        <br/>


        <Form.Group>
        <Button style={{ 
            width: '100%', 
            backgroundColor: '#050522',
            color: '#e1c461',
            height: '35px',
            borderRadius: '5px'
        }} 
        type="submit" >Sign up</Button>
        <p>Already have account? <span>Login</span></p>
        </Form.Group>
       

    </Form>
</div>
  )
}

export default RegisterForm