import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text, TextInput,View, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { addCard } from '../actions';
import * as  DeckAPI from '../util/api.js'; 

class NewCard extends Component {
    
    state = {
        question : '', 
        answer : '', 
        questionValidationMessage:'', 
        answerValidationMessage:''
    }

    onQuestionChange = (question) => {
        this.setState({question});
    }

    onAnswerChange = (answer) => {
        this.setState({answer});
    }

    onSubmit = () => {
        
        if ( !this.state.question){
            var questionValidationMessage = "Question field cannot be blank";
        }

        if (!this.state.answer){
            var answerValidationMessage = "Answer field cannot be blank";
        }

        if (!this.state.question || !this.state.answer){
            this.setState({questionValidationMessage, answerValidationMessage});
            return;
        }

        let deck =  this.props.deck;
        let card  ={
            question : this.state.question, 
            answer : this.state.answer
        };
        
        
        DeckAPI.addCardToDeck(deck.id ,card)
        .then((newCard) => {
            this.props.addCard(newCard);
            this.props.goBack();
        });    
    }

    render(){
        let deck = this.props.deck;
        return (

            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.text}>
                   Enter Question
                </Text>
    
                <TextInput
                    onChangeText={this.onQuestionChange}
                    style={styles.input}
                    value={this.state.question}
                />
                <Text>
                    {this.state.questionValidationMessage}
                </Text>


                <Text style={styles.text}>
                   Enter Answer
                </Text>
    
                <TextInput
                    onChangeText={this.onAnswerChange}
                    style={styles.input}
                    value={this.state.answer}
                />
                 <Text>
                 {this.state.answerValidationMessage}
                </Text>
    
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
        backgroundColor: '#0275d8',
        padding: 10,
        alignSelf: 'center',
        margin: 10,
        borderColor: '#000000',
        borderWidth: 1,
        borderRadius:2 ,
    },
    text: {
        fontSize: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 20,
    },
    input: {
        backgroundColor: '#ffffff',
        width: 300,
        height: 44,
        padding: 8,
        borderWidth: 1,
        borderRadius: 7,
        margin: 10,
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
        goBack: () => navigation.goBack(),
        navigate: data => navigation.dispatch(NavigationActions.navigate(data)),
        addCard: data => dispatch(addCard(data))
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(NewCard);