import React, {useState} from 'react';
import { FlatList, View, StyleSheet, Text, SafeAreaView } from 'react-native';
import { useNavigate } from 'react-router-native';
import { useDebounce } from 'use-debounce'
import useRepositoriesGql from '../src/hooks/useRepositoriesGQL';
import RepositoryCard from './RepositoryCard';
import OrderPicker from './OrderPicker';
import SearchBar from './SearchBar';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
});

const ItemSeparator = () => <View style={styles.separator} />;

export const RepositoryListContainer = ({ repositories,  orderBy, setOrderBy, setOrderDirection, searchKeyword, setSearchKeyword}) => {
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
        ListHeaderComponent={
        <>
        <SearchBar
        searchKeyword={searchKeyword}
        setSearchKeyword={setSearchKeyword}
        />
        
        <OrderPicker
        orderBy={orderBy}
        setOrderBy={setOrderBy}
        setOrderDirection={setOrderDirection}
        />
        </>
        }
      />
    </SafeAreaView>
  );
};

const RepositoryList = () => {
  const [orderBy, setOrderBy] = useState('CREATED_AT');
  const [orderDirection, setOrderDirection] = useState('DESC');
  const [searchKeyword, setSearchKeyword] = useState('')

    // Aplica debouncing a la palabra clave
    const [debouncedSearchKeyword] = useDebounce(searchKeyword, 500);


  const { repositories, loading, error } = useRepositoriesGql({
    orderBy,
    orderDirection,
    searchKeyword: debouncedSearchKeyword,
  });

  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error</Text>;

  return <RepositoryListContainer 
  repositories={repositories}
  orderBy={orderBy}
  setOrderBy={setOrderBy}
  setOrderDirection={setOrderDirection}
  searchKeyword={searchKeyword}
  setSearchKeyword={setSearchKeyword}
   />;
};

export default RepositoryList;
