import React from 'react'
import { useParams } from 'react-router-dom'


const User = ({ users }) => {

  const { id } = useParams();
  const user = users.find(us => us.id === id)
  if (!user) {
    return null
  }


  return (
    <div>
      <h2>{user.name}</h2>
      <h4>added blogs</h4>

      {user.blogs.map( blog => (
      <li key={blog.id}>{blog.title}</li>
      )
      )}
    </div>
  )
}

export default User