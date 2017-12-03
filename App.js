import React from 'react';
import { StyleSheet, Text, View, Platform, StatusBar } from 'react-native';
import { StackNavigator, TabNavigator } from 'react-navigation';
import { FontAwesome, Ionicons } from '@expo/vector-icons';
import { Constants } from 'expo';
import devToolsEnhancer from 'remote-redux-devtools';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import DeckList from './components/DeckList'
import NewDeck from './components/NewDeck';
import DeckDetails from './components/DeckDetails';
import NewCard from './components/NewCard';
import Quiz from './components/Quiz';
import deckReducer from './reducers';

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
    navigationOptions: {
      headerTintColor:'#FFFFFF',
      headerStyle: {
        backgroundColor:'#0275d8',
      },
    },
  },
  DeckDetails : {
    screen: DeckDetails,
    navigationOptions: ({ navigation }) => ({
      title: 'Deck Details',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#0275d8',
      },
    })
  }, 
  NewCard : {
    screen : NewCard, 
    navigationOptions: ({ navigation }) => ({
      title: 'Add card to deck',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#0275d8',
      },
    })
  }, 
  Quiz :  {
    screen :Quiz, 
    navigationOptions: ({ navigation }) => ({
      title: 'Trivia',
      headerTintColor: '#FFFFFF',
      headerStyle: {
        backgroundColor: '#0275d8',
      },
    })
  }, 
 
});


export default class App extends React.Component {
  
  render() {
    return (
      <Provider store={createStore(deckReducer, devToolsEnhancer())}>
        <View style={styles.container}>
          <AppStatusBar backgroundColor='#0275d8' barStyle="light-content" />
          <MainNavigator />
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
});
