import { useQuery } from '@apollo/client'
import React from 'react'
import { View, Text, Button, Linking } from 'react-native'
import { useParams } from 'react-router-native'
import { GET_REPOSITORY } from '../src/graphql/queries'
import RepositoryCard from './RepositoryCard'

const RepositoryItem = () => {
    const { id } = useParams()
    const { data, loading, error } = useQuery(GET_REPOSITORY, {
        variables: { id }, // Pasar el ID como variable
        fetchPolicy: 'cache-and-network',
    })

    if(loading) return <Text>Loading...</Text>
    if(error) return <Text>Error...</Text>

    const repository = data?.repository;
  return (
    <View>
      { repository && (
        <>
        <RepositoryCard
         fullName={repository.fullName}
         description={repository.description}
         language={repository.language}
         stargazersCount={repository.stargazersCount}
         forksCount={repository.forksCount}
         reviewCount={repository.reviewCount}
         ratingAverage={repository.ratingAverage}
         ownerAvatarUrl={repository.ownerAvatarUrl}
        />
        <Button title='Open in GitHub' onPress={() => Linking.openURL(repository.url)} />
        </>
      )}
    </View>
  )
}

export default RepositoryItem