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
                <Text  style={styles.title}>{deck.title} </Text>
                {cardsLength === 1 ? 
                    <Text  style={styles.cardNumber}>{cardsLength} card</Text>
                :
                    <Text  style={styles.cardNumber}>{cardsLength} cards</Text>
                }
            </View>
        );

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderColor: '#FAFAFA',
      borderRadius: 4,
      borderWidth: 0.5,
      justifyContent: 'center',
      alignItems: 'center',
      margin: 30,
      padding: 50,
    },
    title: {
      fontSize: 32,
      textAlign: 'center',
    },
    cardNumber: {
      fontSize: 24,
      textAlign: 'center',
    },
  });

export default Deck;

