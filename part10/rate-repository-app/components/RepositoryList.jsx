import React from 'react';
import { FlatList, View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useNavigate } from 'react-router-native';
import useRepositoriesGql from '../src/hooks/useRepositoriesGQL';
import RepositoryCard from './RepositoryCard';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories }) => {
  const navigate = useNavigate();
  const repositoryNodes = repositories ? repositories.edges.map((edge) => edge.node) : [];

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <FlatList
        data={repositoryNodes}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => (
          <RepositoryCard
            fullName={item.fullName}
            description={item.description}
            language={item.language}
            stargazersCount={item.stargazersCount}
            forksCount={item.forksCount}
            reviewCount={item.reviewCount}
            ratingAverage={item.ratingAverage}
            ownerAvatarUrl={item.ownerAvatarUrl}
            onPress={() => navigate(`/repository/${item.id}`)}
          />
        )}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

const RepositoryList = () => {
  const { repositories, loading, error } = useRepositoriesGql();

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return <RepositoryListContainer repositories={repositories} />;
};

export default RepositoryList;
