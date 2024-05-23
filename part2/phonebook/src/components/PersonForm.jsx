import React from 'react'
import './styles/personForm.css'

const PersonForm = ({addContact, newName, handleChangeName, newNumber, handleChangeNuber}) => {
  return (
    <form className='container-addcontact' onSubmit={addContact}>

    <div className='reg-but'>

      <div>
      <i className='bx bx-x' ></i>
      <h2>Create contact</h2>
      </div>
      
      <button type="submit">add</button>
    </div>

<br/>
    <div className='reg-name'>
    <i className="fa-regular fa-user"></i>
    <input placeholder='    Name' value={newName} onChange={handleChangeName}/>
    </div>
<br/>
    <div className='reg-num'>
    <i className='bx bx-phone'></i>
    <input placeholder='    Number' type='number' value={newNumber} onChange={handleChangeNuber}/>
    </div>

    
  </form>
  )
}

export default PersonForm