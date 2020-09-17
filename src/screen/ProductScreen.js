import ProductDetails from '../components/ProductDetails.js';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';
import ShopScreen from '../components/ShopScreen.js';

const Stack = createStackNavigator();

function ProductScreen() {
  return (
    <Stack.Navigator initialRouteName="List" screenOptions={{headerShown: false}}>
      
      <Stack.Screen
        name="List"
        component={ShopScreen}
      />
      <Stack.Screen
        name="Details"
        component={ProductDetails}/>
    </Stack.Navigator>
  );
}

export default ProductScreen;
