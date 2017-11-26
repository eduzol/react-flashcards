import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text,  ScrollView ,View } from 'react-native';
import * as  DeckAPI from '../util/api.js'; 
import Deck from './Deck';
import DeckDetails  from './DeckDetails';

class DeckList extends Component {

    state = {
        deckList : []
    };

    navigate = ( deck ) =>{
        this.props.navigation.navigate(
            'DeckDetails',
            {deck}
        );
    }
    
    componentDidMount(){
        
        DeckAPI.getDecks().then(
                (list) => {
                   this.setState({deckList:list});
        });    

    }

    renderDeck = ({item}) =>{
        return (
            <TouchableOpacity onPress={() => this.navigate(item)}>
                <Deck deck={item} />
            </TouchableOpacity>
        );
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