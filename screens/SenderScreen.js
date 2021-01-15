import React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { NavigationContainer } from '@react-navigation/native';

import ScannerScreen from "./ScannerScreen"
import StudentsListScreen from "./StudentsListScreen"
import SettingsScreen from "./SettingsScreen"


const Tab = createBottomTabNavigator();

function SenderScreen() {
    return (
     <NavigationContainer>
        <Tab.Navigator
        initialRouteName="Scanner"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
            name="Notifications"
            component={StudentsListScreen}
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
            component={SettingsScreen}
            options={{
            tabBarLabel: 'Settings',
            tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-settings" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
      </NavigationContainer>
    );
  }

  export default SenderScreen