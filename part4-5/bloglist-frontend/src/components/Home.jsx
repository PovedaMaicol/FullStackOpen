import React from 'react'
import Blog from './Blog'
import AddBlog from './AddBlog';

const Home = ({user, handleLogout, setFormVisible, formVisible, notificationDispatch, blogs}) => {

    
const sortedBlogs = [...blogs].sort((a, b) => b.likes - a.likes);


  return (
    <div>
    <div style={{ display: formVisible ? 'none' : '' }}>
      <p>{user.name} logged-in<button onClick={handleLogout}>Logout</button></p>

      <button onClick={() => setFormVisible(true)}>Add blog</button>
      <div>
        {sortedBlogs.map(blog => (
          <Blog key={blog.id} blog={blog} notificationDispatch={notificationDispatch} user={user} />
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