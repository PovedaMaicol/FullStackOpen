import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { ADD_BOOK, ALL_BOOKS, ALL_GENRES, FIND_BOOKS_RECOMMEND} from '../queries'
import { Button, Form } from 'react-bootstrap'



const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

     
  const groups = {
    display: 'flex', 
    flexDirection: 'column', 
    margin: '0', 
    padding: '0'
}

const groupsBut = {
  display: 'flex',
  flexDirection: 'column',
  width: '100%',


}
const inputs = {
  width: 'inherit',  
  height: '40px',
  borderRadius: '5px',
  paddingLeft: '10px',
  backgroundColor: 'transparent',
  border: '2px solid gray'

}

const inputsBut = {
  display: 'flex',
  width: '70%',
  borderRadius: '5px 0 0 5px',
  paddingLeft: '10px',
  backgroundColor: 'transparent',
  border: '2px solid gray'
}

const buttons = {
  width: '30%', 
  backgroundColor: '#050522',
  color: '#e1c461',
  height: '40px',
  border: 'transparent',
  borderRadius: '0 5px 5px 0',
  lineHeight: '1'

}


const buttons2 = {
  width: '100%', 
  backgroundColor: '#050522',
  color: '#e1c461',
  height: '40px',
  borderRadius: '5px',

}

const form = {
  backgroundColor:'#ffecaa', 
 display: 'flex',
 flexDirection: 'column',
 justifyContent: 'space-around',
 height: '100vh',
  // height: 'calc(100vh - 50px)', 
  padding: '70px 20px 0 20px'
}


  

  
 
  const [ addBook ] = useMutation(ADD_BOOK, {
    refetchQueries: [ { query: ALL_BOOKS },
      {query: ALL_GENRES}
    ],
    onError: (error) => {
      const messages = error.graphQLErrors.map(e => e.message).join('\n')
      props.setMessage(messages)
    },
    update: (store, response) => {
      updateCacheWith(response.data.addBook)
    }
  })

  if (!props.show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
  
  const publishedInt = parseInt(published)

  await addBook({ variables: {title, published: publishedInt, author, genres: genres.length > 0 ? genres : "undefined"}})

  console.log('add book...')

  props.setMessage(`${title} added`) 
   setTimeout(() => {
    props.setMessage(null)
  }, 5000);  
  setTitle('')
  setPublished('')
  setAuthor('')
  setGenres([])
  setGenre('')
  props.setPage('books')
  
  }

  const addGenre = () => {
    if (genre && !genres.includes(genre)) { // Solo agregar si el género no está ya en la lista
      setGenres(genres.concat(genre));
      setGenre('');
    }
  };


  return (
    <div>
     
      <Form style={form} onSubmit={submit}>

        <Form.Group>
        <h1 style={{ padding: '0'}}>
        <span style={{fontWeight: 'normal'}}>Hello...</span> 
        <br/>
        Register book here
        </h1>
        </Form.Group>


        <Form.Group style={groups}>
          <Form.Label>Title</Form.Label>
          <Form.Control
          style={inputs}
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>

        <Form.Group style={groups}>
          <Form.Label>Author</Form.Label>
          <Form.Control
          style={inputs}
          value={author}
          onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>

        <Form.Group style={groups}>
          <Form.Label>Published</Form.Label>
          <Form.Control
          style={inputs}
          type="number"
          value={published}
          onChange={({ target }) => setPublished(target.value)}
          />
        </Form.Group>



        <Form.Group style={groupsBut}>
          <Form.Label>Genre</Form.Label>
          
          <div style={{ display: 'flex', width: '100%'}}>
          <Form.Control
          style={inputsBut} 
          value={genre}
          onChange={({ target }) => setGenre(target.value)}
          />
          
          <Button 
          onClick={addGenre}
          style={buttons} 
          type="button">
            add genre
          </Button>
          </div>
        
        </Form.Group>

        <Form.Group style={groups}>
          <Form.Label>Genres: {genres.join(' ')}</Form.Label>
          <Button style={buttons2} type="submit">create book</Button>
        </Form.Group>
       
        
      </Form>
    </div>
  )
}

export default NewBook