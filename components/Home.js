import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, FlatList } from 'react-native';
import {white, primary, complimentary, muted, light} from './../utils/colors'
import { connect } from 'react-redux'
import { pushDecks } from '../actions'
import {fetchDecks} from '../utils/api'
import { NavigationActions } from 'react-navigation'
import Deck from './Deck'


class Home extends Component {
  static navigationOptions = {
    header: null
  }

  componentDidMount(){
    fetchDecks().then((result) => this.props.pushDecks(result))
  }

  openDeck(deckId, deckTitle) {
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'DeckQuestion',
      params: {
        id: deckId,
        title: deckTitle,
       }
    }))
  }

  render(){
    //   console.log(decks)
    //   if(Object.keys(decks).length > 0) {
    //     return (
    //         <View style={styles.container}>
    //           <View style={styles.content}>
    //             <Text style={styles.header}>Select a Deck</Text>
    //             {Object.keys(decks).map((deck) => {
    //               const deckId = (deck)
    //               const deckTitle = (decks[deck].title)
    //               return (
    //                   <TouchableOpacity
    //                     onPress={() => this.openDeck(deckId, deckTitle)}
    //                     activeOpacity={0.8}
    //                     key={deck}
    //                     style={styles.deckBtn}
    //                   >
    //                      <Deck
    //                        title={decks[deck].title}
    //                        id={decks[deck].id}
    //                        questions={decks[deck].questions}
    //                      />
    //                   </TouchableOpacity>
    //               )
    //             })}
    //           </View>
    //         </View>
    //     )
    //   }
    //   else {
    //     return (
    //       <View style={styles.container}>
    //         <Text style={styles.errorMessage}>
    //           No Decks could be found.
    //         </Text>
    //         <Text style={styles.errorMessageSub}>
    //           Start building a new deck!
    //         </Text>
    //       </View>
    //     )
    //   }
    // }
    
    const { decks } = this.props
    alert(JSON.stringify(Object.values(decks).map(deck => deck)))
    return(
      <View>
        <FlatList
              data={Object.values(decks).map(deck => deck)}
              keyExtractor={(item) => item.title}
              renderItem={(item) => <Text>{item.title}</Text>}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
  },
  content: {
    margin: 8,
  },
  header: {
    paddingTop: 10,
    paddingBottom: 10,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
    color: complimentary,
  },
  deckView: {
    flex: 1,
    marginTop: 17,
  },
  deckBtn: {
    marginTop: 5,
    padding: 5,
    marginBottom: 55,
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
  console.log('map home', state)
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
