import React from 'react'

const AddBlog = ({addNewBlog, title, author, url, setTitle, setAuthor, setUrl, setFormVisible}) => {
  
  return (
    <form onSubmit={addNewBlog}>
      <h2>Create new Blog</h2>
    <div>
      title:
        <input
        type="text"
        value={title}
        name="Title"
        placeholder='title'
        onChange={({ target }) => setTitle(target.value)}
      />
    </div>
    <div>
      author:
        <input
        type="text"
        value={author}
        name="Author"
        placeholder='author'
        onChange={({ target }) => setAuthor(target.value)}
      />
    </div>
    <div>
      url:
        <input
        type="text"
        value={url}
        name="Url"
        placeholder='url'
        onChange={({ target }) => setUrl(target.value)}
      />
    </div>
    <button type="submit" onClick={() => setFormVisible(false)}>Add</button>
    <button onClick={(e) => { e.preventDefault(); setFormVisible(false); }}>Cancel</button>

  </form>  
  )
}

export default AddBlog