import 'react-native-gesture-handler';
import Router from './Router.js';
import {UserContainer,BasketContainer,StockContainer} from './containers';
import React from 'react';

console.disableYellowBox = true;

export default function App() {
  return (
    <UserContainer.Provider>
        <BasketContainer.Provider>
          <StockContainer.Provider>
            <Router/>
          </StockContainer.Provider>
        </BasketContainer.Provider>
    </UserContainer.Provider>
  );
}
