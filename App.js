import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from "./screens/SignInScreen"
import SenderScreen from "./screens/SenderScreen"
import SettingsScreen from "./screens/SettingsScreen"
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';
import StudentsListScreen from "./screens/StudentsListScreen"
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

const Tab = createMaterialTopTabNavigator();

export default function App() {

  return (
    <NavigationContainer>
      <SenderScreen />
    </NavigationContainer>

    //  <SignInScreen/> 
    //      <View style={styles.container}>

    //   {/* <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" /> */}
    // </View>
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
