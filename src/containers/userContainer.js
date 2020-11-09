import {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

export function useUserContainer() {
  let [tokken, setTokken] = useState('');
  let [access, setAccess] = useState(0);

  async function refreshTokken() {
    let value = await AsyncStorage.getItem('token');
    if (value) {
      setTokken(value);
      this.getaccess();
      return;
    }
    setTokken(false);
  }

  async function login(values) {
    axios
      .get('/api/me', {
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
  async function getaccess(){
    var res = await axios.get('/api/me', {
      headers: {Authorization: 'Bearer ' + tokken},
    })
    setAccess(res.data.data.user_type);
  }
  function deleteToken(){
    AsyncStorage.setItem('token','');
  }
  return {tokken, setTokken,access,setAccess,getaccess, refreshTokken, login,deleteToken};
}
