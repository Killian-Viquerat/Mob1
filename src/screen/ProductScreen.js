import ProductDetails from '../components/ProductDetails.js';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ShopScreen from '../components/ShopScreen.js';

const Stack = createStackNavigator();

function ProductScreen() {
  return (
    <Stack.Navigator initialRouteName="List">
      <Stack.Screen
        name="List"
        options={{
          title: 'Shop',
          headerStyle: {
            backgroundColor: '#0f20d9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={ShopScreen}
      />
      <Stack.Screen
        name="Details"
        options={{
          title: 'Details',
          headerStyle: {
            backgroundColor: '#0f20d9',
          },
          headerTintColor: '#fff',
          headerTitleStyle: {
            fontWeight: 'bold',
          },
        }}
        component={ProductDetails}/>
    </Stack.Navigator>
  );
}

export default ProductScreen;
