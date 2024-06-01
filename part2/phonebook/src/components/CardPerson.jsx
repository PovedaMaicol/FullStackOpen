import React from "react";
import './styles/cardPerson.css';

const CardPerson = ({ doHome, contact = {} }) => {
  return (
    <div className="cont-card">


      <div className="cabezote-contacto">
     <i className='bx bx-x cerrar' onClick={doHome}></i>
      

      <div className="inferior">
        <section>
        <i className='bx bxs-user-circle' ></i>
        <br/>
      <h2>{contact.name ? contact?.name : 'Does not register'}</h2>
        </section>
   
      </div>
      
      </div>

<br/>
      <div className="body-contacto">
        <h4 className="titular">Contact Information</h4>
        <ul className="ul-data">

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
    </div>
  );
};

export default CardPerson;
