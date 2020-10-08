import ProfileDetails from '../components/ProfileDetails.js';
import {createStackNavigator} from '@react-navigation/stack';
import React from 'react';

const Stack = createStackNavigator();

function ProfileScreen() {
  return (
    <Stack.Navigator initialRouteName="Profile">
      <Stack.Screen
        name="Profile"
        component={ProfileDetails}
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
