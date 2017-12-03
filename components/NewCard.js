import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text, TextInput,View, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { addCard } from '../actions';

class NewCard extends Component {
    
    render(){
        let deck = this.props.deck;
        return (
            <View style={styles.container}>
                <Text>Add new card</Text>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'center',
    }
});

function  mapStateToProps (state , { navigation }){
    
    let deckId = navigation.state.params.deck.id;
    let deck = state.decks.find( (deck) => deck.id === deckId);

    return  {
        deck 
    };
}

function mapDispatchToProps(dispatch, { navigation }) {
    return {
        navigate: data => navigation.dispatch(NavigationActions.navigate(data)),
        addCards: data => dispatch(addCards(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard);