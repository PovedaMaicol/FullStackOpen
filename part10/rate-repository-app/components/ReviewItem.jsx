import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {format} from 'date-fns'

const styles = StyleSheet.create({
    container: {
      flexDirection: 'row',
      backgroundColor: '#f9f9f9',
      padding: 15,
      borderRadius: 8,
      marginVertical: 5,
    },
    ratingContainer: {
      width: 40,
      height: 40,
      borderRadius: 20,
      borderWidth: 2,
      borderColor: 'blue',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 10,
    },
    ratingText: {
      fontWeight: 'bold',
      color: 'blue',
    },
    reviewContent: {
      flex: 1,
    },
    username: {
      fontWeight: 'bold',
      marginBottom: 2,
    },
    date: {
      color: 'gray',
      marginBottom: 5,
    },
    reviewText: {
      fontSize: 14,
    },
  });
  

const ReviewItem = ({review}) => {
    // console.log('en reviewItem reviews', reviews)
  return (
    <View style={styles.container}>
 
    <View style={styles.ratingContainer}>
      <Text style={styles.ratingText}>{review.rating}</Text>
    </View>

    <View style={styles.reviewContent}>
      <Text style={styles.username}>{review.user.username}</Text>
      <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
      <Text style={styles.reviewText}>{review.text}</Text>
    </View>
  </View>
  );  
};

export default ReviewItem;
