import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform } from 'react-native'
import { connect } from 'react-redux'
import {primary, complimentary, muted, warning, light} from '../utils/colors'
import GestureRecognizer from 'react-native-swipe-gestures'
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'

class Quiz extends Component{
  static navigationOptions = ({navigation}) => {
    const {state} = navigation;
    return {
      title: state.routeName,
      headerStyle:{
        backgroundColor: primary,
      },
    }
  }

  state = {
      showQuestion: true,
      question: 0,
      correct: 0,
      incorrect: 0,
      finish: false,
    };



  onSwipe() {
    const showQuestion = this.state.showQuestion ? false : true
    this.setState({showQuestion})
  }

  onCorrect() {
    if(this.state.question >= this.props.questions.length -1){
      this.setState({
        finish: true,
      })
    }
    this.setState({
      question: this.state.question + 1,
      correct: this.state.correct + 1,
    })
  }

  onIncorrect() {
    if(this.state.question >= this.props.questions.length -1){
      this.setState({
        finish: true,
      })
    }
    this.setState({
      question: this.state.question + 1,
      incorrect: this.state.correct + 1,
    })
  }

  onRestart() {
    this.setState({
      showQuestion: true,
      question: 0,
      correct: 0,
      incorrect: 0,
      finish: false,
    })
  }

  exitDeck() {
    this.onRestart()
    this.props.navigation.dispatch(NavigationActions.reset({
        index: 0,
        actions: [
          NavigationActions.navigate({ routeName: 'Home'})
        ]
    }))
  }


  render() {
    const {question, correct, showQuestion, finish} = this.state
    const {questions} = this.props

    // if finish is true show calc score
    if(finish){
      return(
        <View style={styles.container}>
          <Text style={styles.header}>Congratulation!</Text>
          <Text style={styles.subHeader}>You finished it with</Text>
          <Text style={styles.score}>{correct / question * 100}%</Text>
          <Text style={styles.subHeader}>of the questions correct</Text>

          <TouchableOpacity
            onPress={() => this.onRestart()}
            style={styles.btn}
            activeOpacity={0.8}>
              <Text style={styles.btnText}>Play this deck again</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => this.exitDeck()}
            style={styles.btn}
            activeOpacity={0.8}>
              <Text style={styles.btnText}>Try something else</Text>
          </TouchableOpacity>
        </View>
      )
    }
    else{
      return (
        <View style={styles.container}>
          <GestureRecognizer
            onSwipe={() => this.onSwipe()}
            style={styles.gestureBox}
          >

            <View style={styles.card}>
              <Text style={styles.numOfQuestions}>{question + 1}/{questions.length}</Text>
              {/* TODO: Insert card here */}
            </View>
            </GestureRecognizer>

            { /* Checks if
                question is beeing displayed
                inorder to choose gestureInstructions
              */
              showQuestion ? (
                <Text style={styles.guestureInstructions}>
                  <Ionicons  name='ios-arrow-round-back' size={18}> Swipe to reveal the correct answer
                  </Ionicons>
                </Text>
              ) : (
                <Text style={styles.guestureInstructions}>
                  <Ionicons name='ios-checkmark' size={18}> Did you get it right?</Ionicons>
                </Text>
              )
            }
          <View style={styles.btnBox}>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => this.onCorrect()}
                activeOpacity={0.8}
              >
                <View>
                  <Text style={styles.btnText}>Correct</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={[styles.btn, {backgroundColor: warning, borderColor: warning,}]}>
              <TouchableOpacity
                onPress={() => this.onIncorrect()}
                activeOpacity={0.8}
              >
                <View>
                  <Text style={styles.btnText}>Incorrect</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingBottom: 0,
    backgroundColor: primary,
  },
  quizFinished: {
    color: complimentary,
    textAlign: 'center'
  },
  header: {
    fontSize: 36,
    textAlign: 'center',
    color: complimentary,
    marginBottom: 20,
  },
  subHeader: {
    fontSize: 24,
    textAlign: 'center',
    color: complimentary,
  },
  score: {
    fontSize: 64,
    textAlign: 'center',
    color: complimentary,
  },
  numOfQuestions: {
    textAlign: 'right',
    color: muted,
    padding: 5,
  },
  card: {
    height: '100%',
    borderLeftWidth: 4,
    borderLeftColor: complimentary,
    marginBottom: 4,
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: muted,
    shadowOffset: { height: 2, width: 1},
    backgroundColor: light,
  },
  btnBox: {
    justifyContent: 'flex-end',
    width: '100%',
    height: '50%',
    marginBottom: 0,
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
  },
  gestureBox: {
    height: '35%',
  },
  guestureInstructions: {
    textAlign: 'center',
    color: muted,
    paddingTop: 10,
  },
})

function mapStateToProps(state, ownProps){
  const deckId = ownProps.navigation.state.params.id
  if(deckId && state[deckId]){
    return{
      id: deckId,
      title: state[deckId].title,
      questions: state[deckId].questions,
    }
  }
}


export default connect(mapStateToProps, null)(Quiz)
