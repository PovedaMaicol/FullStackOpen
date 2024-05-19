import React from 'react'

const Filter = ({searchContact, search, handleChangeSearch}) => {
  return (
    <form  onSubmit={searchContact}>
      <div>
      <input value={search} onChange={handleChangeSearch} placeholder='search contact'/>
  
      </div>
    </form>
  )
}

export default Filter