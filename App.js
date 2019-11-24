
import React from 'react';
import { Login } from './src/Login'
import { Register } from './src/Register'
import { Profile } from './src/Profile'
import { History } from './src/History'
import { Gediz } from './src/Gediz'
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const MainNavigator = createStackNavigator({
  Login: { screen: Login },
  Register: { screen: Register },
  Profile: { screen: Profile },
  History: { screen: History },
  Gediz: { screen: Gediz }
});

const App = createAppContainer(MainNavigator);
export default App;