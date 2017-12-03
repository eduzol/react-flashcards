export const GET_DECKS = 'GET_DECKS';

export function receiveDecks(decks) {
    return {
      type: GET_DECKS,
      decks,
    };
}

