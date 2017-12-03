import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text,  View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import * as  DeckAPI from '../util/api.js'; 
import Deck from './Deck';
import {clearLocalNotification, setLocalNotification } from '../util/helpers';

class DeckDetails extends Component {

    constructor(props){
        super(props);
        this.state = {};
    }
    
    navigateToQuiz = () => {

        let deck = this.props.deck;
        clearLocalNotification().then(setLocalNotification);
        this.props.navigate({
            routeName: 'Quiz',
            params:{deck}
        });

    }

    navigateToNewCard = () =>{

        let deck = this.props.deck;
        this.props.navigate({
            routeName: 'NewCard',
            params:{deck}
        });
    }

    render () {

        let item = this.props.deck;
    
        return (
            <View style={styles.container} >
                <Deck deck={item} />
                <View style={{  justifyContent: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity style={item.cards.length === 0?styles.buttonDisabled :styles.button} 
                        disabled = {item.cards.length === 0}
                        onPress={() => this. navigateToQuiz()}>
                        <Text style={{color:'#FFFFFF'}}>Start Trivia</Text>
                    </TouchableOpacity>
                   <TouchableOpacity style={styles.button} onPress={() => this. navigateToNewCard()}>
                        <Text style={{color:'#FFFFFF'}}>Add Card</Text>
                    </TouchableOpacity>
                </View>
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button :{
        alignSelf: 'center',
        margin: 20, 
        borderColor:'#000000',
        borderWidth: 1,
        padding: 20,
        backgroundColor:'#0275d8'
    }, 
    buttonDisabled :{
        alignSelf: 'center',
        margin: 20, 
        borderColor:'#000000',
        borderWidth: 1,
        padding: 20,
        backgroundColor:'#ACACAC'
    }
});
  

function mapStateToProps (state, { navigation }) {
    
    //fix for https://github.com/react-community/react-navigation/issues/143
    let deckId = navigation.state.params.deck ? navigation.state.params.deck.id : state.currentDeck;
    let deck = state.decks.find( (deck) => deck.id === deckId);
    deck.cards = state.cards.filter((card) => card.deckId === deckId );
   
    return  {
        deck , 
        cardLenght: state.cards.length
    };
}
  
function mapDispatchToProps(dispatch, { navigation }){
    return {
        navigate: data => navigation.dispatch(NavigationActions.navigate(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails);
