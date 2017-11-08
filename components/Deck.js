import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {white, muted, black, primary, complimentary, light} from '../utils/colors'

export default class Deck extends Component {
  render() {
   const {id, title} = this.props.deck
   return (
     <View style={styles.container}>
         <View style={styles.deck} key={deck.id}>
           <View>
             <Text style={styles.title}>
               {deck.title}
             </Text>
           </View>
         </View>
     </View>
   )
 }
}

const styles = StyleSheet.create({
 container: {
   flex: 1,
   marginTop: 17,
 },
 deck: {
  marginTop: 12,
  padding: 2.25,
  height: 57,
  borderTopWidth: 4,
  borderTopColor: complimentary,
  shadowOpacity: 0.75,
  shadowRadius: 1,
  shadowColor: muted,
  shadowOffset: { height: 2, width: 1},
  backgroundColor: light,
},
 title: {
   paddingTop: 5,
   fontSize: 21,
   paddingLeft: 10,
   color: complimentary,
 }
})