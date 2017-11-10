import React, {Component} from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux'
import {primary, complimentary, muted} from '../utils/colors'

class DeckQuestions extends Component{

  componentDidMount(){
    console.log(this.props)
  }

  render() {
    if(this.props.id !== null) {
      return (
        <View style={styles.container}>
          <View style={styles.top}>
            <Text style={styles.title}>{this.props.title}</Text>
          </View>
        </View>
        )
    } else {
        return (
          <View style={styles.container}>
            <View style={styles.errorBox}>
              <Text style={styles.errorMessage}>
                We couldn't find any cards for this deck
              </Text>
              <Text style={styles.errorMessageSub}>
                Go ahead and an add a few cards!
              </Text>
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
    backgroundColor: primary,
  },
  errorBox: {
    justifyContent: 'center',
    alignItems: 'center',
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
  title: {
    paddingTop: 5,
    fontSize: 21,
    paddingLeft: 10,
    color: complimentary,
  },
  btnBox: {
    justifyContent: 'center',
  },
  btn: {
    marginTop: 20,
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

function mapStateToProps(state, ownProps){
  const deckId = ownProps.navigation.state.params.id
  if(deckId){
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


export default connect(mapStateToProps)(DeckQuestions);
