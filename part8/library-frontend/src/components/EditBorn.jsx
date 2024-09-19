import React from 'react'
import { useState, useEffect } from "react"
import { useMutation } from '@apollo/client'
import { EDIT_AUTHOR, ALL_AUTHORS } from '../queries'
import Select from "react-select"

const EditBorn = ({authors, setError}) => {
    const [selectAuthor, setSelectAuthor] = useState(null)
    const [born, setBorn] = useState('')

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
    
    
    editAuthor({ variables: {name: selectAuthor.value, setBornTo: parseInt(born)}})
    setSelectAuthor(null)
    setBorn('')
    }

 // Formatear los autores para el selector
    const options = authors.map((a) => ({
    value: a.name,
    label: a.name,
    }));


  return (
    <div>
    <h2>Set birthyear</h2>
      <form onSubmit={submit}>
      <div>Author
      <Select 
      value={selectAuthor} 
      onChange={setSelectAuthor}
      options={options}
      />
      </div>
      <div>born
      <input value={born}  onChange={({ target }) => setBorn(target.value)}/>
      </div>
      <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default EditBorn