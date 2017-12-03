export const GET_DECKS = 'GET_DECKS';
export const GET_CARDS = 'GET_CARDS';
export const ADD_DECK = 'ADD_DECK';
export const ADD_CARD = 'ADD_CARD';


export function getDecks(decks) {
    return {
      type: GET_DECKS,
      decks
    };
}

export function getCards(cards) {
  return {
      type: GET_CARDS,
      cards
  };
}

export function addDeck(deck){
  return {
    type: ADD_DECK, 
    deck
  }
}

export function addCard(card){
  return {
    type: ADD_CARD, 
    card
  }
}

