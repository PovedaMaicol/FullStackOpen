const Course = ({curso}) => {
    let exercises = 0;
   
    return (

      <div>
         <h1>{curso.name}</h1>
        {
            
         curso.parts.map(curso =>
            
          <li key={curso.id} exercises={exercises += curso.exercises}>
            {curso.name} {curso.exercises}
         </li>
        
         )
        
        
        }
        <h1><span>total of {exercises} exercises</span></h1>
      </div>
    )
  }

  export default Course