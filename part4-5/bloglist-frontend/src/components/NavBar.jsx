import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'
import './styles/navBar.css'

const NavBar = ({ user, handleLogout }) => {




  return (
    
      <Navbar style={{height: '65px'}} collapseOnSelect expand="lg" bg="dark" variant="dark">
        
    <Navbar.Toggle style={{border: 'none', color: 'transparent'}}aria-controls="responsive-navbar-nav" />
   
    <Navbar.Collapse id="responsive-navbar-nav">
   
          <Nav style={{position: 'absolute', background: 'rgba(var(--bs-dark-rgb), var(--bs-bg-opacity)) !important', width: '100%'}} className='me-auto'>

            <Nav.Link href='#' as='span'>
              <Link style={{padding: '15px', textDecoration: 'none', color: 'white', fontStyle: 'italic'}} to="/">blogs</Link>
            </Nav.Link>


            <Nav.Link href='#' as='span'>
              <Link style={{padding: '15px', textDecoration: 'none', color: 'white', fontStyle: 'italic'}} to="/users">users</Link>
            </Nav.Link>


            <Nav.Link href='#' as="span">
              {user ?
              <em 
              style={{padding: '15px', color: 'white', }}>{user.name} logged in 
              <button 
              onClick={handleLogout} 
              style={{background: 'none', border: 'none'}}>
              
              <i className='bx bx-log-out' style={{color: '#0d6efd'}}>
              </i>
              </button>
              </em>
              : 
              <Link style={{padding: '15px'}} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
         
          </Navbar.Collapse>
     
          </Navbar>

  
    
   
  )
}

export default NavBar