import React, { useEffect, useState } from 'react'
import { ME, FIND_BOOKS_RECOMMEND } from '../queries'
import { useLazyQuery, useQuery } from '@apollo/client'

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
    <div>
    <h1>Recommendations</h1>
    <p>books in your favorite genre:</p>  
{user.favoriteGenre}
    {
     recommend?.map( b => (
      <li key={b.id}>
        {b.title} - {b.author} - {b.published} - {b.genres}

        
        </li>
     ))

    }
    </div>
  )
}

export default Recommend