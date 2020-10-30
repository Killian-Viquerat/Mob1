import 'react-native-gesture-handler';
import Router from './Router.js';
import {UserContainer,BasketContainer} from './containers';
import React from 'react';

console.disableYellowBox = true;

export default function App() {
  return (
    <UserContainer.Provider>
        <BasketContainer.Provider>
          <Router/>
        </BasketContainer.Provider>
    </UserContainer.Provider>
  );
}
