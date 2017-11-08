import {AsyncStorage} from 'react-native'

const STORAGE_KEY = 'UdacityFlashcards:eyxJsz2'

export function fetchDecks() {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      return JSON.parse(results)
    })
}

export function fetchCards(deckId) {

}

export function pushDeck({id, deck}) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [id]: deck
  }))
}

export function removeDeck(deckId) {

}

export function pushCard(card, deckId) {

}

export function removeCard(cardId) {

}
