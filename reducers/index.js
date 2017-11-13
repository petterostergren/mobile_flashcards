import { PUSH_ALL_DECKS, PUSH_DECK, DELETE_DECK, PUSH_CARD } from '../actions'

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
    };


    case DELETE_DECK:
      const newState = state
      delete state[action.id]
      return newState

    default:
      return state
    }
}
