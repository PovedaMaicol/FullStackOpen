import axios from 'axios'
import React from 'react'

import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'


const Users = ({users}) => {


  return (
    <div className='container'>
      <br/>
        <h1>Users</h1>
    
        <div>
            <Table striped>
              <tbody>
              {users.map(user => 
                <tr key={user.id}>
                  <td>
                  <Link style={{textDecoration: 'none', 
    fontWeight: '500'}} to={`/users/${user.id}`}>{user.name} </Link>
                  </td>
                   <td style={{fontStyle: 'italic',
    fontSize: 'medium', fontWeight: '300'}}>
                   Created:  {user.blogs.length}
                   </td>
                </tr>
            )}
              </tbody>
            </Table>
     
      
        </div>
    </div>
  )
}

export default Users