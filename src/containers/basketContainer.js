import {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';

export function useBasketContainer() {
  let [basket, setBasket] = useState('');

  async function addProduct(product) {
    basket.push(product)
    try {
      await AsyncStorage.setItem('basket', basket);
    } catch (e) {}
  }
  return {basket, setBasket, addProduct};
}
