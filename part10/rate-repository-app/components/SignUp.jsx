import { Formik } from 'formik'
import React from 'react'
import { Button, TextInput, View, StyleSheet, Text } from 'react-native'
import { CREATE_USER } from '../src/graphql/mutations'
import useSignIn from '../src/hooks/useSignIn'
import { useMutation } from '@apollo/client'
// import { useNavigate } from 'react-router-native'

import * as Yup from 'yup'

const styles =  StyleSheet.create({
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

})

const initialValues = {
    password: '',
    username: '',
    confirmPassword: ''
}

const validationSchema = Yup.object().shape({
  username: Yup.string()
    .required('El nombre de usuario es requerido')
    .min(1, 'El nombre de usuario es muy corto')
    .max(30, 'El nombre de usuario es muy largo'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(5, 'La contraseña debe tener al menos 5 caracteres')
    .max(50, 'La contraseña no puede tener más de 50 caracteres'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Las contraseñas no coinciden')
    .required('Debes confirmar tu contraseña'),
})

const SignUp = () => {

  const [createUser, { data, loading, error}] = useMutation(CREATE_USER);
  const { signIn, loading: signingIn, error: signInError} = useSignIn()
  // const navigate = useNavigate()

  const handleSignUp = async (values) => {
    const { password, username } = values;

    try {
      const { data } = await createUser({
        variables: {
          user: {
            password,
            username
          }
        }
      })
      console.log('user created', data)
      const result = await signIn({ username, password })
      if (result) {
        console.log('Inicio de sesión exitoso:', result)
        // Redirigir a la lista de repositorios
        // navigate('/')
      }
    } catch (e) {
      console.error('Error creando usuario:', e)
    }
  }
  return (
    <View style={styles.container}>
        <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSignUp}>
          {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => 
          <View style={styles.form}>
            { loading && <Text>Loading...</Text> }
            { error && <Text>Error: {error.message}</Text>}
            <TextInput
            placeholder='Nombre de usuario'
            onChangeText={handleChange('username')}
            onBlur={handleBlur('username')}
            value={values.username}
            style={styles.input}
            />

            { touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}
            <TextInput
            placeholder='Contraseña'
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
            secureTextEntry
            style={styles.input}
            />

            { touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TextInput
            placeholder="Repita su contraseña"
            onChangeText={handleChange('confirmPassword')}
            onBlur={handleBlur('confirmPassword')}
            value={values.confirmPassword}
            secureTextEntry
            style={styles.input}
            />

            {touched.confirmPassword && errors.confirmPassword && (
              <Text style={styles.errorText}>{errors.confirmPassword}</Text>
            )}

          
             {error && <Text style={styles.errorText}>{error.message}</Text>}

            <Button 
            title={loading ? 'Registrando...' : 'Registrarse'}
            onPress={handleSubmit}
            disabled={loading}
            />
          </View>}
  
        </Formik>

    </View>
  )
}

export default SignUp