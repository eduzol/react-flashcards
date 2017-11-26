import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';

import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck';

const AppStatusBar = ({ backgroundColor, ...props }) => (
  <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
    <StatusBar backgroundColor={backgroundColor} translucent {...props} />
  </View>
);

const Tabs = TabNavigator({

    DeckList : {
        screen : DeckList, 
        navigationOptions: {
          tabBarLabel: 'Decks',
          tabBarIcon: ({ tintColor }) => <Ionicons name='ios-browsers' size={30} color={tintColor} />
        }
      }, 
    NewDeck : {
        screen: NewDeck, 
        navigationOptions: {
          tabBarLabel: 'Add Deck',
          tabBarIcon: ({ tintColor }) => <Ionicons name='ios-add' size={30} color={tintColor} />
        }
      }
    }, {
      navigationOptions: {
        header: null,
      },
      tabBarOptions: {
        activeTintColor: Platform.OS === 'ios' ? '#0275d8': '#FFFFFF',
        style: {
          backgroundColor: Platform.OS === 'ios' ? '#FFFFFF' : '#0275d8',
        },
      }
    
});

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
});


export default class App extends React.Component {
  
  render() {
    return (
      <View style={styles.container}>
        <AppStatusBar backgroundColor='#0275d8' barStyle="light-content" />
        <MainNavigator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
