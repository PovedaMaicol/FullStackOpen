import React from 'react'
import { ME, ALL_BOOKS } from '../queries'
import { useQuery } from '@apollo/client'

const Recommend = (props) => {
  const result = useQuery(ME)
  const resultBook = useQuery(ALL_BOOKS)
  // const resultRecomendations = useQuery(RECOMMENDATIONS)

  if (result.loading ) {
    return <div>loading...</div>
  } 

  if (!props.show) {
    return null
  }
  if (resultBook.loading) {
return <h1>Loading book</h1>

  }



  const me = result.data ? result.data.me : 'Not register username'
  const genre = result.data ? result.data.me.favoriteGenre : null
console.log('genre es', genre)

  const bookFilter = genre ? resultBook.data.allBooks.filter(b => b.genres.includes(genre)) : []

console.log(bookFilter)
 

  console.log('result od me query:', me)
 
  return (
    <div>
    <h1>Recommendations</h1>
    <p>books in your favorite genre:</p>  
    <h1>{me.username} / {me.favoriteGenre}</h1>  
    {
     bookFilter.map( b => (
      <li key={b.id}>
        {b.title} - {b.author} - {b.published}
        
        </li>
     ))

    }
    </div>
  )
}

export default Recommend