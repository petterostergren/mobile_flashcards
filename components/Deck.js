import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import {white, muted, black, primary, complimentary, light} from '../utils/colors'

export default class Deck extends Component {
  render() {
   const {id, title} = this.props
   return (
     <View style={styles.container}>
         <View style={styles.deck} key={id}>
           <View>
             <Text style={styles.title}>
               {title}
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
 title: {
   padding: 15,
   fontSize: 18,
   justifyContent: 'center',
   color: complimentary,
 }
})
