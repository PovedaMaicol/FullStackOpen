import React from 'react';
import { View, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';

const handleLogin = (values) =>
{
  Alert.alert('login', `Email: ${values.email}\nPassword: ${values.password}`);
};
const SignIn = () => {
  return <View>
    <Text>Hola</Text>
    <Formik
    initialValues={{email: '', password: ''}}
    onSubmit={handleLogin}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View>
        <TextInput
        placeholder='gmail'
        keyboardType='email-address'
        autoCapitalize='none'
        value={values.email}
        />

        {touched.email && errors.email && <Text>{errors.email}</Text>}

        <TextInput
        placeholder='password'
        secureTextEntry
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
        />

        {touched.password && errors.password && (
        <Text style={styles.errorText}>{errors.password}</Text>
        )}

        {/* Botón de inicio de sesión */}
        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
        </TouchableOpacity>
   
        </View>
      )}
      

    </Formik>
  </View>
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