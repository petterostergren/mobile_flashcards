import React, { Component } from 'react'
import {
  StyleSheet,
  Image,
} from 'react-native'
import { TabNavigator, StackNavigator } from 'react-navigation'
import Home from './Home'
import NewDeck from './NewDeck'
import DeckQuestion from './DeckQuestion'
import Quiz from './Quiz'
import NewCard from './NewCard'
import { primary, complimentary, muted } from '../utils/colors'
export const homeIcon = require('../icons/deck.png')
import { Ionicons } from '@expo/vector-icons'


const Tabs = TabNavigator(
  {
    Home: {
      screen: Home,
      navigationOptions: {
        tabBarLabel: 'Decks',
        tabBarIcon: ({ tintColor }) => (
          <Image source={homeIcon} tintColor={tintColor} />
        ),
      },
    },
    AddEntry: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
        tabBarIcon: ({ tintColor }) => (
          <Ionicons name="ios-add" size={35} color={tintColor} />
        ),
      },
    },
  },
  {
    tabBarOptions: {
      inactiveTintColor: muted,
      activeTintColor: complimentary,
      style: {
        backgroundColor: primary,
      },
    },
  }
)

const Stack = StackNavigator({
  Home: {
    screen: Tabs,
  },
  DeckQuestion: {
    screen: DeckQuestion,
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      headerTintColor: complimentary,
    },
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: complimentary,
    },
  },
})

export default class Routes extends Component {

  render() {
    return (
          <Stack />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    width: 26,
    height: 26,
  },
})
