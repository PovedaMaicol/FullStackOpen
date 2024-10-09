import React, { useEffect, useState } from 'react'
import { FIND_BOOKS_RECOMMEND, ALL_BOOKS, ADD_BOOK } from '../queries'
import { useLazyQuery } from '@apollo/client'
import { Table } from 'react-bootstrap'

const Recommend = (props) => {
  const [getRecommend, { data: recommendData, loading: recommendLoading, error: recommendError }] = useLazyQuery(ALL_BOOKS)

  
  const [recommend, setRecommend] = useState(null)


  useEffect(() => {
    if (props.user && props.user.favoriteGenre) {
      getRecommend({ variables: { genre: props.user.favoriteGenre } })
    } 
  }, [props.user, getRecommend ])  


  useEffect(() => {
    if (recommendData) {
      setRecommend(recommendData.allBooks)
    }
  }, [recommendData])  // Re-renderizar solo cuando `recommendData` cambie

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
    "We recommend" : 
    "Not have recommend"
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
