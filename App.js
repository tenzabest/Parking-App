import * as React from 'react';
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

const Stack = createStackNavigator();

>>>>>>> 75b122d7b86e989b5ca77c2967253e04d0278eba

  return (
    <NavigationContainer>
      <SenderScreen />
    </NavigationContainer>

export default function App() {
  const signed = firebase.auth().currentUser;

  return (
    <NavigationContainer>
      <Stack.Navigator>
          
            <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                headerShown: false,
              }}
            />
         
            <Stack.Screen 
              name="SenderScreen" 
              component={SenderScreen}  
              options={{
                title: 'Gestion de sortie',
                headerShown: false
              }}
            />
          
        </Stack.Navigator>
 
        {/* { ( signed !== null ) 
          ? <Stack.Screen 
              name="SenderScreen" 
              component={SenderScreen}  
              options={{
                title: 'Gestion de sortie',
                headerShown: false
              }}
            />
          : <Stack.Screen
              name="SignIn"
              component={SignInScreen}
              options={{
                headerShown: false,
              }}
            />
        } */}

    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});