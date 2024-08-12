import { createSlice} from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
  console.log('anecdote es', anecdote)
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

const sortVotes = (a, b) => b.votes - a.votes;




const anecdotesSlice = createSlice({
name: 'anecdotes',
initialState: [],
reducers: {
  like(state, action){
    const id = action.payload;
    const anecdote = state.find(n => n.id === id)
    if(anecdote) {
      anecdote.votes += 1
    }
    console.log('aqui id es', id)
    console.log('action es', action)
    return state.sort(sortVotes)
  },

  createAnecdote(state, action){
   state.push(action.payload)
  },

  appendAnecdote(state, action){
    state.push(action.payload)
  },
  setAnecdotes(state, action){
    return action.payload
  }
}
})



export const { like , createAnecdote, appendAnecdote, setAnecdotes } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
