import { StatusBar } from 'expo-status-bar';
import React from 'react';
import Main from './components/Main';
import { StyleSheet, Text, View } from 'react-native';

export default function App() {
  console.log('hola android')
  return (
    <Main/>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
