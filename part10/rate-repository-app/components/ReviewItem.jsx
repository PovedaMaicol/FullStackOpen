import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import {format} from 'date-fns'

import { Button } from 'react-native-paper';

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


  const ReviewItem = ({ review }) => {
    console.log('en reviewItem reviews', review);
  
    // Condicionalmente renderizar el nombre de usuario o el nombre del repositorio
    const usernameOrRepository = review.user?.username ? (
    
      <Text style={styles.username} accessibilityLabel={`Usuario: ${review.user.username}`}>
        {review.user.username}
      </Text>
  
    ) : review.repository?.fullName ? (
      <>
      <Text style={styles.username}>{review.repository.fullName}</Text>
      <View>
        <Button>ver</Button>
        <Button>borrar</Button>
      </View>
      </>
    ) : null;
  
    return (
      <View style={styles.container}>
        <View style={styles.ratingContainer}>
          <Text style={styles.ratingText}>{review.rating}</Text>
        </View>
  
        <View style={styles.reviewContent}>
          {usernameOrRepository} 
          <Text style={styles.date}>{format(new Date(review.createdAt), 'dd.MM.yyyy')}</Text>
          <Text style={styles.reviewText}>{review.text}</Text>
        </View>
      </View>
    );
  };
  
  export default ReviewItem;
