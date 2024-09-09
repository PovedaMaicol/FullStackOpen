import React from 'react'
import { Link, useParams } from 'react-router-dom'
import { Table } from 'react-bootstrap';

const UserCard = ({ users }) => {

  const { id } = useParams();
  const user = users.find(us => us.id === id)
  if (!user) {
    return null
  }


  return (
    <div className='container'>
      <br/>
      <h1>{user.name}</h1>
      <p>added blogs:</p>
<Table striped>
  <tbody>
  {user.blogs.map( blog => (
      <tr key={blog.id}>
        <td>
          <Link style={{textDecoration: 'none', 
    fontWeight: '500'}} to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </td>
          </tr>
      )
      )}
  </tbody>

</Table>
    </div>
  )
}

export default UserCard