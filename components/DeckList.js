import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text,  View } from 'react-native';
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

    render(){

        let deckList = this.state.deckList;

        return (

            <View style={styles.container} >
              {deckList.map( (deck) => 
                        ( 
                         <Deck key={deck.id} deck={deck} />
                        )   
               )}
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
  

export default DeckList;