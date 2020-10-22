import BasketDetails from '../components/BasketDetails.js';
import ResumeDetails from '../components/ResumeDetails.js';
import PayementDetails from '../components/PayementDetails.js';
import {createStackNavigator} from '@react-navigation/stack';
import React, {useEffect} from 'react';
import {TouchableOpacity,Text} from 'react-native';
import {BasketContainer} from '../containers/index.js';
import Ionicons from 'react-native-vector-icons/FontAwesome5';

const Stack = createStackNavigator();

function ProfileScreen() {
  const basketContainer = BasketContainer.useContainer();
  useEffect(() => {
    basketContainer.restoreBasket();
  },[]);
  return (
    <Stack.Navigator initialRouteName="Panier">
      <Stack.Screen
        name={`Panier`}
        component={BasketDetails}
        options={{
          headerRight: () => (
            <TouchableOpacity
              style={{right:10,padding: 5,width:40,alignItems: "center"}}
              onPress={() => basketContainer.deleteBasket()}
            >
              <Ionicons name="trash" color="black" size={24} />
            </TouchableOpacity>
          ),
          headerStyle: {
            backgroundColor: '#0f20d9',
          },
          headerTintColor: '#fff',      
        }}
      />
      <Stack.Screen
        name="Résumé"
        component={ResumeDetails}
        options={{
          headerStyle: {
            backgroundColor: '#0f20d9',
          },
          headerTintColor: '#fff',      
        }}
      />
       <Stack.Screen
        name="Payer"
        component={PayementDetails}
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
