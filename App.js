import React from 'react';
import { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import SignInScreen from "./screens/SignInScreen"
import SenderScreen from "./screens/SenderScreen"
import { NavigationContainer } from '@react-navigation/native';
import { firebase } from './Setup';

import { createStackNavigator } from '@react-navigation/stack';

import * as SecureStore from 'expo-secure-store';
import {SignInUser} from "./firebaseService"

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

  componentDidMount(){
    if(this.state.isLoaded === false){
      if(SecureStore.isAvailableAsync()){
        SecureStore.getItemAsync('user')
            .then((email) => {
                this.setState({signInEmail: email});
                console.log('SignIn email: ', signInEmail); 
            })
            .catch((error) => {
                console.log('SignIn email error: ', error);
            });
  
        SecureStore.getItemAsync('pass')
            .then((pass) => {
              this.setState({signInPassword: pass});
                console.log('SignIn password: ', signInPassword); 
            })
            .catch((error) => {
                console.log('SignIn password error: ', error);
            });
      }
  
      this.setState({isLoaded: true});
    }
  }

  loadingScreen() {
    return(
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }

  appStack(){
    return(
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
              headerShown: false
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }

  checkSignIn(){
    SignInUser(this.state.signInEmail, this.state.signInPassword)
          .then((data) => {
            console.log("Success")
            this.setState({isSigned: true});
          })
          .catch((error) => {
            console.log("No Success: ", error)
            this.setState({isSigned: false});
          });

    if(this.state.isSigned){
      return(
        <SenderScreen/>
      );
    }
    else{
      return this.appStack();
    }
  }

  render(){
    if(this.state.isLoaded){
      return this.checkSignIn();
    } else{
      return this.loadingScreen();
    }
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
