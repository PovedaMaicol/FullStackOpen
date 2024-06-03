import './styles/personForm.css';

import Notification from './Notification';


const PersonForm = ({ addContact, newName, handleChangeName, newNumber, handleChangeNuber, newMail, handleChangeMail, newBirthday, handleChangeBirthday, doHome, doHome2, notificationMessage }) => {


  return (
   
    <form className='container-addcontact' onSubmit={addContact}>

      <div className='reg-but'>
        <div>
          <i className='bx bx-x cerrar' onClick={doHome}></i>
          <h2>Create contact</h2>
        </div>
        <button type="submit" onClick={doHome2}>Add</button>
      </div>


      <Notification message={notificationMessage}/>
     
     
      <div className='reg-icon'>
        <br className='ocultar'/>
        <h1 className='identificador'>{newName[0]}</h1>
      </div>

      <div className='reg-form'>
      <div className='reg-name'>
        <i className="fa-regular fa-user"></i>
        <input placeholder='Name' value={newName} onChange={handleChangeName} />
      </div>
      <br />
      <div className='reg-num'>
        <i className='bx bx-phone'></i>
        <input placeholder='Number'  type='tel' value={newNumber} onChange={handleChangeNuber} />
      </div>
      <br />
      <div className='reg-gmail'>
        <i className='bx bx-envelope'></i>
        <input placeholder='Gmail' type='email' value={newMail} onChange={handleChangeMail} />
      </div>
      <br />
      <div className='reg-birthday'>
        <i className='bx bx-calendar-event'></i>
        <input type='date' placeholder='birthday' value={newBirthday} onChange={handleChangeBirthday} />
      </div>

      </div>
     
    </form>
  
  );
}

export default PersonForm;
