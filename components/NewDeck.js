import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text, TextInput, KeyboardAvoidingView } from 'react-native';
import * as  DeckAPI from '../util/api.js'; 

class NewDeck extends Component {

    state = {
        title: '',
    };

    onTitleChange  = (title) => {
        this.setState({title});
    }

    onSubmit = () => {
        let title = this.state.title;
        DeckAPI.saveDeckTitle(title).then( (newDeck) => {
           
            DeckAPI.getFullDecks().then( (decks) => {
                console.log('Decks ' + JSON.stringify(decks) );
            });

            this.props.navigation.navigate(
                'DeckList'
            );
        })
    }
    render () {
        return (

            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.buttonText}>
                   Deck Title
                </Text>
    
                <TextInput
                onChangeText={this.onTitleChange}
                    style={styles.input}
                    value={this.state.title}
                />
    
            <TouchableOpacity onPress={this.onSubmit} style={styles.button}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </KeyboardAvoidingView>
           
        );

    }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5',
      alignItems: 'center',
      justifyContent: 'center',
    },
    button: {
        padding: 10,
        alignSelf: 'center',
        margin: 10,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius:2 ,
    },
    buttonText: {
        fontSize: 20,
    },
    input: {
        width: 300,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderRadius: 7,
        margin: 10,
    }
  });
  

export default NewDeck;

