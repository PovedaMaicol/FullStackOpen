import React from 'react'
import Blog from './Blog'
import AddBlog from './AddBlog';
import { Link } from 'react-router-dom';

const Home = ({user, handleLogout, setFormVisible, formVisible, notificationDispatch, blogs}) => {

    
const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);


  return (
    <div>
    <div style={{ display: formVisible ? 'none' : '' }}>
      <p>{user.name} logged-in<button onClick={handleLogout}>Logout</button></p>

      <button onClick={() => setFormVisible(true)}>Add blog</button>
      <div>
        {sortedBlogs.map(blog => (
          <li key={blog.id}>
<Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        ))}
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