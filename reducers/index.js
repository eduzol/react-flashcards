import { combineReducers } from 'redux';
import { GET_DECKS, GET_CARDS} from '../actions';

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
        
        default:
            return state;
    }
}


export default deckReducer;