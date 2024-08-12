import ReactDOM from 'react-dom/client'
import { configureStore } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'
import App from './App'
import reducer, { appendAnecdote, setAnecdotes } from './reducers/anecdoteReducer'


import anecdoteReducer from './reducers/anecdoteReducer'

import notificationReducer from './reducers/notificationSlice'

const store = configureStore({
reducer: {
  anecdotes: anecdoteReducer,
  notification: notificationReducer

}
})



ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <App />
  </Provider>
)