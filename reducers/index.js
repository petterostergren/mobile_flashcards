import { PUSH_ALL_DECKS, PUSH_DECK, DELETE_DECK, PUSH_CARD } from '../actions'
import _ from 'lodash'

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
        [action.deck.deckId]: action.deck.newDeck
      }
      case PUSH_CARD:
    return {
      ...state,
      [action.payload.id]: {
        ...state[action.payload.id],
        questions: [
          ...state[action.payload.id].questions,
          action.payload.card,
        ],
      },
    }


    case DELETE_DECK:
      const newState = _.omit(state, [action.id])
      return newState

    default:
      return state
    }
}
