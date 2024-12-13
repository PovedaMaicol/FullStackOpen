import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import Text from './Text';
import { Formik } from 'formik';

const SignIn = () => {
  return <View>
    <Text>Hola</Text>
    <Formik
    initialValues={{email: '', password: ''}}
    validationSchema={LoginSchema}
    onSubmit={handleLogin}>

    </Formik>
  </View>
};

export default SignIn;