import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_BOOKS, FIND_BOOKS_RECOMMEND } from "../queries"
import { useEffect, useState } from "react"

const Books = (props) => {
  const [category, setCategory] = useState('all')
  const [allGenres, setAllGenres] = useState([])

  //libros filtrados
  const [getFilterBook, { data: filterData, loading: filterLoading, error: filerError}] = useLazyQuery(FIND_BOOKS_RECOMMEND)

  // todos los libros
  const {loading, error, data } = useQuery(ALL_BOOKS)


//obtener todos los generos
  useEffect(() => {
    if(data) {

      const genres = data.allBooks.flatMap(b => b.genres)
      const uniqueGenres = Array.from(new Set(genres))
      setAllGenres(['all', ...uniqueGenres])
    }
  }, [data])

  // obtener libros filtrados x categoria

  useEffect(() => {
    if(category !== 'all') {
     getFilterBook({ variables: {favoriteGenre: category}})
    }
  }, [category, getFilterBook])


  if (!props.show) {
    return null
  }

  if (loading)  {
    return <div>loading...</div>
  }

  if (error) {
    return <div>Error... {error.message}</div>
  }


  const books = category  === 'all' 
  ? data.allBooks 
  :
  filterData ? filterData.allBooks : []


  
if( category !== 'all') {
  if(filterLoading) return <div>Loading...</div>
  if(filerError) return <div>Error... {filerError.message}</div>
}
console.log('El resultado es', books)
console.log('Los géneros son', allGenres)


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
