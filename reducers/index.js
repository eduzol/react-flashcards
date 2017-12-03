import { combineReducers } from 'redux';
import { GET_DECKS, GET_CARDS, ADD_DECK, ADD_CARD } from '../actions';

var initialState = {
    decks : [], 
    cards : []
};

function deckReducer ( state =initialState, action){

    switch ( action.type ) {
        
        case GET_DECKS:
            return {
                ...state, 
                'decks' : action.decks
            }
        
        case GET_CARDS:
            return {
                ...state, 
                'cards': action.cards
            }

        case ADD_DECK :
            return {
                ...state, 
                'decks' : state.decks.concat(action.deck)
            }

        case ADD_CARD:
            return {
                ...state, 
                'cards': state.cards.concat(action.card)
            }
           
        default:
            return state;
    }
}

export default deckReducer;