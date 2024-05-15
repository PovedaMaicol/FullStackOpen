import './App.css'
import React, {useState} from 'react'

const StaticLine = ({text, value}) => {
  return(
    <td>{`${text} ${value}`}</td> 
  )
}

const Statistics = (props) => {
  return(
  <table>
    <tbody>
    <tr>
    <StaticLine text="good" value={props.good}/>
    </tr>
    </tbody>

    <tbody>
    <tr>
    <StaticLine text="neutral" value={props.neutral} />
    </tr>
    </tbody>
    
    <tbody>
    <tr>
    <StaticLine text="bad" value={props.bad} />
    </tr>
    </tbody>
    
    <tbody>
    <tr>
    <td>{`Total comments ${props.all}`}</td>
    </tr>
    </tbody>
    
    <tbody>
    <tr>
    <td>{`Positive comments ${props.positive}%`}</td>
    </tr>
    </tbody>
    

  </table>
  )
}







function App() {

  // estados botones
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)

  // anecdota aleatoria
  const [selected, setSelected] = useState(0)
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  return (
    <div>
      <h1>give feedback</h1>
      <section className='buttons'>
        <button onClick={() => {setGood(good + 1); setTotal(total + 1);}}>good</button>
        <button onClick={() => {setNeutral(neutral + 1); setTotal(total + 1)}}>neutral</button>
        <button onClick={() => {setBad(bad + 1); setTotal(total + 1)}}>bad</button>
      </section>
      
      <h1>Statictics</h1>

      {
        total ?
        <Statistics
        good={good}
        neutral={neutral}
        bad={bad}
        all={total}
        positive={(good/total) * 100}
        /> 
        : 
        <h3>No feedback given</h3>
      }
    
    </div>
  )
}

export default App;