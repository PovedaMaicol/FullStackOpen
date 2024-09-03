import axios from 'axios'
import React from 'react'

import { Link } from 'react-router-dom'


const Users = ({users}) => {


  return (
    <div>
        <h2>Users</h2>
        <ul>
            
            {users.map(user => 
                <li key={user.id}>
                    <Link to={`/users/${user.id}`}>{user.name} - Blogs created:  {user.blogs.length}</Link>
                    
                </li>
            )}
        </ul>
    </div>
  )
}

export default Users