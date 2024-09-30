import React, { useEffect, useState } from 'react'
import { ME, FIND_BOOKS_RECOMMEND } from '../queries'
import { useLazyQuery, useQuery } from '@apollo/client'

const Recommend = (props) => {

  const [getRecommend, { data: recommendData, loading: recommendLoading, error: recommendError }] = useLazyQuery(FIND_BOOKS_RECOMMEND)
  const [recommend, setRecommend] = useState(null)



  const {data: meData, loading: meLoading, error: meError} = useQuery(ME)

  useEffect(() => {
    if(meData && meData.me && meData.me.favoriteGenre) {
      getRecommend({ variables: {favoriteGenre: meData.me.favoriteGenre} })
    }
  }, [meData, getRecommend])

  useEffect(() => {
    if(recommendData) {
      setRecommend(recommendData.allBooks)
    }
  }, [recommendData])
console.log(meData)
console.log(recommend)

  if (!props.show) {
    return null
  }

  if (meLoading || recommendLoading) {
    return <div>loading...</div>
  } 

  if(meError || recommendError) {
    return <div>Error </div>
  }

  if(!meData?.me) {
    return <div>No register name</div>
  }

  const user = meData.me;

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