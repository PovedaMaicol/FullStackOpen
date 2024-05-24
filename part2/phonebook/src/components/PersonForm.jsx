import React, { useState, useEffect } from 'react';
import './styles/personForm.css';


const PersonForm = ({ addContact, newName, handleChangeName, newNumber, handleChangeNuber, newMail, handleChangeMail, newBirthday, handleChangeBirthday, doHome, doHome2 }) => {


  return (
   
    <form className='container-addcontact' onSubmit={addContact}>
      <br />
      <div className='reg-but'>
        <div>
          <i className='bx bx-x' onClick={doHome}></i>
          <h2>Create contact</h2>
        </div>
        <button type="submit" onClick={doHome2}>Add</button>
      </div>
      <br className='ocultar'/>
      <br  className='ocultar'/>
      <br />
      <br />
      <br />
      <div className='reg-icon'>
        <h1 className='identificador'>{newName[0]}</h1>
      </div>
      <br />
      <br />
      <br />
      <div className='reg-name'>
        <i className="fa-regular fa-user"></i>
        <input placeholder='Name' value={newName} onChange={handleChangeName} />
      </div>
      <br />
      <div className='reg-num'>
        <i className='bx bx-phone'></i>
        <input placeholder='Number' type='number' value={newNumber} onChange={handleChangeNuber} />
      </div>
      <br />
      <div className='reg-gmail'>
        <i className='bx bx-envelope'></i>
        <input placeholder='Gmail' type='email' value={newMail} onChange={handleChangeMail} />
      </div>
      <br />
      <div className='reg-birthday'>
        <i className='bx bx-calendar-event'></i>
        <input type='date' value={newBirthday} onChange={handleChangeBirthday} />
      </div>
    </form>
  
  );
}

export default PersonForm;
