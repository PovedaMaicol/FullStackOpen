import React from 'react'
import { ME, ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = (props) => {

  const {data: meData, loading: meLoading, error: meError} = useQuery(ME)

  const genre = meData?.me?.favoriteGenre || null;
console.log('genre es',typeof(genre), genre)

  const {data: booksData, loading: booksLoading, error: booksError} = useQuery(ALL_BOOKS, {
    variables: { genre }, //paso genero como variable
    skip: !genre // si no ahi genero no se hace la consulta
  })
 

  if (!props.show) {
    return null
  }

  if (meLoading || booksLoading) {
    return <div>loading...</div>
  } 

  if(meError || booksError) {
    return <div>Error </div>
  }

// usuario logeado
  const me = meData?.me;
  console.log('me data es', me)
  console.log('books son', booksData)
  if(!me) {
    return <div>No register name</div>
  }

  const books = booksData.allBooks.filter(b => b.genres.includes(genre))
  return (
    <div>
    <h1>Recommendations</h1>
    <p>books in your favorite genre:</p>  
    <h1>{me.username} / {genre}</h1>  
    {
     books?.map( b => (
      <li key={b.id}>
        {b.title} - {b.author} - {b.published} - {b.genres}

        
        </li>
     ))

    }
    </div>
  )
}

export default Recommend