import React, { Component } from 'react';
import { Text, View, StyleSheet, Platform, StatusBar } from 'react-native';
import { TabNavigator, StackNavigator } from 'react-navigation'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import { Constants } from 'expo'
import reducer from './reducers'
import Home from './components/Home'
import Deck from './components/Deck'
import NewDeck from './components/NewDeck'
import DeckQuestion from './components/DeckQuestion'
import Quiz from './components/Quiz'
import NewCard from './components/NewCard'
import { primary, complimentary } from './utils/colors'
import {setLocalNotification} from './utils/helpers'

function FlashCardsStatusBar ({backgroundColor, ...props}) {
 return (
   <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
     <StatusBar translucent backgroundColor={backgroundColor} {...props} />
   </View>
 )
}

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
    }
  },
  NewCard: {
    screen: NewCard,
    navigationOptions: {
      headerTintColor: complimentary,
    }
  }
})

export default class App extends Component {
  componentDidMount(){
    setLocalNotification()
  }

   render() {
     return (
       <Provider store={createStore(reducer)}>
         <View style={{flex: 1}}>
           <FlashCardsStatusBar backgroundColor={complimentary} barStyle="light-content" />
           <Stack/>
         </View>
       </Provider>
     );
   }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
