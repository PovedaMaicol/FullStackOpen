import { Formik } from 'formik'
import React from 'react'
import { View, Text, TextInput, Button, StyleSheet} from 'react-native'
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
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleReview}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => 
        <View>
            {loading && <Text>Loading...</Text>}
            {error && <Text>Error: {error.message}</Text>}

          <TextInput
          placeholder='Nombre dueño del repositorio'
          onChangeText={handleChange('ownerName')}
          onBlur={handleBlur('ownerName')}
          value={values.ownerName}
          />

        { touched.ownerName && errors.ownerName && (
          <Text>{errors.ownerName}</Text>
        )}

        <TextInput
        placeholder='Nombre del repositorio'
        onChangeText={handleChange('repositoryName')}
        onBlur={handleBlur('repositoryName')}
        value={values.repositoryName}
        />

        { touched.repositoryName && errors.repositoryName && (
          <Text>{errors.repositoryName}</Text>
        )}

        <TextInput 
        placeholder='Comentario'
        onChangeText={handleChange('text')}
        multiline
        onBlur={handleBlur('text')}
        value={values.text}/>


        {touched.review && errors.review && (
          <Text>{errors.review}</Text>
        )
        }

        <TextInput
        placeholder='Rating'
        onChangeText={handleChange('rating')}
        onBlur={handleBlur('rating')}/>

        { touched.rating && errors.rating && (
          <Text>{errors.rating}</Text>
        )
        }

        <Button onPress={handleSubmit} title='Submit'/>
        </View>
      }
      
    </Formik>
     </View>
  )
}

export default ReviewForm