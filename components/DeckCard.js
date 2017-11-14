import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {primary, complimentary} from '../utils/colors'

const DeckCard = ({question, showQuestion}) => {
    return (
      <View style={styles.container}>
        {question && (
          <View>
          {!showQuestion && (
              <Text style={styles.text}>{question.answer}</Text>
          )}
          {showQuestion && (
              <Text style={styles.text}>{question.question}</Text>
          )}
          </View>
        )}
      </View>
    )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    paddingTop: 5,
    fontSize: 36,
    paddingLeft: 10,
    color: complimentary
  },
})

export default DeckCard
