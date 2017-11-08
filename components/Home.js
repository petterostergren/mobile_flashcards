import React from 'react'
 import { StyleSheet, Text, View } from 'react-native';
 import Deck from './../components/Deck'
 import {white, primary} from './../utils/colors'


export default class Home extends React.Component{
 render(){
  return(
     <View style={styles.container}>
      <Deck title='New Deck' subject='Something Hard'/>
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
