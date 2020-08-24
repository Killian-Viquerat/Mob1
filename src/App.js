import 'react-native-gesture-handler';
import Router from './Router.js';
import {UserContainer} from './containers';
import React from 'react';

export default function App() {
  return (
    <UserContainer.Provider>
      <Router />
    </UserContainer.Provider>
  );
}
