import React from 'react';
import { FlatList, View, StyleSheet, Text, Image, SafeAreaView } from 'react-native';

// FlatList: Un componente optimizado para listas largas en React Native.
// // View: Contenedor básico en React Native, similar a una div en HTML.
// StyleSheet: Utilizado para definir estilos en React Native.
// Text: Para mostrar texto.
// Image: Para mostrar imágenes.
// // SafeAreaView: Asegura que el contenido no se superponga a áreas como la barra de estado en iOS.
// 


// esta linea se usa para crear estilos y luego aplicar a los componentes
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

const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];

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
  return (
    <SafeAreaView style={styles.container}>
    <FlatList
      data={repositories}
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