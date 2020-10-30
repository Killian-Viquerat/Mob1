import React, {useState, useEffect} from 'react';
import {View, Button} from 'react-native';
import {Card, Text} from 'react-native-elements';
import {UserContainer} from '../containers/index.js';
import axios from 'axios';

function ProfileScreen() {
  const userContainer = UserContainer.useContainer();
  const [user, setUser] = useState(0);
  const [balance, setBalance] = useState(0);
  useEffect(() => {
    axios
      .get('/api/me', {
        headers: {Authorization: 'Bearer ' + userContainer.tokken},
      })
      .then(response => {
        setUser(response.data.data);
      })
      .catch(error => console.log(error));
    axios
      .get('/api/me/balance', {
        headers: {Authorization: 'Bearer ' + userContainer.tokken},
      })
      .then(response => {
        setBalance(response.data);
      })
      .catch(error => console.log(error));
  }, [userContainer]);

  clearAsyncStorage = async () => {
    userContainer.deleteToken();
    userContainer.refreshTokken();
  };
  return (
    <View>
      {user || balance ? (
      <React.Fragment>
        <Card title="User information" containerStyle={{marginBottom: 10}}>
          <View key={user.id}>
            <Text>{'Firstname: ' + user.firstname}</Text>
            <Text>{'Lastname: ' + user.lastname}</Text>
          </View>
        </Card>
        <Card title="Balance" containerStyle={{marginBottom: 10}}>
          <View>
            <Text>{'Debit: ' + balance.debit}</Text>
            <Text>{'Credit: ' + balance.credit}</Text>
          </View>
        </Card>
      </React.Fragment>
      ) : null}
      <Button onPress={()=>clearAsyncStorage()} title="Logout" color="#0f20d9" />
    </View>
  );
}

export default ProfileScreen;
