import { Formik } from 'formik'
import React from 'react'
import { View, Text, TextInput, Button, StyleSheet} from 'react-native'
import * as Yup from 'yup'

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
  repositoryOwner: '',
  repositoryName: '',
  ratingRepository: 0,
  review: ''
}

const validationSchema = Yup.object().shape({
  repositoryName: Yup.string().required('El nombre del repositorio es requerido'),
  repositoryOwner: Yup.string().required('El dueño del repositorio es requerido'),
  ratingRepository: Yup.number().required('Añada una calificacion entre 0 y 100'),
  review: Yup.string().required('El comentario es requerido')

})

const ReviewForm = () => {

  const handleReview = async (values) => {
    const { repositoryName, repositoryOwner, ratingRepository, review } = values;

  }
  return (
    <View style={styles.container}> 
    <Formik
    initialValues={initialValues}
    validationSchema={validationSchema}
    onSubmit={handleReview}
    >
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => 
        <View>
          <TextInput
          placeholder='Nombre dueño del repositorio'
          onChangeText={handleChange('repositoryowner')}
          onBlur={handleBlur('repositoryowner')}
          value={values.repositoryOwner}
          />

        { touched.repositoryOwner && errors.repositoryOwner && (
          <Text>{errors.repositoryOwner}</Text>
        )}

        <TextInput
        placeholder='Nombre del repositorio'
        onChangeText={handleChange('repositoryname')}
        onBlur={handleBlur('repositoryname')}
        value={values.repositoryName}
        />

        { touched.repositoryName && errors.repositoryName && (
          <Text>{errors.repositoryName}</Text>
        )}

        <TextInput 
        placeholder='Comentario'
        onChangeText={handleChange('review')}
        onBlur={handleBlur('review')}/>

        {touched.review && errors.review && (
          <Text>{errors.review}</Text>
        )
        }

        <TextInput
        placeholder='Rating'
        onChangeText={handleChange('reting')}
        onBlur={handleBlur('rating')}/>

        { touched.ratingRepository && errors.ratingRepository && (
          <Text>{errors.ratingRepository}</Text>
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