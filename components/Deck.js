import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {muted, primary, complimentary, light} from '../utils/colors'
import { numberOfCards } from '../utils/helpers'

export default class Deck extends Component {
  render() {
   const {id, title, questions} = this.props
   const numOfCards = numberOfCards(questions)
   return (
     <View style={styles.container}>
         <View style={styles.deck} key={id}>
           <View style={styles.deckContent}>
             <Text style={styles.title}>
               {title}
             </Text>
             <Text style={styles.numOfCards}>
               {numOfCards}
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
 },
 deck: {
  height: 57,
  borderLeftWidth: 4,
  borderLeftColor: complimentary,
  shadowOpacity: 0.75,
  shadowRadius: 1,
  shadowColor: muted,
  shadowOffset: { height: 2, width: 1},
  backgroundColor: light,
},
deckContent: {
  flexDirection: 'row',
  flex: 1,
  justifyContent: 'space-between',
  alignItems: 'center',
},
 title: {
   padding: 15,
   fontSize: 18,
   textAlign: 'center',
   color: complimentary,
 },
 numOfCards: {
   padding: 15,
   fontSize: 14,
   textAlign: 'center',
   color: muted,
 }
})
