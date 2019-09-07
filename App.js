/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Fragment} from 'react';
import {
  View
} from 'react-native';

import { Home } from './screens';

import {
  createStackNavigator,
  } from 'react-navigation-stack';

import { createAppContainer } from 'react-navigation';

const MainNavigator = createStackNavigator({
    Home: {screen: Home},
});

const AppContainer = createAppContainer(MainNavigator);


class App extends React.Component {

  render() {
    return (
      <AppContainer />
    );
  }
};

export default App;
