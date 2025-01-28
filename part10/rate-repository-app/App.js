import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { NativeRouter } from 'react-router-native';
import { ThemeProvider } from './src/themeContext';
import {ApolloProvider} from '@apollo/react-hooks';


import Main from './components/Main';
import createApolloClient from './src/utils/apolloClient';


const apolloClient = createApolloClient();

const App = () => {
  console.log('hola android');
  return (
    <NativeRouter>
      <ApolloProvider client={apolloClient}>
      <ThemeProvider>
      <Main />
      </ThemeProvider>
      </ApolloProvider>
    </NativeRouter>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});












































































































































































































































































































































































































































































