import React, { Component } from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

import ScannerScreen from "./ScannerScreen"
import StudentsListScreen from "./StudentsListScreen"
import SettingsScreen from "./SettingsScreen"


const Tab = createBottomTabNavigator();


class SenderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { classes: [] }
  }
  componentDidMount() { }
  getClasses = (classes) => {
    this.setState({ classes: classes })

  }

  render() {

    return (

      <Tab.Navigator
        initialRouteName="Students"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Students"
          children={() => <StudentsListScreen sendingData={this.state.classes}></StudentsListScreen>}
          options={{
            tabBarLabel: 'Updates',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account" color={color} size={size} />
            )
          }}
        />
        <Tab.Screen
          name="Scanner"
          component={ScannerScreen}
          options={{
            tabBarLabel: 'Scanner',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="qrcode-scan" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Settings"
          children={() => <SettingsScreen parentCallBack={this.getClasses}></SettingsScreen>}
          options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="account-settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    );
  }
}
export default SenderScreen