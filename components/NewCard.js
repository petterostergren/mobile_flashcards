import React, { Component } from 'react'
import {
  Text,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native'
import { connect } from 'react-redux'
import { pushCard } from '../actions/'
import { primary, warning, complimentary, muted, light } from '../utils/colors'
import * as api from '../utils/api'
import { NavigationActions } from 'react-navigation'

class NewCard extends Component {
  state = {
    question: '',
    answer: '',
    warning: '',
  }

  checkValidation() {
    const { answer, question, fieldTouched } = this.state
    if (answer.length === 50) {
      this.setState({ warning: "Answers can't be more the 50 characters" })
    } else {
      this.setState({ warning: '' })
    }
  }

  addCard() {
    const { warning, question, answer } = this.state
    const { id, navigation, pushCard, title } = this.props
    if (answer.length === 0 && question.length === 0) {
      this.setState({
        warning: 'You need to fill out the form before submitting',
      })
    } else if (answer.length === 0) {
      this.setState({ warning: 'Make sure you entered an answer' })
    } else if (question.length === 0) {
      this.setState({ warning: 'Make sure you entered a question' })
    } else if (answer.length === 50) {
      this.setState({ warning: "Answers can't be more the 50 characters" })
    } else if (warning !== '') {
      this.checkValidation()
    } else {
      let card = {
        question: question,
        answer: answer,
      }
      api
        .pushCard(id, card)
        .then(() => pushCard({ id: id, card: card }))
        .then(() =>
          this.setState({
            question: '',
            answer: '',
            warning: '',
          })
        )
        .then(() =>
          navigation.dispatch(
            NavigationActions.reset({
              index: 1,
              actions: [
                NavigationActions.navigate({ routeName: 'Home' }),
                NavigationActions.navigate({
                  routeName: 'DeckQuestion',
                  params: {
                    id: id,
                    title: title,
                  },
                }),
              ],
            })
          )
        )
    }
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Question:</Text>

        <TextInput
          autoFocus={true}
          placeholder="Question"
          returnKeyType="next"
          onChange={() => this.checkValidation()}
          onSubmitEditing={event => this.refs.answer.focus()}
          multiline={false}
          textAlignVertical="center"
          style={styles.input}
          onChangeText={question => this.setState({ question })}
          value={this.state.question}
        />

        <Text style={styles.text}>Answer:</Text>
        <TextInput
          ref="answer"
          placeholder="Answer"
          returnKeyType="done"
          multiline={true}
          maxLength={50}
          row={2}
          onChange={() => this.checkValidation()}
          textAlignVertical="center"
          style={styles.input}
          onChangeText={answer => this.setState({ answer })}
          value={this.state.answer}
        />
        <Text style={styles.warning}>{this.state.warning}</Text>
        <View style={styles.btn}>
          <TouchableOpacity onPress={() => this.addCard()} activeOpacity={0.8}>
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
    height: 50,
    padding: 5,
    marginTop: 15,
    fontSize: 20,
    borderBottomWidth: 0.5,
    borderRadius: 8,
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
    borderRadius: 8,
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
  },
})

function mapStateToProps(state, ownProps) {
  const id = ownProps.navigation.state.params.id
  if (id && state[id]) {
    return {
      id,
      title: state[id].title,
    }
  }
}

export default connect(mapStateToProps, {pushCard})(NewCard)
