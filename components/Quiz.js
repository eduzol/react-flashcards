import React, { Component } from 'react';
import { connect } from 'react-redux';
import {StyleSheet, FlatList, TouchableOpacity,Text, TextInput,View, KeyboardAvoidingView } from 'react-native';

class Quiz extends Component {

    state = {
        currentCard : 0, 
        score : 0, 
        showAnswer : false
    }

    toggleShowAnswer = () =>{
        let showAnswer = this.state.showAnswer;
        this.setState({showAnswer: !showAnswer});
    }

    render() {

        let deck = this.props.deck;
        let cards = this.props.cards;
        
        return (
            <View style={styles.container} >
                <Text>{deck.title} Trivia. Question {this.state.currentCard+1} of {cards.length} </Text>
                <View style={styles.quizContainer}>
                    
                    {this.state.showAnswer === false ? 
                        ( <Text style={styles.title}>{cards[this.state.currentCard].question}</Text>) :
                        ( <Text style={styles.title}>{cards[this.state.currentCard].answer}</Text>)
                    }
                   
                    <TouchableOpacity style={styles.button} onPress={() => this.toggleShowAnswer()}>
                    {this.state.showAnswer === true ? 
                        (<Text style={{color:'#FFFFFF', fontSize:18}}>Show question</Text>):
                        (<Text style={{color:'#FFFFFF', fontSize:18}}>Show answer</Text>)
                    }   
                    </TouchableOpacity>
                </View>
                <View style={{  justifyContent: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button} >
                        <Text style={{color:'#FFFFFF'}}>Incorrect</Text>
                    </TouchableOpacity>
                   <TouchableOpacity style={styles.button} >
                        <Text style={{color:'#FFFFFF'}}>Correct</Text>
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

function mapStateToProps (state, { navigation }) {
    
    let deckId = navigation.state.params.deck.id;
    let deck = state.decks.find( (deck) => deck.id === deckId);
    let cards = state.cards.filter((card) => card.deckId === deckId );
   
    return  {
        deck , 
        cards
    };
}
  
function mapDispatchToProps(dispatch, { navigation }){
    return {
        navigate: data => navigation.dispatch(NavigationActions.navigate(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);
