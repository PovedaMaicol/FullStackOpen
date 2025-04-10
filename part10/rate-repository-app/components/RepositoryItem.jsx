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
  const first = 2; // a cargar por pagina
  const { data, loading, error, fetchMore } = useQuery(GET_REPOSITORY, {
    variables: { id, first: 2},
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

  const loadMore = () => {
    if(repository?.reviews.pageInfo.hasNextPage){
      fetchMore({
        variables: {
          after: repository.reviews.pageInfo.endCursor,
          first,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) return previousResult;
          return {
            repository: {
              ...previousResult.repository,
              reviews: {
                ...fetchMoreResult.repository.reviews,
                edges: [
                  ...previousResult.repository.reviews.edges,
                  ...fetchMoreResult.repository.reviews.edges,
                ],
                pageInfo: fetchMoreResult.repository.reviews.pageInfo,
              },
            },
          };
        },
      });
    }
  }

  return (
    <View style={styles.container}>
      <FlatList
      // Queremos mostrar las reseñas como una lista desplazable, lo que hace que FlatList sea un componente adecuado para el trabajo
      data={reviews}
      renderItem={({item}) => <ReviewItem review={item} refetch={loadMore}/>}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={ItemSeparator}

      onEndReached={loadMore}
      onEndReachedThreshold={0.5} // Cuando el usuario llega al 50% del final
      ListFooterComponent={() =>
        repository?.reviews.pageInfo.hasNextPage ? (
          <ActivityIndicator size="small" color="blue" />
        ) : null
      }


      //ListHeaderComponet permite agregar un componente en la parte superior de la lista
      ListHeaderComponent={() => (
        <>
        <RepositoryCard
        {...repository}
        />
        <Button title="Open in GitHub" onPress={() => Linking.openURL(repository.url)} />
      </>

      )}
      />

    </View>
  );
};

export default RepositoryItem;
