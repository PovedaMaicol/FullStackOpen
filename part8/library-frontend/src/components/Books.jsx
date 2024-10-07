import { useLazyQuery, useQuery } from "@apollo/client"
import { ALL_BOOKS, ALL_GENRES, FIND_BOOKS_RECOMMEND } from "../queries"
import { useEffect, useState } from "react"
import { Table } from "react-bootstrap"
import Select from "react-select"

const Books = (props) => {
  const [category, setCategory] = useState('All')
  // const [allGenres, setAllGenres] = useState([])
  const [selectGenre, setSelectGenre] = useState(null)



  //libros filtrados
  const [getFilterBook, { data: filterData, loading: filterLoading, error: filerError}] = useLazyQuery(FIND_BOOKS_RECOMMEND)

  // todos los libros
  const {loading, error, data } = useQuery(ALL_BOOKS)

  
  // todos los generos
  const todosGeneros = useQuery(ALL_GENRES)
  if(todosGeneros) {
    console.log('los generos son ', todosGeneros)
  }

  const options = todosGeneros.data ? todosGeneros.data.allGenres.map((g) => ({
  value: g,
  label: g
})) : [];
console.log('options son' ,options)


 
  
  
  const submit = async (e) => {
    e.preventDefault()

    }
  


  useEffect(() => {
    if(category !== 'All') {
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


  const books = category  === 'All' 
  ? data.allBooks 
  :
  filterData ? filterData.allBooks : []


  
if( category !== 'All') {
  if(filterLoading) return <div>Loading...</div>
  if(filerError) return <div>Error... {filerError.message}</div>
}
console.log('El resultado es', books)



  return (
    <div className="container" style={{ paddingTop: '65px'}}>
    
          <form onSubmit={submit} style={{display: 'flex', justifyContent:'space-between', alignItems: 'center'}}>
            <h1 style={{margin: '0', padding: '0', lineHeight: '1'}}>
              {
                category ? `${category} Books` : Books
              }
              </h1>


            <div style={{width:'60%', height: '20px'}}>
            <Select 
             value={category}
            onChange={(selectedOption) => setCategory(selectedOption.value)}
            options={options}
            placeholder='Select a genre...'
    
  
          />
            </div>
       
          </form>
          <br/>

     
   

      <Table striped style={{'--bs-table-striped-bg': 'rgba(255, 236, 170)', border: 'transparent'}}>
        <tbody>
          <tr>
            <th>Name</th>
            <th>Author</th>
            <th>Published</th>
          </tr>
          {books.map((b) => (
            <tr key={b.id}>
              <td style={{fontStyle: 'italic', margin: '0', lineHeight: '1'}}>{b.title}</td>
              <td style={{fontStyle: 'italic'}}>{b.author}</td>
              <td style={{fontStyle: 'italic'}}>{b.published}</td>
            </tr>
          ))}
        </tbody>
      </Table>


    </div>
  )
}

export default Books
