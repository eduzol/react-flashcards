import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text,  View } from 'react-native';
import * as  DeckAPI from '../util/api.js'; 
import Deck from './Deck';

class DeckDetails extends Component {

    state = {
        deck : {}
    };

    componentDidMount(){
       
        let deck = this.props.navigation.state.params.deck;
        this.setState({deck});

    }
    
    render () {
        let item = this.state.deck;
       
        return (
            <View style={styles.container} >
               
                <Deck deck={item} />
             
                <View style={{  justifyContent: 'center', flexDirection: 'row'}}>
                    <TouchableOpacity style={styles.button}>
                        <Text style={{color:'#FFFFFF'}}>Start Trivia</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.button}>
                        <Text style={{color:'#FFFFFF'}}>Add Card</Text>
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
        margin: 20, 
        borderColor:'#000000',
        borderWidth: 1,
        padding: 20,
        backgroundColor:'#0275d8'
    }
});
  

export default DeckDetails;

