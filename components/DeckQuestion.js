import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Platform,
  AlertIOS,
  Alert,
  Animated,
} from 'react-native'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { deleteDeck } from '../actions'
import { removeDeck } from '../utils/api'
import { primary, complimentary, muted, light } from '../utils/colors'
import { NavigationActions } from 'react-navigation'
import { numberOfCards } from '../utils/helpers'

function trashIcon({ params }) {
  if (Platform.OS === 'ios') {
    return (
      <Ionicons
        style={styles.iconTrash}
        name="ios-trash-outline"
        size={30}
        color={muted}
        onPress={data => params.deleteDeck()}
      />
    )
  } else {
    return (
      <Ionicons
        style={styles.iconTrash}
        name="md-trash-outline"
        size={30}
        color={muted}
        onPress={data => params.deleteDeck()}
      />
    )
  }
}

class DeckQuestion extends Component {
  static navigationOptions = ({ navigation }) => {
    const { params } = navigation.state
    const { title } = params
    return {
      headerRight: trashIcon({ params }),
      title: title,
      headerStyle: {
        backgroundColor: primary,
      },
    }
  }

  state = {
    opacity: new Animated.Value(0),
  }

  componentDidMount() {
    // deleteFunction is sent in as a navigation param
    // inorder to use it from our navigationBar
    const { setParams } = this.props.navigation
    const { opacity } = this.state
    setParams({ deleteDeck: this.deleteDeck })

    Animated.timing(opacity, { toValue: 1, duration: 800 }).start()
  }

  componentWillUnmount() {
    this.state.opacity.removeAllListeners()
  }

  startQuiz(id, title) {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'Quiz',
        params: {
          id: id,
        },
      })
    )
  }

  newCard(id) {
    this.props.navigation.dispatch(
      NavigationActions.navigate({
        routeName: 'NewCard',
        params: {
          id: id,
        },
      })
    )
  }

  deleteDeck = () => {
    if (Platform.OS === 'ios') {
      AlertIOS.alert(
        'Remove Deck',
        'Are you sure you want to delete this deck?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'Yes', onPress: this.executeRemoval },
        ]
      )
    } else {
      Alert.alert(
        'Remove Deck',
        'Are you sure you want to delete this deck?',
        [
          {
            text: 'Cancel',
            onPress: () => console.log('Cancel Pressed'),
            style: 'cancel',
          },
          { text: 'Yes', onPress: this.executeRemoval },
        ],
        { cancelable: false }
      )
    }
  }

  executeRemoval = () => {
    const { id } = this.props
    removeDeck(id)
      .then(() => this.props.deleteDeck(id))
      .then(() =>
        this.props.navigation.dispatch(
          NavigationActions.reset({
            index: 0,
            actions: [NavigationActions.navigate({ routeName: 'Home' })],
          })
        )
      )
  }

  render() {
    const { title, id, questions } = this.props
    const { opacity } = this.state
    const numOfCards = numberOfCards(questions)
    if (this.props.id !== null && this.props.questions.length !== 0) {
      return (
        <View style={styles.container}>
          <Animated.View style={[styles.mainContent, { opacity }]}>
            <View style={styles.deck}>
              <Text style={styles.title}>{title}</Text>
              <Text style={styles.numOfCards}>{numOfCards}</Text>
            </View>
          </Animated.View>
          <Animated.View style={[styles.btnBox, { opacity }]}>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => this.startQuiz(id)}
                activeOpacity={0.8}
              >
                <View>
                  <Text style={styles.btnText}>Start</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => this.newCard(id)}
                activeOpacity={0.8}
              >
                <View>
                  <Text style={styles.btnText}>Add Cards</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Animated.View style={[styles.errorBox, { opacity }]}>
            <View style={styles.deck}>
              <Text style={styles.errorMessage}>
                We couldn't find any cards for this deck
              </Text>
              <Text style={styles.errorMessageSub}>
                Go ahead and an add a few cards!
              </Text>
            </View>
          </Animated.View>
          <Animated.View style={[styles.btnBox, { opacity }]}>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => this.newCard(id)}
                activeOpacity={0.8}
              >
                <View>
                  <Text style={styles.btnText}>Add Cards</Text>
                </View>
              </TouchableOpacity>
            </View>
          </Animated.View>
        </View>
      )
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
  mainContent: {
    height: '40%',
  },
  errorBox: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '35%',
  },
  errorMessage: {
    paddingTop: 10,
    paddingRight: 8,
    paddingLeft: 8,
    fontSize: 21,
    textAlign: 'center',
    marginTop: 10,
    color: complimentary,
  },
  errorMessageSub: {
    fontSize: 16,
    color: muted,
    textAlign: 'center',
  },
  iconTrash: {
    marginRight: 10,
  },
  title: {
    paddingTop: 5,
    fontSize: 36,
    paddingLeft: 10,
    color: complimentary,
  },
  numOfCards: {
    fontSize: 18,
    textAlign: 'center',
    color: muted,
  },
  deck: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '95%',
    borderLeftWidth: 4,
    borderLeftColor: complimentary,
    marginBottom: 4,
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: muted,
    shadowOffset: { height: 2, width: 1 },
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
  const deckId = ownProps.navigation.state.params.id
  if (deckId && state[deckId]) {
    return {
      id: deckId,
      title: state[deckId].title,
      questions: state[deckId].questions,
    }
  } else {
    // Gives default values if the statement above !== true
    return {
      id: null,
      title: 'Loading..',
      questions: [],
    }
  }
}

export default connect(mapStateToProps, { deleteDeck })(DeckQuestion)
