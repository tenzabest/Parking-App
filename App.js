import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from "./screens/SignInScreen"
import SenderScreen from "./screens/SenderScreen"
<<<<<<< HEAD
import SettingsScreen from "./screens/SettingsScreen"
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import StudentsListScreen from "./screens/StudentsListScreen"
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function App() {
=======
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from './Setup';

import { createStackNavigator } from '@react-navigation/stack';

//import AsyncStorage from '@react-native-async-storage/async-storage';

import * as SecureStore from 'expo-secure-store';
import {SignInUser} from "./firebaseService"
import SettingsScreen from './screens/SettingsScreen';
>>>>>>> c59f7228a4c28f9e7b0644a939e85e0347fa83be


<<<<<<< HEAD
  )}
=======
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
>>>>>>> c59f7228a4c28f9e7b0644a939e85e0347fa83be

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
