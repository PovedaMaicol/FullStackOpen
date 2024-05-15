import React, {useEffect, useState} from "react"


function App() {

  // frase aleatoria
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ];


  const [selected, setSelected] = useState(0);
  const [votos, setVotos] = useState(new Array(anecdotes.length).fill(0));
  const [maxIndex, setMaxIndex] = useState(0);

  const randomAnecdote = () => {
    setSelected(Math.floor(Math.random()*anecdotes.length));
  }

    const handleVotes = () => {
      const updateVotes = [...votos];
      updateVotes[selected] += 1;
      console.log(updateVotes)
    setVotos(updateVotes);
     
     if (updateVotes[selected] > updateVotes[maxIndex]) {
      setMaxIndex(selected);
     }
    };
 

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>

      {
        votos[selected] > 0 && (
        <p>{`has ${votos[selected]} votes`}</p>
        )
      }
      
      <br/>
      <button onClick={() => {handleVotes()}}>vote</button>
      <button onClick={randomAnecdote}>next anecdote</button>

      {votos[maxIndex] > 0 && (
        <div>
          <h1>Anecdote with most votes</h1>
          <p>{anecdotes[maxIndex]}</p>
          <p>has {votos[maxIndex]} votes</p>
        </div>
      )}
    </div>
  )
}

export default App
