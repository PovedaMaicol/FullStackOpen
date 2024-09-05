import React from 'react'
import { Link } from 'react-router-dom'

const NavBar = ({ user, handleLogout }) => {
  return (
    <nav>
      <Link to="/" >blogs</Link>
      <Link to="/users">users</Link>
      <p>{user.name} logged-in<button onClick={handleLogout}>Logout</button></p>
    </nav>
  )
}

export default NavBar