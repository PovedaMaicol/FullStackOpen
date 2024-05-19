import './App.css'
import Course from './components/Course'

// const Course = ({courses}) => {
//   let exercises = 0;
 
//   return (

//     <div>
//        <h1>{courses[0]?.name}</h1>
//       {
//        courses[0].parts.map(course =>
//         <li key={course.id} exercises={exercises += course.exercises}>
//           {course.name} {course.exercises}
//        </li>
//        )
      
//       }
//       <h1><span>total of {exercises} exercises</span></h1>
//     </div>
//   )
// }

function App() {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        },
        {
          name: 'hola',
          exercises: 7,
          id: 3
        }
      ]
    }
  ]

  return (
   
    <div>
      {
        courses.map(curso => (
          <Course key={curso.id}  curso={curso} name={curso.name}
        />
        ))
      }
     
{/* {
  
  courses.map(course => {
    <Course key={course.id} name={course.name}/>
    console.log(course)
    console.log(course.name)
    console.log(course.id)
  })
} */}


    </div>
   
  )
}

export default App
