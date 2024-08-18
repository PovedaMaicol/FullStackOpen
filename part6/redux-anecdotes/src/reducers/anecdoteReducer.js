import { createSlice} from "@reduxjs/toolkit"
import anecdoteService from '../services/anecdotes'
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
    const updatedAnecdote = action.payload;
    return state.map(anecdote =>
      anecdote.id !== updatedAnecdote.id ? anecdote : updatedAnecdote
    ).sort(sortVotes);
  },

  appendAnecdote(state, action){
    state.push(action.payload)
  },
  setAnecdotes(state, action){
    return action.payload.sort(sortVotes)
  }
}
})

export const updateAnecdote = (id, newObject) => {
  return async (dispatch, getState) => {
    const updateAnecdote = await anecdoteService.update(id, newObject)
    dispatch(like(updateAnecdote.id));

    const anecdotes = getState().anecdotes.map(anecdote => anecdote.id === id ? updateAnecdote : anecdote)

    dispatch(setAnecdotes(anecdotes))
  }
}


export const { like , appendAnecdote, setAnecdotes } = anecdotesSlice.actions;


export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch(appendAnecdote(newAnecdote))
  }

}
export default anecdotesSlice.reducer;
