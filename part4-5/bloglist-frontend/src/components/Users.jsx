import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import userService  from '../services/users'

const Users = () => {

     const { data: users, isLoading, error } = useQuery({
        queryKey: ['users'],
        queryFn: () => userService.getAll()
     })

     if (isLoading) {
        return <div>Loading users...</div>
     }

     if (error) {
        return <div>An error occurred while fetching users.</div>
     }

  return (
    <div>
        <h2>Users</h2>
        <ul>
            
            {/* <li style={{ listStyleType: 'none' }}>Blogs created</li> */}
            {users.map((user) => (
                <li key={user.id}>
                    {user.name} - Blogs created:  {user.blogs.length}
                </li>
            ))}
        </ul>
    </div>
  )
}

export default Users