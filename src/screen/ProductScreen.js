import ProductDetails from '../components/ProductDetails.js';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ShopScreen from '../components/ShopScreen.js';

const Stack = createStackNavigator();

function ProductScreen() {
  return (
    <Stack.Navigator initialRouteName="Products">
      <Stack.Screen
        name="Products"
        component={ShopScreen}
        options={{
          headerStyle: {
            backgroundColor: '#0f20d9',
          },
          headerTintColor: '#fff',
        }}
      />
      <Stack.Screen
        name="Details"
        options={{
          headerStyle: {
            backgroundColor: '#0f20d9',
          },
          headerTintColor: '#fff',
        }}
        component={ProductDetails}/>
    </Stack.Navigator>
  );
}

export default ProductScreen;
