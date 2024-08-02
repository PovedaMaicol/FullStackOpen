import React from 'react'

const VisibilityFilter = () => {

    const filterSelected = (value) => {
    console.log(value)
    }
  return (
    <div>
    all          
    <input 
    type="radio" 
    name="filter"
    onChange={() => filterSelected('ALL')} 
    />
    important    
    <input 
    type="radio" 
    name="filter"
    onChange={() => filterSelected('IMPORTANT')} 
    />
    nonimportant 
    <input 
    type="radio" 
    name="filter"
    onChange={() => filterSelected('NONIMPORTANT')} 
    />
    </div>
  )
}

export default VisibilityFilter