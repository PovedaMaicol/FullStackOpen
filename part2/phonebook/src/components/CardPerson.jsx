import React from "react"


const CardPerson = ({doHome, contact}) => {

    
  return (
    <>
     <div>CardPerson</div>
    <button onClick={doHome}>back</button>
    <ul>
        <li>{contact.name}</li>
        <li>{contact.gmail}</li>
        <li>{contact.birthday}</li>
        <li>{contact.number}</li>
    </ul>
    </>
   
  )
}

export default CardPerson