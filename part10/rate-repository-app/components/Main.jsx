import React from 'react';
// import Constants from 'expo-constants';
import { Text, StyleSheet, View } from 'react-native';

import { Route, Routes, Navigate } from 'react-router-native';

import RepositoryList  from './RepositoryList';
import AppBar from './AppBar';
import theme from '../src/theme'



console.log('Repository list:', RepositoryList)
console.log('AppBar', AppBar)
console.log('theme', theme)
const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary,
    flexGrow: 1,
    flexShrink: 1,
  },
});

const Main = () => {
  return (
    <View style={styles.container}>
      <AppBar/>
      <Routes>
        <Route path='/' element={<RepositoryList/>}/>
        <Route path='*' element={<Navigate to='/' replace />}/>
        
      </Routes>

      
  
    
    
    </View>
  );
};

export default Main;