import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import { primary } from '../utils/colors'


export default class NewDeck extends React.Component{
   render(){
    return(
      <View style={styles.container}>
        <Text>New Deck</Text>
      </View>
    )
   }
}
const styles = StyleSheet.create({
  container: {
  flex: 1,
  backgroundColor: primary,
  padding: 15,
  },
})
