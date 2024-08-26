import { useReducer, useState } from 'react'
import About from './components/About'
import Footer from './components/Footer'
import AnecdoteList from './components/AnecdoteList'
import Menu from './components/Menu'
import CreateNew from './components/CreateNew'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Anecdote from './components/Anecdote'
import Notification from './components/Notification'
// import { useQueryClient } from 'react-query'


const notificationReducer = (state, action) => {
  switch (action.type) {
    case "create":
      return `New anecdote created: ${action.payload}`;
    case "vote":
      return `Voted for: ${action.payload}`;
    case "clear": 
      return '';
      default:
        return state;
  }
}


const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
  ])

  const [notification, notificationDispatch] = useReducer(notificationReducer, '')

  // const queryClient = useQueryClient()

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
   <div>
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification message={notification}/>

      <Routes>
      <Route path="/" element={<AnecdoteList anecdotes={anecdotes} /> }/>

      <Route path="/anecdotes/:id" element={<Anecdote anecdotes={anecdotes} />} />

      <Route path="/about" element={<About/>}/>

      <Route path="/create" element={<CreateNew addNew={addNew} notificationDispatch={notificationDispatch}/>} />
      </Routes>
   
      <Footer />
    </div>
      
    </Router>
 
  )
}

export default App
