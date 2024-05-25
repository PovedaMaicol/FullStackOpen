import React from 'react'
import './styles/filter.css'
const Filter = ({searchContact, search, handleChangeSearch, doRegister}) => {
  return (
 

 <form className='fr-search'  onSubmit={searchContact}>
      <div className='container-search'>
      <i className='bx bx-search'></i>
      <input className='i-search' value={search} onChange={handleChangeSearch} placeholder='search contact'/>
      </div>

      <div className='container-add'>
      <i className="fa-solid fa-plus" onClick={doRegister}></i>
      
      </div>

     
    </form> 
   
   
  )
}

export default Filter

