const initialState = {
  type: 'ALL',
  text: ''
}


const filterReducer = (state = initialState, action) => {
  console.log('ACTION: ', action)
    switch (action.type) {
      case 'SET_FILTER':
        return {...state, type: action.payload}
      default:
        return state
      case 'SET_FILTER_TEXT':
        return {...state, text: action.payload} 
    }
  }

  export const filterChange = filter => {
    return {
      type: 'SET_FILTER',
      payload: filter,
    }
  }

  export const setFilterText = filterText => {
    return {
      type: 'SET_FILTER_TEXT',
      payload: filterText
    }
  }
  
  
  export default filterReducer