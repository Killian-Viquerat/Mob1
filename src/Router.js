import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import LoginScreen from './components/LoginScreen.js';
//Screen
import RegisterScreen from './components/RegisterScreen.js';
import ProductScreen from './screen/ProductScreen.js';
import BasketScreen from './screen/BasketScreen.js';
import ProfileScreen from './screen/ProfileScreen.js';

import {UserContainer} from './containers/index.js';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();

export default function Router() {
  const userContainer = UserContainer.useContainer();
  userContainer.refreshTokken();
  return (
    <NavigationContainer>
      {userContainer.tokken ? (
        <Tab.Navigator>
          <Tab.Screen
            name="Shop"
            component={ProductScreen}
            options={{
              tabBarIcon: () => (
                <Ionicons name="shopping-bag" color="#333" size={24} />
              ),
            }}
          />
          <Tab.Screen
            name="Panier"
            component={BasketScreen}
            options={{
              tabBarIcon: () => <Ionicons name="shopping-cart" color="#333" size={24} />,
            }}
          />
          <Tab.Screen
            name="Settings"
            component={ProfileScreen}
            options={{
              tabBarIcon: () => (
                <Ionicons name="sliders-h" color="#333" size={24} />
              ),
              headerStyle: {
                backgroundColor: '#0f20d9',
              },
              headerTintColor: '#fff',
            }}
          />
        </Tab.Navigator>
      ) : (
        <Stack.Navigator>
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{
              title: 'Login',
              headerStyle: {
                backgroundColor: '#0f20d9',
              },
              headerTintColor: '#fff',
            }}
           />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  );
}
