import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useEffect, useState } from "react"

const Books = (props) => {
  const [category, setCategory] = useState('all')
  const [allGenres, setAllGenres] = useState([])

  

  const {loading, error, data } = useQuery(ALL_BOOKS, {
    variables: { genre: category === 'all' ? null : category }
  })



  useEffect(() => {
    if(data) {

      const genres = data.allBooks.flatMap(b => b.genres)
      const uniqueGenres = Array.from(new Set(genres))
      setAllGenres(['all', ...uniqueGenres])
    }
  }, [data])


  if (!props.show) {
    return null
  }

  if (loading)  {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Error... {result.error.message}</div>
  }
console.log('el resultado es', data)


  const books = category  === 'all' 
  ? data.allBooks 
  :
  data.allBooks.filter(b => b.genres.includes(category)) 


  
console.log('genres es', allGenres)






  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { 
      allGenres.map((genre, index) => (
        <button 
        key={index} 
        onClick={() => setCategory(genre)}
        >
          {genre}
        </button>
      
      ))
      }
   

    </div>
  )
}

export default Books
