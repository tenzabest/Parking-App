import React, { Component } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ScannerScreen from "./ScannerScreen"
import StudentsListScreen from "./StudentsListScreen"
import SettingsScreen from "./SettingsScreen"


const Tab = createBottomTabNavigator();


class SenderScreen extends Component {
  constructor(props) {
    super(props);
    this.state = { classChecked: [] }
  }

  componentDidMount() { }
  getClasses = (classes) => {
    this.setState({ classChecked: classes })
  }

  render() {
    return (
      <Tab.Navigator
        initialRouteName="Settings"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="ListOfStudents"
          children={() => <StudentsListScreen sendingData={this.state.classChecked}></StudentsListScreen>}
          options={{
            tabBarLabel: 'Lists',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="view-list-outline" color={color} size={size} />
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
          children={() => <SettingsScreen nav={this.props.navigation} parentCallBack={this.getClasses} ></SettingsScreen>}
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