import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, TabBarIOS, Text, View } from 'react-native';
import SignInScreen from "./screens/SignInScreen"
import SenderScreen from "./screens/SenderScreen"
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

export default function App() {
  return (

      <SenderScreen/>


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