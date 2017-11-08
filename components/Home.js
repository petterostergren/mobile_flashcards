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
    console.log(this.props)
    let decks = this.props.decks
    if(Object.keys(decks).length > 0){
      return (
          <View style={styles.container}>
            {Object.keys(decks).map((deck) => {
              return (
                <TouchableOpacity
                  onPress={this.openDeck}
                  activeOpacity={0.8}
                  key={deck.id}
                >
                  <Deck {...this.props} />
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
  header: {
    paddingTop: 5,
    fontSize: 21,
    paddingLeft: 10,
    color: complimentary,
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
