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

/*

addCardToDeck: take in two arguments, title and card, and will add the card 
to the list of questions for the deck with the associated title.  
*/

/**
 * getDecks: return all of the decks along with their titles, questions, and answers. 
 */
export const getDecks = () =>{
    return AsyncStorage.getItem(deckKey)
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
/*
export const saveDeckTitle = (title) => {
    let id = Math.random().toString(36).substr(-8);

    return AsyncStorage.mergeItem(deckKey, JSON.stringify({
        [id]: {
          title,
          questions: [],
        },
     }))
} */