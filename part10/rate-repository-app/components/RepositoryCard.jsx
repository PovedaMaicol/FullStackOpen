import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  cabezote: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  texto: {
    flex: 1,
    marginLeft: 10,
  },
  title: {
    fontWeight: 'bold',
    color: 'black',
  },
  subtitle: {
    color: 'gray',
    fontSize: 14,
    lineHeight: 20,
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  txtList: {
    textAlign: 'center',
  },
  tinyProfile: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
});

const RepositoryCard = ({
  fullName,
  description,
  language,
  stargazersCount,
  forksCount,
  reviewCount,
  ratingAverage,
  ownerAvatarUrl,
  onPress,
}) => {
  const Content = (
    <View style={styles.itemContainer}>
      <View style={styles.cabezote}>
        <Image style={styles.tinyProfile} source={{ uri: ownerAvatarUrl }} />
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
          <Text style={{ fontWeight: 'bold' }}>{stargazersCount}</Text>
          {"\n"}Stars
        </Text>
        <Text style={styles.txtList}>
          <Text style={{ fontWeight: 'bold' }}>{forksCount}</Text>
          {"\n"}Forks
        </Text>
        <Text style={styles.txtList}>
          <Text style={{ fontWeight: 'bold' }}>{reviewCount}</Text>
          {"\n"}Reviews
        </Text>
        <Text style={styles.txtList}>
          <Text style={{ fontWeight: 'bold' }}>{ratingAverage}</Text>
          {"\n"}Rating
        </Text>
      </View>
    </View>
  );

  return onPress ? <TouchableOpacity onPress={onPress}>{Content}</TouchableOpacity> : Content;
};

export default RepositoryCard;
