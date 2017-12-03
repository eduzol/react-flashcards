import { GET_DECKS} from '../actions';
import { combineReducers } from 'redux';
import { $for } from 'core-js/library/web/timers';


var initialState = {
    decks : [], 
    questions : []
};

function deckReducer ( state =initialState, action){

    switch ( action.type ) {
        case GET_DECKS:
        return {
            ...state, 
            'decks' : action.decks
        }
    }
}

export default deckReducer;