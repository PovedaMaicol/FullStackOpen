import React from 'react';
import { View, StyleSheet, Text, Pressable, Keyboard} from 'react-native';
import Constants from 'expo-constants';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    padding: 10,
    // ...
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  }
  // ...
});

const AppBar = () => {
  return (
  <Pressable onPress={() => console.log('hola')} >
  <View style={styles.container}>
  <Text style={styles.text}>Repositorios</Text>
  </View>
  </Pressable>
  )
};

export default AppBar;