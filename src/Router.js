import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import HomeScreen from './components/HomeScreen.js';
import SettingsScreen from './components/SettingsScreen.js';
import LoginScreen from './components/LoginScreen.js';
import RegisterScreen from './components/RegisterScreen.js';
import ShopScreen from './components/ShopScreen.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Router() {
  var logged = 1;
  if (logged) {
    return (
      <NavigationContainer>
        <Tab.Navigator>
          <Tab.Screen
            name="Home"
            component={HomeScreen}
            options={{
              tabBarIcon: () => <Ionicons name="home" color="#333" size={24} />,
            }}
          />
          <Tab.Screen
            name="Shop"
            component={ShopScreen}
            options={{
              tabBarIcon: () => (
                <Ionicons name="shopping-basket" color="#333" size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Settings"
            component={SettingsScreen}
            options={{
              tabBarIcon: () => (
                <Ionicons name="info-circle" color="#333" size={24} />
              ),
            }}
          />
        </Tab.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
