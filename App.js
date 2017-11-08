import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import Home from './components/Home'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'
import { primary, complimentary } from './utils/colors'

const Tabs = TabNavigator({
 Home: {
   screen: Home,
   navigationOptions: {
     tabBarLabel: 'Decks',
   },
 },
 AddEntry: {
   screen: NewDeck,
   navigationOptions: {
     tabBarLabel: 'New Deck',
   },
 },
}, {
  tabBarOptions: {
    activeTintColor: complimentary,
    style: {
      backgroundColor: primary,

    }
  },
})

export default class App extends Component {
 render() {
   return (
     <Tabs />
   );
 }
}
