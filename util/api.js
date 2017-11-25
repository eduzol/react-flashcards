import { AsyncStorage } from 'react-native';

const key = "eduzol-flashcards";
const deckKey = key+"-decks";
const questionsKey = key+"-questions";

let decks = [];
let questions = [];
let debug = true;

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
    }
];

var sampleDeckList =[ {
    id : "ABCDEF",
    title : "Matrix Trivia", 
    questions : ['q1','q2']
}];

if (debug === true){
    try{
        let deckListJson = JSON.stringify(sampleDeckList);
        AsyncStorage.setItem(deckKey,deckListJson);
        AsyncStorage.setItem(questionsKey,JSON.stringify(sampleQuestions));
    }catch(error){
        console.log("Error " , error);
    }
    
}

/**
 * getDecks: return all of the decks along with their titles, questions, and answers. 
 */
export const getDecks = () =>{
    return AsyncStorage.getItem(deckKey)
            .then(results =>{
                return JSON.parse(results);
            });
}

export const getCards = () => {
    return AsyncStorage.getItem(questionsKey)
    .then(results =>{
        return JSON.parse(results);
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
            questions : []
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
export const addCardToDeck = (title, card ) =>{

    let id = Math.random().toString(36).substr(-8);
    return getDecks().then( (list) => {
        
        let deck = list.find( (element ) => element.title === title  );
        if ( deck ){
            let deckId = deck.id;
            var newQuestion = {
                id, 
                deckId, 
                ...card
            };
            return getCards().then((cards) => {
                cards.push(newQuestion);
                AsyncStorage.setItem(questionsKey,JSON.stringify(cards));
            });
        }else{
            console.log('deck with title ' + title + ' not found ');
        }
    });
};

/**
 * Sample usage
 *        
        DeckAPI.getDeck('ABCDEF').then( (deck)=> {
                console.log('Single Deck ' + JSON.stringify(deck));
        }); 

        DeckAPI.saveDeckTitle('Futbol').then( (newDeck) => {
           console.log('newDeck ' + JSON.stringify(newDeck));
           DeckAPI.getDecks().then(
            (list) => {
                console.log('newDeck ***  ' + JSON.stringify(list));
                DeckAPI.addCardToDeck('Futbol' , {question: 'Sample question 1 ' , answer: 'Sample answer 1'})
                .then(() => {
                    DeckAPI.getCards().then((cards) => {
                        console.log('cards .. ' + JSON.stringify(cards));
                    });
                });            
            });

        });
*/
