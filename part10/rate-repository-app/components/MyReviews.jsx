import React from 'react'
import { FlatList, View, StyleSheet, Text, ActivityIndicator } from 'react-native'
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

    const renderItem = ({item}) => (
        <View>
            <Text>{item.repository.fullName}</Text>
            <Text>Rating: {item.rating}</Text>
            <Text>{item.text}</Text>
            <Text style={{ color: 'gray' }}>{new Date(item.createdAt).toLocaleDateString()}</Text>
        </View>
    )
  return (
    <View>
        <FlatList
        data={reviews}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={ItemSeparator}
        ListFooterComponent={loading ? <ActivityIndicator size="large" /> : null}
        />
        </View>
  )
}

export default MyReviews