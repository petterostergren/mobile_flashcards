
import React, {Component} from 'react'
import {Text, StyleSheet, View, TextInput, TouchableOpacity} from 'react-native'
import {connect} from 'react-redux'
import {pushCard} from '../actions/'
import {primary, warning, complimentary, muted, light} from '../utils/colors'
import * as api from '../utils/api'
import { NavigationActions } from 'react-navigation'

class NewCard extends Component{
  state = {
    question: '',
    answer: '',
    warning: ' ',
  }


  addCard(){

    const {question, answer} = this.state
    const {id} = this.props
    if(question.length < 5) {
      this.setState({warning: 'Question is too short.'})
    } else if(answer.length < 1) {
      this.setState({warning: 'Answer is too short.'})
    } else {
      let card = {
        question: question,
        answer: answer
      }
      api.pushCard(this.props.id, card)
        .then(() => this.props.pushCard({id: this.props.id, card: card}))
        .then(() => this.setState({
          question: '',
          answer: '',
          warning: ' '
        }))
        .then(() => this.props.navigation.dispatch(NavigationActions.navigate({
          routeName: 'DeckQuestions',
          params: {
            id: this.props.id
          }
        })))

    }
  }

  render(){
    return(
      <View style={styles.container}>
        <Text style={styles.text}>Question:</Text>

        <TextInput
          autoFocus={true}
          placeholder='Question'
          returnKeyType='next'
          onSubmitEditing={(event) => this.refs.answer.focus()}
          maxLength={75}
          numberOfLines={3}
          multiline={true}
          textAlignVertical='top'
          style={styles.input}
          onChangeText={(question) => this.setState({question})}
          value={this.state.question}
        />

        <Text style={styles.text}>Answer:</Text>
        <TextInput
          ref='answer'
          placeholder='Answer'
          returnKeyType='done'
          onSubmitEditing={(() => console.log("submit button pressed"))}
          textAlignVertical='top'
          style={styles.input}
          onChangeText={(answer) => this.setState({answer})}
          value={this.state.answer}
        />
        <Text style={styles.warning}>{this.state.warning}</Text>
        <View style={styles.btn}>
          <TouchableOpacity
            onPress={() => this.addCard()}
            activeOpacity={0.8}
          >
            <View>
              <Text style={styles.btnText}>Add</Text>
            </View>
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
    padding: 15,
  },
  input: {
    height: 40,
    padding: 5,
    marginTop: 15,
    fontSize: 20,
    borderBottomWidth: .5,
    borderRadius:8,
    borderColor: muted,
    color: complimentary,
  },
  text: {
    paddingTop: 5,
    fontSize: 24,
  },
  warning: {
    color: warning,
    fontSize: 18,
    textAlign: 'center',
  },
  btn: {
    marginTop: 20,
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

function mapStateToProps(state, ownProps){
  const id = ownProps.navigation.state.params.id
  return {
    id
  }
}

function mapDispatchToProps(dispatch){
  return {
    pushCard: (data) => dispatch(pushCard(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard);
