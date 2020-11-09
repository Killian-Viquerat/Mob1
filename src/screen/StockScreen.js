import StockDetails from '../components/StockDetails.js';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';

const Stack = createStackNavigator();

function StockScreen() {
  return (
    <Stack.Navigator initialRouteName="Stock">
      <Stack.Screen
        name={`Stock`}
        component={StockDetails}
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

export default StockScreen;
