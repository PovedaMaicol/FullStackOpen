import React from 'react'
import { Button, Navbar, Nav} from "react-bootstrap";
import { Link } from 'react-router-dom'

const Navigation = ({setIsRegister, setPage, isVisible, token, logout}) => {

  const ancor = {
    cursor: 'pointer'
  }
  return (
  
          
<Navbar collapseOnSelect expand="lg" bg='dark' variant="dark" style={{paddingLeft: '15px', position: 'absolute', width: '100%', zIndex: '3'}}>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{border: '1px solid white'}}/>
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#" as="span">
        <a  style={ancor} onClick={() => setPage("authors") }> Authors </a>
      </Nav.Link>


      <Nav.Link href="#" as="span">
      <a style={ancor} onClick={() => setPage("books") }>Books</a>
      </Nav.Link>

       
       {
        isVisible && (
          <Nav.Link href="#" as="span">
          <a style={ancor} onClick={() => setPage("add")}>Add book</a>
        </Nav.Link>
        )
       } 

       {
        !token && (
          <Nav.Link href="#" as="span">
          <a style={ancor} onClick={() => {setPage("login"), setIsRegister(true)}} >Login</a>
        </Nav.Link>
        )
       }

{
        isVisible && (
          
      <Nav.Link href="#" as="span">
      <a style={ancor} onClick={() => setPage("recommend")}>Recommend</a>
      </Nav.Link>
      )
       }

       {
        isVisible && (
          <Nav.Link href="#" as="span">
          <a style={ancor} onClick={logout}>Logout</a>
        </Nav.Link>
  

        )
       }

       
  

       

    </Nav>
  </Navbar.Collapse>
</Navbar>

  )
}

export default Navigation