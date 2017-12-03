export const GET_DECKS = 'GET_DECKS';
export const GET_CARDS = 'GET_CARDS';

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

