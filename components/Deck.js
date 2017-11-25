import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text,  View } from 'react-native';
import * as  DeckAPI from '../util/api.js'; 

class Deck extends Component {

    state = {
        cards : []
    }

    componentDidMount(){
        let deckId = this.props.deck.id;
        DeckAPI.getCardsByDeckId(deckId).then( (cards) => {
            this.setState({cards});
        });
    }

    render () {
        
        let deck = this.props.deck;
        let cards = this.state.cards;
        let cardsLength = cards.length;
        return (
            <View style={styles.container} >
                <Text>{deck.title} </Text>
                {cardsLength === 1 ? 
                    <Text>{cardsLength} card</Text>
                :
                    <Text>{cardsLength} cards</Text>
                }
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#fff',
      alignItems: 'center',
      justifyContent: 'center',
    },
  });

export default Deck;

