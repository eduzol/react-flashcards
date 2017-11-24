import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text,  View } from 'react-native';
import * as  DeckAPI from '../util/api.js'; 

class DeckList extends Component {

    state = {
        deckList : []
    };

    componentDidMount(){


        DeckAPI.getDecks().then(
                (list) => {
                   this.setState({deckList:list});
                }) ;
    

        DeckAPI.getDeck('ABCDEF').then( (deck)=> {
                console.log('Single Deck ' + JSON.stringify(deck));
        }); 
/*
        DeckAPI.saveDeckTitle('Futbol').then( () => {
            DeckAPI.getDecks().then(
                (list) => {
                  console.log('*********** ' + JSON.stringify(list) );
                }) ;
        });
    */
       
    }
    render(){

        let data = JSON.stringify(this.state.deckList);
       
        return (
            <View style={styles.container} >
                <Text>This is a Deck List view</Text>
                <Text>{data}</Text>
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