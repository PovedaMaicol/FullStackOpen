import React from 'react'
import Blog from './Blog'
import AddBlog from './AddBlog';
import { Link } from 'react-router-dom';
import { Button, Table } from 'react-bootstrap';

const Home = ({user, handleLogout, setFormVisible, formVisible, notificationDispatch, blogs}) => {


const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);


  return (
    <div className='container'>
      
      <br/>
    <div style={{ display: 'flex', justifyContent: 'space-between',     alignItems: 'center'}}>
      <div>
      <h1 style={{margin: '0'}}>Blog App</h1>
      <p style={{margin: '0'}}>{user.name} logged in</p>
      </div>
    
    <Button style={{height: '40px'}} onClick={() => setFormVisible(true)}>Add</Button>
    </div>
      


    <div style={{ display: formVisible ? 'none' : '' }}>
      
      <div>
      <br/>
        <Table striped>
          <tbody>
          {sortedBlogs.map(blog => (
          <tr key={blog.id}>
            <td>
            <Link style={{ textDecoration: 'none', 
    fontWeight: '500'}} to={`/blogs/${blog.id}`}>{blog.title}
            </Link>
            </td>
            <td style={{ fontStyle: 'italic',
    fontSize: 'medium', fontWeight: '300'}}>
              {blog.author}
            </td>
          </tr>
        ))}
          </tbody>


        </Table>

      </div>
    </div>
    {formVisible && (
    <AddBlog
    notificationDispatch={notificationDispatch}
    setFormVisible={setFormVisible}
    />
     
    )}
  </div>
  )
}

export default Home