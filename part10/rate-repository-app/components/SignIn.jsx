import React from 'react';
import { View, TextInput, Alert, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';
import * as Yup from 'yup';
import useSignIn from '../src/hooks/useSignIn';

// Valores iniciales del formulario
const initialValues = {
  username: '',
  password: '',
};

// Esquema de validación con Yup
const validationSchema = Yup.object().shape({
  username: Yup.string().required('El nombre de usuario es requerido'),
  password: Yup.string()
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .required('La contraseña es requerida'),
});

const SignIn = () => {
  const [signIn, { loading, error }] = useSignIn();

  const handleLogin = async (values) => {
    const { username, password } = values;

    try {
      const result = await signIn({ username, password });
      console.log('al hacer login traigo', result)
      console.log('El usuario logueado es:', result.username); // 
  
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', error.message); 
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>
      <Formik
        initialValues={initialValues}
        onSubmit={handleLogin}
        validationSchema={validationSchema}
      >
        {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
          <View style={styles.form}>
            <TextInput
              placeholder="Nombre de usuario"
              onChangeText={handleChange('username')}
              onBlur={handleBlur('username')}
              value={values.username}
              style={styles.input}
            />

            {touched.username && errors.username && (
              <Text style={styles.errorText}>{errors.username}</Text>
            )}

            <TextInput
              placeholder="Contraseña"
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
              style={styles.input}
            />

            {touched.password && errors.password && (
              <Text style={styles.errorText}>{errors.password}</Text>
            )}

            <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              )}
            </TouchableOpacity>

            {error && (
              <Text style={styles.errorText}>Error al iniciar sesión. Inténtalo de nuevo.</Text>
            )}
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  form: {
    width: '100%',
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
  errorText: {
    fontSize: 12,
    color: 'red',
    marginBottom: 10,
  },
});

export default SignIn;