import { useQuery } from "@apollo/client"
import { ALL_BOOKS } from "../queries"


const Books = (props) => {

  const result = useQuery(ALL_BOOKS)
  if (result.loading)  {
    return <div>loading...</div>
  }
  if (!props.show) {
    return null
  }

  const books = result.data.allBooks

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
      books.map((book) => (
        <div key={book.id}>
          {
            book.genres.map((genre, index) => (
              <button key={index}>{genre}</button>
            ))
          }


        </div>
      ))
      }

    </div>
  )
}

export default Books
