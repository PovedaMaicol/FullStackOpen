import { createSlice} from "@reduxjs/toolkit"
const anecdotesAtStart = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

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

let initialState = anecdotesAtStart.map(asObject).sort(sortVotes);



const anecdotesSlice = createSlice({
name: 'anecdotes',
initialState,
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
    const newAnecdote = asObject(action.payload);
    state.push(newAnecdote);

    return state.sort(sortVotes)

  }
}
})



export const { like , createAnecdote } = anecdotesSlice.actions;
export default anecdotesSlice.reducer;
