import { PUSH_ALL_DECKS, PUSH_DECK, DELETE_DECK } from '../actions'

export default function cardsReducer(state = {}, action) {
  switch (action.type) {
    case PUSH_ALL_DECKS:
      return{
        ...state,
        ...action.decks,
      }

    case PUSH_DECK:
      return {
        ...state,
        ...action.deck,
      }

    case DELETE_DECK:
      return state

    default:
      return state
    }
}
