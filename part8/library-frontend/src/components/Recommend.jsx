import React, { useEffect, useState } from 'react'
import {  ALL_BOOKS  } from '../queries'
import { useLazyQuery, useQuery } from '@apollo/client'
import { Table } from 'react-bootstrap'

const Recommend = (props) => {
  const { data: recommendData, loading: recommendLoading, error: recommendError, refetch } = useQuery(ALL_BOOKS)

  
  const [recommend, setRecommend] = useState(null)


  useEffect(() => {
    if (props.user && props.user.favoriteGenre) {
      // Aquí filtramos los libros por el género favorito del usuario
      const filteredBooks = recommendData?.allBooks.filter(book => book.genres.includes(props.user.favoriteGenre)) || []
      setRecommend(filteredBooks)
    }
  }, [props.user, recommendData]) // Dependencias actualizadas

  // Llama a refetch para actualizar las recomendaciones cuando se agrega un libro
  useEffect(() => {
    if (props.newBookAdded) { // Prop que indica que se agregó un nuevo libro
      refetch()
    }
  }, [props.newBookAdded, refetch])

  if (!props.show) {
    return null
  }

  if (recommendLoading) {
    return <div>Loading recommendations...</div>
  }

  if (recommendError) {
    return <div>Error: {recommendError.message}</div>
  }

  if (!props.user) {
    return <div>No user data found</div>
  }

  const user = props.user
console.log('recommend es', recommend)


  return (
    <div className='container' style={{ paddingTop: '65px' }}>
      <h1 style={{ padding: '0' }}>
  <span style={{ fontWeight: 'normal' }}>Hello {user.username}</span>
  <br />
  { 
  recommend.length > 0 ? 
    `in ${user.favoriteGenre} we recommend` : 
    `Not have any ${user.favoriteGenre} recommendations`
}
</h1>
      <br />
      <Table striped style={{ '--bs-table-striped-bg': 'rgba(255, 236, 170)', border: 'transparent' }}>
        <tbody>
          <tr>
            <th>Book</th>
            <th>Author</th>
            <th>Genre</th>
          </tr>
          {recommend?.map((b) => (
            <tr key={b.id}>
              <td>{b.title}</td>
              <td>{b.author}</td>
              <td>{b.genres.join(", ")}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  )
}

export default Recommend
