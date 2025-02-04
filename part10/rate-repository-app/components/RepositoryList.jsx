import React, { useState, useEffect } from 'react';
import { FlatList, View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';
// import useRepositories from '../src/hooks/useRepositories';

import useRepositoriesGql from '../src/hooks/useRepositoriesGQL';

const styles = StyleSheet.create({
  separator: {
    height: 10,
  },
  container : {
    // el flex 1, hace que el elemento ocupe todo el espacio dicponible
    flex: 1,
    padding: 10,
    backgroundColor: '#faf1f',
  },
  tinyProfile: {
    width: 50,
    height: 50,
    borderRadius: 5,
    marginRight: 10,
  },
  itemContainer: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  cabezote: {
    marginVertical: 0,
    marginHorizontal: 10,
    flexDirection: 'row',
    flex: 1, 
  },
  texto: {
  flex: 1,
  marginRight: 10,
  },
  title: {
    fontWeight: 'bold',
  },
  subtitle: {
    color: 'gray',
    fontSize: 14,
    lineHeight: 20,
    flexShrink: 1,
  },
  languageTag: {
    backgroundColor: 'blue',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginTop: 4,
  },
  languageText: {
    fontWeight: 'bold',
    color: 'white',
  
  },
  list: {
    marginHorizontal: 10,
    marginVertical: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',

  },
  txtList: {
    textAlign: 'center',
    lineHeight: 20,
  }
});



const ItemSeparator = () => <View style={styles.separator} />;

const Item = ({fullName, description, language, stargazersCount, forksCount, reviewCount, ratingAverage,ownerAvatarUrl }) => (
  <View style={styles.itemContainer}>


  <View style={styles.cabezote}>
    <Image
    style={styles.tinyProfile}
    source={{uri: ownerAvatarUrl}}
    />

    <View style={styles.texto}>
    <Text style={styles.title}>{fullName}</Text>
    <Text style={styles.subtitle}>{description}</Text>
    <View style={styles.languageTag}>
    <Text style={styles.languageText}>{language}</Text>
    </View>
  
  

   
   
    </View>
    </View>

    <View style={styles.list}>

    <Text style={styles.txtList}>
      <Text style={{fontWeight: 'bold'}}>
        {stargazersCount}
      </Text>
      {"\n"}
      Stars
    </Text>

    <Text style={styles.txtList}>
      <Text style={{fontWeight: 'bold'}}>
        {forksCount}
      </Text>
      {"\n"}
      Forks
    </Text>

    <Text style={styles.txtList}>
      <Text style={{fontWeight: 'bold'}}>
      {reviewCount}
      </Text>
      {"\n"}
      Reviews
    </Text>

    <Text style={styles.txtList}>
      <Text style={{fontWeight: 'bold'}}>
      {ratingAverage}
      </Text>
      {"\n"}
      Rating
    </Text>
    </View>
    
    
  </View>
);

const RepositoryList = () => {

// GET WITH API REST
//  const {repositories} = useRepositories();
//  console.log('los repositorios son', repositories)


// GET WITH GRAPHQL
const { repositories, loading, error } = useRepositoriesGql();

if (loading) return <Text>Loading...</Text>;
if(error) return <Text>Error</Text>;

console.log('repositories con gql trae', repositories)





  // Get the nodes from the edges array
  const repositoryNodes = repositories
    ? repositories.edges.map(edge => edge.node)
    : [];


  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={repositoryNodes}
      ItemSeparatorComponent={ItemSeparator}
      renderItem={({item}) => 
      <Item 
      fullName={item.fullName}
      description={item.description}
      language={item.language}
      stargazersCount={item.stargazersCount}
      forksCount={item.forksCount}
      reviewCount={item.reviewCount}
      ratingAverage={item.ratingAverage}
      ownerAvatarUrl={item.ownerAvatarUrl}
      />}
      keyExtractor={item => item.id}
     
      // other props
    />
    </SafeAreaView>
  );
};

export default RepositoryList;