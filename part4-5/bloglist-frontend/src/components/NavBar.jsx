import React from 'react'
import { Link } from 'react-router-dom'
import { Button, Nav, Navbar } from 'react-bootstrap'

const NavBar = ({ user, handleLogout }) => {
  const padding = {
    padding: 5,
    // textDecoration: none
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
    <Navbar.Toggle style={{border: 'none'}}aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      
          <Nav style={{position: 'absolute', background: 'rgba(var(--bs-dark-rgb), var(--bs-bg-opacity)) !important', width: '100%'}} className='me-auto'>
            <Nav.Link href='#' as='span'>
              <Link style={{padding: '15px', textDecoration: 'none'}} to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href='#' as='span'>
              <Link style={{padding: '15px', textDecoration: 'none'}} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href='#' as="span">
              {user ?
              <em style={{padding: '15px'}}>{user.name} logged in <button onClick={handleLogout}>Logout</button></em>
              : <Link style={{padding: '15px'}} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>

          </Navbar.Collapse>
          </Navbar>
   
  )
}

export default NavBar