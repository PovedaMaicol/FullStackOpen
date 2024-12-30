import React from 'react';
import { View, StyleSheet, Text} from 'react-native';
import Constants from 'expo-constants';
import { Link } from 'react-router-native';
import { ScrollView } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#24292e',
    padding: 10,
    flexDirection: 'row',
    justifyContent: 'space-around',
    // ...
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#fff',
    marginHorizontal: 10,
  }
  // ...
});

const AppBar = () => {
  return (
    <View style={styles.container}>
      <ScrollView horizontal>
           <Link to='/'>
           <Text style={styles.text}>Repositories</Text>
           </Link>
           <Link to='/login'>
           <Text style={styles.text}>login</Text>
           </Link>
      </ScrollView>
    </View>
  )
};

export default AppBar;