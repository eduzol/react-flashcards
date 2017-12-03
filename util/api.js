import { AsyncStorage } from 'react-native';

const key = "eduzol-github-com-cards";
const deckKey = key+"-decks";
const questionsKey = key+"-questions";

let decks = [];
let questions = [];
let debug = false;

/* 
    Sample Data Model
*/

var sampleQuestions = [
 
    {
        id : "q1", 
        deckId : "ABCDEF", 
        question: "what is the matrix?", 
        answer: "a simulated reality called the Matrix, created by sentient machines"

    }, 
    {
        id : "q2", 
        deckId : "ABCDEF", 
        question: "Who is NEO?", 
        answer: "He is the ONE."
    }, 
    {
        id : "q3", 
        deckId : "B166ER", 
        question: "Who is Tiesto", 
        answer: "Tirsj from Netherlands."
    }
];

var sampleDeckList =[ 
    {
        id : "ABCDEF",
        title : "Matrix Trivia", 
    }, 
    {
        id:"B166ER", 
        title:"EDM Trivia"
    }
];
/*
if (debug === true){
    try{
        let deckListJson = JSON.stringify(sampleDeckList);
        AsyncStorage.setItem(deckKey,deckListJson);
        AsyncStorage.setItem(questionsKey,JSON.stringify(sampleQuestions));
    }catch(error){
        console.log("Error " , error);
    }
    
}*/

/**
 * getDecks: return all of the decks along with their titles, questions, and answers. 
 */
export const getDecks = () =>{
    return AsyncStorage.getItem(deckKey)
            .then(results =>{

                let decks =  JSON.parse(results);
                if (!decks){
                    decks = []
                }
                return decks;
            });
}

export const getCards = () => {
    return AsyncStorage.getItem(questionsKey)
    .then(results =>{
        let cards  =  JSON.parse(results);
        if(!cards){
            cards = []
        }
        return cards;
    });
}

export const getFullDecks = () =>{

    return new Promise((resolve, reject) => {
        
        getDecks().then( (decks) => {
            getCards().then(( cards) => {
                let fullDecks = [];
                decks.forEach(deck => {
                    let filteredCards = cards.filter( card => card.deckId === deck.id );
                    deck.cards = filteredCards;
                    fullDecks.push( deck );
                });
                resolve(fullDecks);
            });
        });
        
    });
}

export const getCardsByDeckId = ( deckId ) => {
    
    return getCards().then((cards) => {
        let filteredCards  = cards.filter((element) => element.deckId === deckId );
        return filteredCards;
    });
}
/**
 * getDeck: take in a single id argument and return the deck associated with that id. 
 */
export const getDeck = (deckId) =>{
    return AsyncStorage.getItem(deckKey)
            .then(results =>{
                let deck = JSON.parse(results).find( element => element.id === deckId);      
                return deck ;
            });
}

/**
 * saveDeckTitle: take in a single title argument and add it to the decks.
 */

export const saveDeckTitle = (title) => {
    let id = Math.random().toString(36).substr(-8);
    return getDecks().then( (list) => {
       
        let newDeck = {
            id, 
            title, 
        };
        
        list.push( newDeck );
        AsyncStorage.setItem(deckKey,JSON.stringify(list));
        return newDeck;

    }) ;
};

/*
addCardToDeck: take in two arguments, title and card, and will add the card 
to the list of questions for the deck with the associated title.  
*/
export const addCardToDeck = (deckId, card ) =>{

    let id = Math.random().toString(36).substr(-8);

    return new Promise((resolve, reject) => {

        getDecks().then( (list) => {
            
            let deck = list.find( (element ) => element.id === deckId  );
            if ( deck ){
                let deckId = deck.id;
                var newCard = {
                    id, 
                    deckId, 
                    ...card
                };
                return getCards().then((cards) => {
                    cards.push(newCard);
                    AsyncStorage.setItem(questionsKey,JSON.stringify(cards));
                    resolve(newCard);
                });
            }else{
                console.log('deck with id ' + deckId + ' not found ');
                reject();
            }
        });
    });
};

