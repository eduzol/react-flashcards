import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text,  ScrollView ,View } from 'react-native';
import * as  DeckAPI from '../util/api.js'; 
import Deck from './Deck';

class DeckList extends Component {

    state = {
        deckList : []
    };

    componentDidMount(){
        
        DeckAPI.getDecks().then(
                (list) => {
                   this.setState({deckList:list});
        });    

    }

    renderDeck = ({item}) =>{
        return <Deck deck={item} />
    };


    render(){

        let deckList = this.state.deckList;

        return (
            <FlatList
              data={deckList}
              keyExtractor = { deck => deck.id}
              renderItem = {this.renderDeck}
            />
        );
    }
}

export default DeckList;