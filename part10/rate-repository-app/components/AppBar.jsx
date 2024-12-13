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
    justifyContent: 'space-around'
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
    <View style={styles.container}>
      <ScrollView horizontal>
           <Link to='/' style={styles.text}>
           <Text>Repositories</Text>
           </Link>
           <Link to='/login' style={styles.text}>
           <Text>login</Text>
           </Link>
           <Link>
           <Text>hola</Text>
           </Link>
           <Link>
           <Text>chao</Text>
           </Link>
           
      </ScrollView>
    </View>
  )
};

export default AppBar;