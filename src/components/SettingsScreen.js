import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import {Header, Card, Text} from 'react-native-elements';
import {UserContainer} from '../containers/index.js';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';

function SettingsScreen() {
  const userContainer = UserContainer.useContainer();
  const [data, setData] = useState(null);
  useEffect(() => {
    axios
      .get('http://192.168.1.44:8000/api/me', {
        headers: {Authorization: 'Bearer ' + userContainer.tokken},
      })
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => console.log(error));
  }, [userContainer]);

  clearAsyncStorage = async () => {
    AsyncStorage.clear();
    userContainer.refreshTokken();
  };
  return (
    <View>
      <Header
        centerComponent={{
          text: 'Settings',
          style: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
        }}
        leftComponent={{icon: 'home', color: '#fff'}}
        barStyle="light-content"
        statusBarProps={{
          barStyle: 'light-content',
          translucent: true,
          backgroundColor: 'transparent',
        }}
      />
      {data ? (
        <Card title="User information" containerStyle={{marginBottom: 10}}>
          <View key={data.id}>
            <Text>{'Firstname: ' + data.firstname}</Text>
            <Text>{'Lastname: ' + data.lastname}</Text>
          </View>
        </Card>
      ) : null}
      <Button onPress={this.clearAsyncStorage} title="Logout" />
    </View>
  );
}

export default SettingsScreen;
