import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text,  ScrollView ,View } from 'react-native';
import * as  DeckAPI from '../util/api.js'; 
import Deck from './Deck';
import DeckDetails  from './DeckDetails';

class DeckList extends Component {

    state = {
        decks : []
    };

    navigate = ( deck ) =>{
        
        this.props.navigation.navigate(
            'DeckDetails',
            {deck}
        );
    }
    
    componentDidMount(){
       
        DeckAPI.getFullDecks().then(
                (list) => {
                  this.setState({decks:list});
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

        let decks = this.state.decks;
        
        return (
            <FlatList
              data={decks}
              keyExtractor = { deck => deck.id}
              renderItem = {this.renderDeck}
            />
        );
    }
}

export default DeckList;