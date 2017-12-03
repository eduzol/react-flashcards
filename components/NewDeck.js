import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text, TextInput, KeyboardAvoidingView } from 'react-native';
import { connect } from 'react-redux';
import { NavigationActions } from 'react-navigation';
import { addDeck, setDeck } from '../actions';
import * as  DeckAPI from '../util/api.js'; 

class NewDeck extends Component {

    state = {
        title: '',
        validationMessage : ''
    };

    onTitleChange  = (title) => {
        this.setState({title});
    }

    onSubmit = () => {

        let title = this.state.title;
        if ( !title){
            this.setState({validationMessage: 'Deck title cannot be blank.'});
            return;
        }

        DeckAPI.saveDeckTitle(title).then( (newDeck) => {
            this.props.addDeck(newDeck);
           
            this.props.setDeck(newDeck.id);
            this.setState({title:'', validationMessage:''});
            this.props.navigate({
                routeName: 'DeckDetails',
                params:{newDeck}
            });
        });
    }
    render () {
        return (

            <KeyboardAvoidingView behavior="padding" style={styles.container}>
                <Text style={styles.titleText}>
                   Enter Deck Title
                </Text>
    
                <TextInput
                onChangeText={this.onTitleChange}
                    style={styles.input}
                    value={this.state.title}
                />

                <Text style={styles.titleText}>
                   {this.state.validationMessage}
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
    titleText: {
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


 function mapStateToProps (state, { navigation }) {
  
    return  {
        navigation 
    };
}  
  
function mapDispatchToProps(dispatch, { navigation }){
    return {
        navigate: data => navigation.dispatch(NavigationActions.navigate(data)),
        addDeck: data => dispatch(addDeck(data)),
        setDeck: data => dispatch(setDeck(data)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewDeck);

