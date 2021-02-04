import React,{Component} from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

import ScannerScreen from "./ScannerScreen"
import StudentsListScreen from "./StudentsListScreen"
import SettingsScreen from "./SettingsScreen"


const Tab = createBottomTabNavigator();


class SenderScreen extends Component {
  constructor(props){
    super(props);
   }

render(){
    return (
        <Tab.Navigator
        initialRouteName="Students"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
            name="Students"
            component={StudentsListScreen}
            options={{
            tabBarLabel: 'Student List',
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
            component={SettingsScreen}
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