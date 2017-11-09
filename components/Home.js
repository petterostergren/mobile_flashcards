import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import {white, primary, complimentary, muted, light} from './../utils/colors'
import { connect } from 'react-redux'
import { pushDecks } from '../actions'
import {fetchDecks} from '../utils/api'
import { NavigationActions } from 'react-navigation'
import Deck from './Deck'

class Home extends Component{
  componentDidMount(){
    fetchDecks().then((result) => this.props.pushDecks(result))
  }

  openDeck = () => {
    this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'DeckQuestion'}))
  }

  render(){
    const { decks } = this.props
    if(Object.keys(decks).length > 0){
      return (
          <View style={styles.container}>
            {Object.keys(decks).map((deck) => {
              return (
                  <TouchableOpacity
                    onPress={this.openDeck}
                    activeOpacity={0.8}
                    key={deck}
                  >
                    {/* TODO: Should be spaced out when new is added. */}
                      <Text>{decks[deck].title}</Text>
                     {/* <Deck
                       title={decks[deck].title}
                       id={decks[deck].id}
                     /> */}
                  </TouchableOpacity>
              )
            })}
          </View>
      )
    }
    else {
      return (
        <View style={styles.container}>
          <Text style={styles.errorMessage}>
            No Decks could be found.
          </Text>
          <Text style={styles.errorMessageSub}>
            Start building a new deck!
          </Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
    padding: 15,
  },
  deckBtn: {
    padding: 5,
  },
  errorMessage: {
    paddingTop: 10,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
    color: complimentary,
  },
  errorMessageSub: {
    fontSize: 16,
    color: muted,
    textAlign: 'center',

  }
})


function mapStateToProps(state){
  console.log(state)
  return {
    decks: state
  }
}

function mapDispatchToProps(dispatch){
  return {
    pushDecks: (data) => dispatch(pushDecks(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)
