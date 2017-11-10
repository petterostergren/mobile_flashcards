import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import { connect } from 'react-redux'
import {uuidv4} from '../utils/helpers'
import {pushDeck} from '../actions'
import * as api from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { primary, complimentary, warning, muted } from '../utils/colors'

class NewDeck extends Component {
  static navigationOptions = {
    header: null
  }

  state = {
    title: '',
    warning: '',
  }


  submitNewDeck(){
    const { title, warning, deckId } = this.state
    const { navigation } = this.props
    if(title.length < 3){
      this.setState({warning: 'Please add a more descriptive title'})
    }
    else if(title.length > 30) {
      this.setState({warning: 'Its a title not a novell, try narrow it down'})
    }
    else {
      const deckId = uuidv4()
      let newDeck = {
        title: this.state.title,
        questions: []
      }

      api.pushDeck({id: deckId, deck: newDeck})
        // I think the issue is comming from here.
        .then(() => this.props.pushDeck({deckId, newDeck}))
        .then(() => this.setState({ title: '', warning: '' }))
        .then(() => this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Home'})))

    }
  }

  render(){
    const { warning, title } = this.state
    return(
      <View style={styles.container}>
        <View style={styles.content}>
          <Text style={styles.header}>Name your deck</Text>
          <TextInput
            placeholder='Title'
            maxLength={30}
            style={styles.input}
            onChangeText={(title) => this.setState({title})}
            value={title}
          />
          <Text style={styles.warning}>{warning}</Text>
          <TouchableOpacity
            onPress={() => this.submitNewDeck()}
            style={styles.btn}
            activeOpacity={0.8}>
              <Text style={styles.btnText}>Create</Text>
          </TouchableOpacity>
        </View>
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
  input: {
    height: 40,
    padding: 5,
    margin: 5,
    marginTop: 15,
    fontSize: 20,
    borderBottomWidth: .5,
    borderRadius:8,
    borderColor: muted,
    color: complimentary,
  },
  header: {
    paddingTop: 10,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
    color: complimentary,
  },
  warning: {
    color: warning,
    fontSize: 18,
    textAlign: 'center',
  },
  btn: {
    margin: 5,
    borderRadius:8,
    borderWidth: 2,
    borderColor: complimentary,
    backgroundColor: complimentary,
  },
  btnText: {
    color: primary,
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 5,
    paddingBottom: 5,
  }
})


function mapDispatchToProps(dispatch){
 return {
   pushDeck: (data) => dispatch(pushDeck(data)),
 }
}

export default connect(null, mapDispatchToProps)(NewDeck)
