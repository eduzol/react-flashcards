import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text,  View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import * as  DeckAPI from '../util/api.js'; 
import Deck from './Deck';

class DeckDetails extends Component {

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
                    <TouchableOpacity style={styles.button}>
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
    }
});
  

function mapStateToProps (state, { navigation }) {
    
    let deckId = navigation.state.params.deck.id;
    let deck = state.decks.find( (deck) => deck.id === deckId);
    deck.cards = state.cards.filter((card) => card.deckId === deckId );
   
    return  {
        deck 
    };

}
  
function mapDispatchToProps(dispatch, { navigation }){
    return {
        navigate: data => navigation.dispatch(NavigationActions.navigate(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails);
