import React from 'react'

const PersonForm = ({addContact, newName, handleChangeName, newNumber, handleChangeNuber}) => {
  return (
    <form onSubmit={addContact}>
    <div>
      name: <input value={newName} onChange={handleChangeName}/>
    </div>
    <div>
      number: <input type='number' value={newNumber} onChange={handleChangeNuber}/>
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
  )
}

export default PersonForm