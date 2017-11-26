import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text,  View } from 'react-native';
import * as  DeckAPI from '../util/api.js'; 

class DeckDetails extends Component {

    render () {
        
        return (
            <View style={styles.container} >
                <Text> Deck Details View</Text>
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
    },
});
  

export default DeckDetails;

