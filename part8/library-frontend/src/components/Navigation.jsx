import React from 'react'
import { Button, Navbar, Nav} from "react-bootstrap";
import { Link } from 'react-router-dom'

const Navigation = ({setIsRegister, setPage, isVisible, token, logout}) => {
  return (
  
          
<Navbar collapseOnSelect expand="lg" bg='dark' variant="dark" style={{paddingLeft: '15px'}}>
  <Navbar.Toggle aria-controls="responsive-navbar-nav" style={{border: '1px solid white'}}/>
  <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="mr-auto">
      <Nav.Link href="#" as="span">
        <a  onClick={() => setPage("authors") }> Authors </a>
      </Nav.Link>


      <Nav.Link href="#" as="span">
      <a onClick={() => setPage("books") }>Books</a>
      </Nav.Link>

       
       {
        isVisible && (
          <Nav.Link href="#" as="span">
          <a onClick={() => setPage("add")}>Add book</a>
        </Nav.Link>
        )
       } 

       {
        !token && (
          <Nav.Link href="#" as="span">
          <a onClick={() => {setPage("login"), setIsRegister(true)}} >Login</a>
        </Nav.Link>
        )
       }

       {
        isVisible && (
          <Nav.Link href="#" as="span">
          <a onClick={logout}>Logout</a>
        </Nav.Link>
  

        )
       }

       {
        isVisible && (
          
      <Nav.Link href="#" as="span">
      <a onClick={logout}>Recommend</a>
      </Nav.Link>
      )
       }
  

       
     


      {/* <Nav.Link href="#" as="span">
        {user
          ? <em>{user} logged in</em>
          : <Link>login</Link>
        }
    </Nav.Link> */}
    </Nav>
  </Navbar.Collapse>
</Navbar>

  )
}

export default Navigation