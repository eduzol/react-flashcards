import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, FlatList, TouchableOpacity,Text, TextInput,View, KeyboardAvoidingView } from 'react-native';


class QuizResults extends Component{
    
    render(){

        let score = this.props.score;
        let deck = this.props.deck;
        let cards = this.props.cards;

        return (

            <View style={styles.container} >
                <View style={styles.quizContainer}>
                    <Text style={styles.title}>Your Score: </Text>
                    <Text style={styles.title}>{score} out of {cards.length} cards</Text>
            </View>
            <View style={{  justifyContent: 'center', flexDirection: 'row'}}>
                <TouchableOpacity style={styles.button} onPress={this.props.onShowDeck}>
                    <Text style={{color:'#FFFFFF'}}>Show Deck</Text>
                </TouchableOpacity>
               <TouchableOpacity style={styles.button} onPress={this.props.onRestart}>
                    <Text style={{color:'#FFFFFF'}}>Restart Quiz</Text>
                </TouchableOpacity>
            </View>
        </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    button :{
        alignSelf: 'center',
        margin: 50, 
        borderColor:'#000000',
        borderWidth: 1,
        padding: 20,
        backgroundColor:'#0275d8'
    }, 
    quizContainer: {
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
      }
});

export default QuizResults;
