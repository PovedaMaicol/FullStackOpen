import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { format } from 'date-fns';
import { useMutation } from '@apollo/client';
import { DELETE_REVIEW } from '../src/graphql/mutations';
import { useNavigate } from 'react-router-native';

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

const ReviewItem = ({ review, refetch }) => {

  const navigate = useNavigate();
  const isVisibleBtns = !!review.repository?.fullName;

  const usernameOrRepository = review.user?.username ?? review.repository?.fullName;

  // uso mutacion para borrar una review
  const [deleteReview] = useMutation(DELETE_REVIEW, {
    onCompleted: () => {
      Alert.alert('Review eliminada', 'La review fue eliminada correctamente');
      if (refetch) refetch(); // refetch para actualizar la lista de reviews
    },
    onError: (error) => {
      Alert.alert('Error', `No se pudo eliminar la revisión: ${error.message}`);
    },
  });

  const handleDelete = () => {
    Alert.alert('¿Estás seguro?', 'La revisión será eliminada permanentemente.', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            await deleteReview({ variables: { deleteReviewId: review.id } });
            if (refetch) {
              const { data } = await refetch();
              const remainingReviews = data?.repository?.reviews?.edges || [];
  
              // Si no quedan más revisiones en el repositorio, eliminarlo de la lista
              if (remainingReviews.length === 0) {
                // Aquí puedes hacer una función para eliminar el repositorio del estado
                console.log('No hay más revisiones, eliminando repositorio...');
                // removeRepository(repository.id); // <-- Implementa esta función si es necesario
              }
            }
          } catch (error) {
            console.error('Error al eliminar la revisión:', error);
          }
        },
      },
    ]);
  };
  

  const handleViewRepository = () => {
    const id = review.repository?.fullName?.replace('/', '.');
    if (id) {
      navigate(`/repository/${id}`);
    } else {
      console.warn('El id es inválido:', review.repository);
    }
  };
  

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
              onPress={handleViewRepository}
            >
              <Text style={styles.buttonText}>Ver</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={{ ...styles.button, backgroundColor: 'red' }}
              onPress={handleDelete}
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
