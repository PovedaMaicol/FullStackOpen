const noteReducer = (state = [], action) => {
    switch(action.type) {
        case 'NEW_NOTE':
            state.concat(action.payload)
            return state
        case 'TOGGLE_IMPORTANCE':
            payload: {
                id: 2
              }
    }

  
    return state
  }