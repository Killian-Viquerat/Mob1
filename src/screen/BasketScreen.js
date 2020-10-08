import BasketDetails from '../components/BasketDetails.js';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

function ProfileScreen() {
  return (
    <Stack.Navigator initialRouteName="Panier">
      <Stack.Screen
        name="Panier"
        component={BasketDetails}
        options={{
          headerStyle: {
            backgroundColor: '#0f20d9',
          },
          headerTintColor: '#fff',
        }}
      />
    </Stack.Navigator>
  );
}

export default ProfileScreen;
