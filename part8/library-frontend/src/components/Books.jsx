import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"
import { useEffect, useState } from "react"

const Books = (props) => {
  const [category, setCategory] = useState('')
  const [allGenres, setAllGenres] = useState([])

  const result = useQuery(ALL_BOOKS)

  useEffect(() => {
    if(result.data) {


      const genres = result.data.allBooks.flatMap(b => b.genres)
      const uniqueGenres = Array.from(new Set(genres))
      setAllGenres(uniqueGenres)
    }
  }, [result.data])


  if (!props.show) {
    return null
  }

  if (result.loading)  {
    return <div>loading...</div>
  }



  const books = category ? result.data.allBooks.filter(b => b.genres.includes(category)) : result.data.allBooks


  
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
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      { 
      allGenres.map((genre, index) => (
        <button key={index} onClick={() => setCategory(genre)}>{genre}</button>
      
      ))
      }

    </div>
  )
}

export default Books
