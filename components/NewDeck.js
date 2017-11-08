import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity
} from 'react-native';
import cuid from 'cuid'
import { connect } from 'react-redux'
import { pushDeck } from '../utils/api'
import { NavigationActions } from 'react-navigation'
import { primary, complimentary, warning } from '../utils/colors'

class NewDeck extends Component {
  state = {
    title: '',
    warning: '',
  }

  submitNewDeck(){
    const { title, warning } = this.state
    const { navigation } = this.props
    if(title.length < 3)
      this.setState({warning: 'Please add a more descriptive title'})
    else if(title.length > 30)
      this.setState({warning: 'Its a title not a novell, try narrow it down'})
    else {
      this.setState({warning: ''})
      let deckId = cuid()
      let newDeck = {
        title: title,
        questions: []
      }

      //CALL redux
      pushDeck({id: deckId, deck: newDeck});
      this.props.pushDeck({title: deck});
      this.setState = ({ title: '', warning: '' })
      this.props.navigation.dispatch(NavigationActions.navigate({routeName: 'Home'}))

    }
  }

  render(){
    const { warning, title } = this.state
    return(
      <View style={styles.container}>
        <Text style={styles.header}>Name your deck</Text>
        <TextInput
          autoFocus={true}
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
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: primary,
    padding: 15,
  },
  input: {
    height: 40,
    padding: 5,
    marginTop: 5,
    fontSize: 20,
  },
  header: {
    paddingTop: 10,
    fontSize: 24,
    textAlign: 'center',
    marginTop: 10,
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

export default NewDeck