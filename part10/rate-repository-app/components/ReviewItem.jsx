import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { format } from 'date-fns';

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
  buttonsGroup: {
    flexDirection: 'row',
    marginTop: 10,
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    height: 50,
    width: 100,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

const ReviewItem = ({ review }) => {
  const isVisibleBtns = !!review.repository?.fullName;

  const usernameOrRepository = review.user?.username ?? review.repository?.fullName;

  return (
    <View style={styles.container}>
      <View style={styles.ratingContainer}>
        <Text style={styles.ratingText}>{review.rating}</Text>
      </View>

      <View style={styles.reviewContent}>
        {usernameOrRepository && (
          <Text style={styles.username}>
            {usernameOrRepository}
          </Text>
        )}
        <Text style={styles.date}>
          {format(new Date(review.createdAt), 'dd.MM.yyyy')}
        </Text>
        <Text style={styles.reviewText}>{review.text}</Text>

        {isVisibleBtns && (
          <View style={styles.buttonsGroup}>
            <TouchableOpacity 
              style={styles.button} 
              onPress={() => console.log('Ver detalle')}
            >
              <Text style={styles.buttonText}>Ver</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ ...styles.button, backgroundColor: 'red' }}
              onPress={() => console.log('Eliminar')}
            >
              <Text style={styles.buttonText}>Borrar</Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    </View>
  );
};

export default ReviewItem;
