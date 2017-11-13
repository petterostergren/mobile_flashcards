export const PUSH_ALL_DECKS = 'PUSH_ALL_DECKS'
export const PUSH_DECK = 'PUSH_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const PUSH_CARD = 'PUSH_CARD'

export function pushDecks(decks) {
  return{
    type: PUSH_ALL_DECKS,
    decks,
  }
}

export function pushDeck(deck) {
  return{
    type: PUSH_DECK,
    deck,
  }
}

export function deleteDeck(id) {
  return {
    type: DELETE_DECK,
    id,
  }
}

export function pushCard(payload) {
  return {
    type: PUSH_CARD,
    payload
  }
}
