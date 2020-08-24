import {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export function useUserContainer() {
  let [tokken, setTokken] = useState('');

  async function refreshTokken() {
    let value = await AsyncStorage.getItem('token');
    if (value) {
      setTokken(value);
      return;
    }
    setTokken(false);
  }

  async function login(values) {
    axios
      .get('http://192.168.1.44:8000/api/me', {
        headers: {Authorization: 'Bearer ' + values.token},
      })
      .then(async () => {
        try {
          await AsyncStorage.setItem('token', values.token);
          this.refreshTokken();
        } catch (e) {}
      })
      .catch(error => console.log(error));
  }
  return {tokken, setTokken, refreshTokken, login};
}
