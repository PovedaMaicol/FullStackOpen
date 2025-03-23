import { Formik } from 'formik'
import React from 'react'
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity} from 'react-native'
import * as Yup from 'yup'
import { ADD_REVIEW } from '../src/graphql/mutations'
import { useMutation } from '@apollo/client'
import { useNavigate } from 'react-router-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  form: {
    width: '100%'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  input: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 8,
    paddingHorizontal: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
  button: {
    height: 50,
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

})


const initialValues = {
  ownerName: '',
  repositoryName: '',
  rating: 0,
  text: ''
}

const validationSchema = Yup.object().shape({
  repositoryName: Yup.string().required('El nombre del repositorio es requerido'),
  ownerName: Yup.string().required('El dueño del repositorio es requerido'),
  rating: Yup.number().required('Añada una calificacion entre 0 y 100'),
  text: Yup.string().required('El comentario es requerido')

})



const ReviewForm = () => {
  const [createReview, { data, loading, error }] = useMutation(ADD_REVIEW);
  const navigate = useNavigate()


  const handleReview = async (values) => {
    const { repositoryName, ownerName, rating, text } = values;
  
    try {
      const { data } = await createReview({
        variables: {
          review: {
            repositoryName,
            ownerName,
            rating: Number(rating),
            text,
          },
        },
      });
      console.log('Review created with repositoryId:', data.createReview.repositoryId);
      navigate(`/repository/${data.createReview.repositoryId}`)
    } catch (e) {
      console.error('Error creating review:', e);
    }
  };
  
  return (
    <View style={styles.container}> 
    <Text style={styles.title}>Add repository</Text>
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleReview}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => 
        <View style={styles.form}>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error.message}</Text>}

          <TextInput
          placeholder='Nombre dueño del repositorio'
          onChangeText={handleChange('ownerName')}
          onBlur={handleBlur('ownerName')}
          value={values.ownerName}
          style={styles.input}
          />

        { touched.ownerName && errors.ownerName && (
          <Text style={styles.errorText}>{errors.ownerName}</Text>
        )}

        <TextInput
        placeholder='Nombre del repositorio'
        onChangeText={handleChange('repositoryName')}
        onBlur={handleBlur('repositoryName')}
        value={values.repositoryName}
        style={styles.input}
        />

        { touched.repositoryName && errors.repositoryName && (
          <Text style={styles.errorText}>{errors.repositoryName}</Text>
        )}

        <TextInput 
        placeholder='Comentario'
        onChangeText={handleChange('text')}
        multiline
        onBlur={handleBlur('text')}
        value={values.text}
        style={styles.input}
        />


        {touched.text && errors.text && (
          <Text style={styles.errorText}>{errors.text}</Text>
        )
        }

        <TextInput
        placeholder='Rating'
        onChangeText={handleChange('rating')}
        onBlur={handleBlur('rating')}
        value={values.rating}
        style={styles.input}
        />

        { touched.rating && errors.rating && (
          <Text style={styles.errorText}>{errors.rating}</Text>
        )
        }

        <TouchableOpacity 
        onPress={handleSubmit} 
        style={styles.button}
        >
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
        </View>
      }
      
    </Formik>
     </View>
  )
}

export default ReviewForm