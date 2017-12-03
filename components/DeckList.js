import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text,  ScrollView ,View } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import {getDecks } from '../actions';
import * as  DeckAPI from '../util/api.js'; 
import Deck from './Deck';
import DeckDetails  from './DeckDetails';

class DeckList extends Component {

    navigate = ( deck ) =>{
        
        this.props.navigate({
            routeName: 'DeckDetails',
            params:{deck}
        });
    }
    
    componentDidMount(){
       
        DeckAPI.getFullDecks().then(
                (list) => {
                    this.props.getDecks(list);
                }
        );  

    }

    renderDeck = ({item}) =>{
       
        return (
            <TouchableOpacity onPress={() => this.navigate(item)}>
                <Deck deck={item} />
            </TouchableOpacity>
        );
    };


    render(){

        let decks = this.props.decks;
        
        return (
            <FlatList
              data={decks}
              keyExtractor = { deck => deck.id}
              renderItem = {this.renderDeck}
            />
        );
    }
}


function  mapStateToProps (state ){
    return {
        decks : state.decks
    };
}

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        navigate: data => navigation.dispatch(NavigationActions.navigate(data)),
        getDecks: data => dispatch(getDecks(data)),
    };
} 

export default connect(mapStateToProps, mapDispatchToProps)(DeckList);