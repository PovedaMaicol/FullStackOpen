import React from 'react';
import { useQuery, useApolloClient } from '@apollo/client';
import { Link, useNavigate } from 'react-router-native';
import { ME } from "../src/graphql/queries"
import { useContext } from 'react';
import AuthStorageContext from "../src/context/AuthStorageContext";
import { View, StyleSheet, Text, TouchableOpacity, ActivityIndicator, ScrollView } from 'react-native';
import Constants from 'expo-constants';



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
  const authStorage = useContext(AuthStorageContext);
  const apolloClient = useApolloClient()
  const navigate = useNavigate();
  const { data, loading, error } = useQuery(ME)

  if (loading) return <ActivityIndicator size="small" color="#0000ff" />;
  if (error) return <Text>Error: {error.message}</Text>;



  const handleLogout = async () => {
    await authStorage.removeAccessToken();
    await apolloClient.resetStore();
    navigate("/");
  }

  return (
    <View style={styles.container}>
      <ScrollView horizontal>
           <Link to='/'>
           <Text style={styles.text}>Repositories</Text>
           </Link>
           
       
           { data?.me ? (
            <TouchableOpacity onPress={handleLogout}>
              <Text style={styles.text}>Sign out</Text>
            </TouchableOpacity>
           ) : (
            <Link to='/login'>
            <Text style={styles.text}>login</Text>
            </Link>
           )
           }
         
      </ScrollView>
    </View>
  )
};

export default AppBar;