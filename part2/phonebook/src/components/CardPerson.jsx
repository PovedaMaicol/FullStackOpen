import React from "react";
import './styles/cardPerson.css';

const CardPerson = ({ doHome, contact = {} }) => {
  return (
    <>
     <br/>
     <i className='bx bx-x' onClick={doHome}></i>
      <br/>
<br/>
      <div className="cabezote-contacto">
        <i className='bx bxs-user-circle' ></i>
     
        <h2>{contact.name ? contact?.name : 'Does not register'}</h2>
      </div>

      <div className="body-contacto">
        <h4>Contact Information</h4>
        <ul>

        <li>
            <i className='bx bx-phone'></i>
            <div><h4>{contact.number ? contact?.number : 'Does not register'}</h4><span>Number phone</span></div>
            
          </li>

       <br/>

          <li>
          <i className='bx bx-user'></i>
          <div><h4>{contact.name ? contact?.name : 'Does not register'}</h4><span>Name</span></div>
            </li>
<br/>

          <li>
            <i className='bx bx-envelope'></i>
            <div><h4>{contact.gmail ? contact?.gmail : 'Does not register'}</h4><span>Email</span></div>
          </li>

          <br/>

          <li>
          <i className='bx bx-calendar-event'></i>
            <div><h4>{contact.birthday ? contact?.birthday : 'Does not register'}</h4><span>Birthday</span></div>
          </li>
         <br/>
        </ul>
      </div>
    </>
  );
};

export default CardPerson;
