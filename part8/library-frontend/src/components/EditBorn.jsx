import React from 'react'
import { useState, useEffect } from "react"
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from "react-select"
import { Button, Form } from 'react-bootstrap'

const EditBorn = ({authors, setError, user}) => {
    const [selectAuthor, setSelectAuthor] = useState(null)
    const [born, setBorn] = useState('')

    const groups = {
      display: 'flex', 
      flexDirection: 'column', 
      margin: '0', 
      padding: '0'
  }

  
  const groups2 = {
    display: 'flex', 
    flexDirection: 'column',
    margin: '0', 
    padding: '0'
}

  
  const inputs = {
    width: 'inherit',  
    height: '40px',
    borderRadius: '5px',
    paddingLeft: '10px',
    backgroundColor: 'transparent',
    border: '2px solid gray'

}

const inputs2 = {
  width: '65%',
  height: '40px',
  borderRadius: '5px 0 0 5px',
  paddingLeft: '10px',
  backgroundColor: 'transparent',
  border: '2px solid gray'

}

const buttons = {
  width: '35%', 
  backgroundColor: '#050522',
  color: '#e1c461',
  height: '40px',
  borderRadius: '0 5px 5px 0',
  border: 'transparent',
  lineHeight: '1',
  display: 'flex',
  
  alignItems: 'center',
  justifyContent: 'center'
}


    const [ editAuthor, result ] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [ {query: ALL_AUTHORS}],
        onError: (error) => {
            setError(error.graphQLErrors[0]?.message || "Something went wrong");
          },
    })
  
    useEffect(() => {
    if (result.data && result.data.editNumber === null) {
      setError('Author not found')
    }
    }, [result.data, setError]);


    const submit = async (event) => {
    event.preventDefault();

    if (!selectAuthor) {
    setError("Please select an author");
    return;
    }

    if(user) {
      editAuthor({ variables: {name: selectAuthor.value, setBornTo: parseInt(born)}})
      setSelectAuthor(null)
      setBorn('')
    }
    
    
   
    }

 // Formatear los autores para el selector
    const options = authors.map((a) => ({
    value: a.name,
    label: a.name,
    }));


  return (
    <div>
    <h3>Set birthyear</h3>
      <Form onSubmit={submit}>
      <Form.Group style={groups}>
      <Form.Label>Author</Form.Label>
      
      <Select 
      value={selectAuthor} 
      onChange={setSelectAuthor}
      options={options}
      style={inputs}
      />
      </Form.Group>

      <Form.Group style={groups2}>
      <Form.Label>Born</Form.Label>


      <div style={{ display: 'flex', width: '100%'}}>
      <Form.Control
      style={inputs2}
      value={born}  
      onChange={({ target }) => setBorn(target.value)}
      />

      <Button type="submit" style={buttons}>Update author</Button>

      </div>
    
      </Form.Group>
    
    
      </Form>
    </div>
  )
}

export default EditBorn