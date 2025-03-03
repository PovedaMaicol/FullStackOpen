import { useQuery } from '@apollo/client';
import React from 'react';
import { View, Text, Button, Linking, StyleSheet, FlatList, ActivityIndicator } from 'react-native';
import { useParams } from 'react-router-native';
import { GET_REPOSITORY } from '../src/graphql/queries';
import RepositoryCard from './RepositoryCard';
import ReviewItem from './ReviewItem';

const styles = StyleSheet.create({
  container: {
    flex: 1, // Para ocupar toda la pantalla
    backgroundColor: 'white',
    padding: 10,
  },
  separator: {
    height: 10
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const ItemSeparator = () => <View style={styles.separator}/>


const RepositoryItem = () => {
  const { id } = useParams();
  const { data, loading, error } = useQuery(GET_REPOSITORY, {
    variables: { id },
    fetchPolicy: 'cache-and-network',
  });

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }
  if (error) {
    return (
      <View style={styles.loadingContainer}>
        <Text>Error al cargar los datos</Text>
      </View>
    );
  }

  const repository = data?.repository;
  const reviews = repository?.reviews.edges.map((edge) => edge.node) || [];

  console.log('repositoryItem', repository)
  console.log('reviews', reviews)

  return (
    <View style={styles.container}>
      <FlatList
      // Queremos mostrar las reseñas como una lista desplazable, lo que hace que FlatList sea un componente adecuado para el trabajo
      data={reviews}
      renderItem={({item}) => <ReviewItem review={item}/>}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}

      //ListHeaderComponet permite agregar un componente en la parte superior de la lista
      ListHeaderComponent={() => (
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
        <Button title="Open in GitHub" onPress={() => Linking.openURL(repository.url)} />
      </>

      )}
      />

    </View>
  );
};

export default RepositoryItem;
