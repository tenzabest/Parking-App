import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from "./screens/SignInScreen"
import SenderScreen from "./screens/SenderScreen"
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from './Setup';

import { createStackNavigator } from '@react-navigation/stack';

//import AsyncStorage from '@react-native-async-storage/async-storage';

import * as SecureStore from 'expo-secure-store';
import {SignInUser} from "./firebaseService"
import SettingsScreen from './screens/SettingsScreen';


const Stack = createStackNavigator();

class App extends Component  {
  constructor(){
    super();
    this.state = {
      signInEmail: '',
      signInPassword: '',
      isSigned: false,
      isLoaded: false
    }
  }

  render(){
    return (
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="SignIn"
            component={SignInScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen 
            name="SenderScreen" 
            component={SenderScreen}  
            options={{
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
