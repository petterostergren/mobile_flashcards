import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Platform, AlertIOS, Alert } from 'react-native';
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import { deleteDeck } from '../actions'
import { removeDeck } from '../utils/api'
import {primary, complimentary, muted, light} from '../utils/colors'
import { NavigationActions } from 'react-navigation'

function trashIcon ({params}) {
  if (Platform.OS === 'ios') {
    return (
      <Ionicons
        style={styles.iconTrash}
        name='ios-trash-outline'
        size={30}
        color={muted}
        onPress={(data) => params.deleteDeck()}
      />
    )
  } else {
      return (
        <Ionicons
          style={styles.iconTrash}
          name='md-trash-outline'
          size={30}
          color={muted}
          onPress={(data) => params.deleteDeck()}
        />
      )
  }
}

class DeckQuestion extends Component{
  static navigationOptions = ({navigation}) => {
    const {params} = navigation.state
    const { title } = params
    return {
      headerRight: (
        trashIcon({params})
      ),
      title: title,
      headerStyle:{
        backgroundColor: primary,
      },
    }
  }

  componentDidMount(){
    // deleteFunction is sent in as a navigation param
    // inorder to use it from our navigationBar
    const {setParams} = this.props.navigation
    setParams({deleteDeck: this.deleteDeck})
  }

  startQuiz(id, title){
    this.props.navigation.dispatch(NavigationActions.navigate({
      routeName: 'Quiz',
      params: {
        id: id,
      }
    }))
  }

  deleteDeck = () => {
    const {id} = this.props
    let executeRemoval = false
    if (Platform.OS === 'ios') {
      AlertIOS.alert(
        'Remove Deck',
        'Are you sure you want to delete this deck?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () =>  executeRemoval = true},
        ],
      )
    } else {
      Alert.alert(
        'Remove Deck',
        'Are you sure you want to delete this deck?',
        [
          {text: 'Cancel', onPress: () => console.log('Cancel Pressed'), style: 'cancel'},
          {text: 'Yes', onPress: () => console.log('Yes Pressed')},
        ],
        { cancelable: false }
      )
    }


    {executeRemoval &&
      removeDeck(id)
      .then(() =>  this.props.deleteDeck(id))
      .then(() =>  this.props.navigation.dispatch(NavigationActions.reset({
          index: 0,
          actions: [
            NavigationActions.navigate({ routeName: 'Home'})
          ]
        })))
      }

    }

  render() {
    if(this.props.id !== null && this.props.questions.length !== 0) {
      return (
        <View style={styles.container}>
          <View style={styles.mainContent}>
            <View style={styles.deck}>
              <Text style={styles.title}>{this.props.title}</Text>
            </View>
          </View>
          <View style={styles.btnBox}>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => this.startQuiz(this.props.id)}
                activeOpacity={0.8}
              >
                <View>
                  <Text style={styles.btnText}>Start the Quiz</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.btn}>
              <TouchableOpacity
                onPress={() => console.log('button')}
                activeOpacity={0.8}
              >
                <View>
                  <Text style={styles.btnText}>Add Cards</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </View>
        )
    } else {
        return (
          <View style={styles.container}>
            <View style={styles.errorBox}>
              <View style={styles.deck}>
                <Text style={styles.errorMessage}>
                  We couldn't find any cards for this deck
                </Text>
                <Text style={styles.errorMessageSub}>
                  Go ahead and an add a few cards!
                </Text>
              </View>
            </View>
            <View style={styles.btnBox}>
              <View style={styles.btn}>
                <TouchableOpacity
                  onPress={() => console.log('button')}
                  activeOpacity={0.8}
                >
                  <View>
                    <Text style={styles.btnText}>Add Cards</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
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
  }
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
  else{
    return {
      id: null,
    }
  }
}


function mapDispatchToProps(dispatch){
  return {
    deleteDeck: (data) => dispatch(deleteDeck(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckQuestion);
