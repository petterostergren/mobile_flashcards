import { PUSH_ALL_DECKS, PUSH_DECK, DELETE_DECK } from '../actions'

export default function cardsReducer(state = {}, action) {
  console.log('reducers____State', state)
  console.log('reducers____action', action)
  switch (action.type) {
    case PUSH_ALL_DECKS:
      return{
        ...state,
        ...action.decks,
      }

    case PUSH_DECK:
      return {
        ...state,
        [action.deck.deckId]: action.deck.newDeck
      }


    case DELETE_DECK:
      return state

    default:
      return state
    }
}
