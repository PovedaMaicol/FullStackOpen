import React from 'react';
import { View, TextInput, Alert, TouchableOpacity, StyleSheet } from 'react-native';
import Text from './Text';
import { Formik, useField } from 'formik';
import * as Yup from 'yup';
// FORMIK es una libreria para manejo de formularios
// sus componentes principales son el contexto y un campo
// el cotexto contiene el estado del formulario(valores, errores de validación)

//USEFIELD 
//Se puede hacer referencia a los campos del estado por su nombre utilizando el hook useField o el componente Field.


// Valores iniciales del formulario
const initialValues = {
  email: '',
  password: ''
}


// Manejo del inicio de sesión
const handleLogin = (values) =>
{
  console.log('Login Data:', values);
  Alert.alert('login', `Email: ${values.email}\nPassword: ${values.password}`);
};


// Esquema de validación con Yup

const validationSchema = Yup.object().shape({
  email: Yup.string()
  .email('Correo electrónico inválido')
  .required('El correo electrónico es requerido'),
  password: Yup.string()
  .min(6, 'La contraseña debe tener al menos 6 caracteres')
  .required('La contraseña es requerida'),
});


const SignIn = () => {
  return <View style={styles.container}>
    <Text style={styles.title}>Iniciar Sesión</Text>
    <Formik
    initialValues={initialValues}
    onSubmit={handleLogin}
    validationSchema={validationSchema}>
      {({ handleChange, handleBlur, handleSubmit, values, errors, touched }) => (
        <View style={styles.form}>
        <TextInput
        placeholder='Correo electrónico'
        onChangeText={handleChange('email')}
        onBlur={handleBlur('email')}
        keyboardType='email-address'
        autoCapitalize='none'
        value={values.email}
        style={styles.input}
        />

        {touched.email && errors.email && (
        <Text style={styles.errorText}>{errors.email}</Text>
        )}

        <TextInput
        placeholder='password'
        secureTextEntry
        onChangeText={handleChange('password')}
        onBlur={handleBlur('password')}
        value={values.password}
        style={styles.input}
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