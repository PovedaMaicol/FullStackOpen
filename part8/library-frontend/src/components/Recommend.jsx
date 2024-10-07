import React, { useEffect, useState } from 'react'
import { ME, FIND_BOOKS_RECOMMEND } from '../queries'
import { useLazyQuery, useQuery } from '@apollo/client'
import { Table } from 'react-bootstrap'

const Recommend = (props) => {

  const [getRecommend, { data: recommendData, loading: recommendLoading, error: recommendError }] = useLazyQuery(FIND_BOOKS_RECOMMEND)
  const [recommend, setRecommend] = useState(null)




  useEffect(() => {
    if(props.user) {
      getRecommend({ variables: {favoriteGenre: props.user.favoriteGenre} })
    }
  }, [props.user, getRecommend])

  useEffect(() => {
    if(recommendData) {
      setRecommend(recommendData.allBooks)
    }
  }, [recommendData])
// console.log(meData)
console.log(recommend)

  if (!props.show) {
    return null
  }

  if (recommendLoading) {
    return <div>loading...</div>
  } 

  if(recommendError) {
    return <div>Error </div>
  }

  if(!props.user) {
    return <div>No register name</div>
  }
  console.log('lo que llega es',props.user)
  const user = props.user;

  return (
    <div className='container' style={{paddingTop: '65px'}}>
      <h1 style={{ padding: '0'}}>
        <span style={{fontWeight: 'normal'}}>Hello {user.username}</span> 
        <br/>
        We recommend:

        </h1>
        <br/>
    {/* <p>{user.username} books in your favorite genre:</p>   */}
{/* {user.favoriteGenre} */}
<Table striped style={{'--bs-table-striped-bg': 'rgba(255, 236, 170)', border: 'transparent'}}>
  <tbody>
    <tr>
      <th>Book</th>
      <th>Author</th>
      <th>Genre</th>
    </tr>
    {recommend?.map( b => (
      <tr key={b.id}>
        <td>{b.title}</td>
        <td>{b.author}</td>
        <td>{b.genres}</td> 
        </tr>
     ))
    }
  </tbody>
</Table>
  
    </div>
  )
}

export default Recommend