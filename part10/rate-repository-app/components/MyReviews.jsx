import React from 'react'
import { FlatList, View, StyleSheet, Text, ActivityIndicator, SafeAreaView } from 'react-native'
import ReviewItem from './ReviewItem'
import useReviews from '../src/hooks/useReviews'


const styles = StyleSheet.create({
    separator: {
        height: 10
    }
})

const ItemSeparator = () => <View style={styles.separator}/>

const MyReviews = () => {

    const { reviews, loading, fetchMore } = useReviews();

    console.log('los reviews son', reviews)

    // const renderItem = ({item}) => (
    //     <View>
    //         <Text>{item.repository.fullName}</Text>
    //         <Text>Rating: {item.rating}</Text>
    //         <Text>{item.text}</Text>
    //         <Text style={{ color: 'gray' }}>{new Date(item.createdAt).toLocaleDateString()}</Text>
    //     </View>
    // )
  return (
       <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
        <FlatList
        data={reviews}
        renderItem={({item}) => (<ReviewItem review={item}/>)}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        />
        </SafeAreaView>
  )
}

export default MyReviews