import React, { Component } from 'react';
import {StyleSheet, FlatList, TouchableOpacity,Text,  View } from 'react-native';

class NewDeck extends Component {

    render () {
        return (

            <View style={styles.container}>
                <Text>This is a new Deck view </Text>
            </View>
        )

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
  

export default NewDeck;

