import React from 'react'
import { useDispatch } from 'react-redux'
import { filterChange, setFilterText } from '../reducers/filterReducer'

const Filter = () => {
  const dispatch = useDispatch();

    // const handleChange = (event) => {
    //   const filter = event.target.value;
    //   dispatch(filterChange(filter))

    //   }

    const handleTextChange = (event) => {
      const filterText = event.target.value;
      dispatch(setFilterText(filterText))
    }

      const style = {
        marginBottom: 10
      }


  return (
    <div style={style}>
    filter <input onChange={handleTextChange} />
  </div>
  )
}

export default Filter