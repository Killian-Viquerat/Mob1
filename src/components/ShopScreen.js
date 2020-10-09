import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {ListItem} from 'react-native-elements';
import {UserContainer} from '../containers/index.js';
import axios from 'axios';

function ShopScreen({navigation}) {
  const [data, setData] = useState(null);
  const userContainer = UserContainer.useContainer();
  useEffect(() => {
    axios
      .get('/api/products', {
        headers: {Authorization: 'Bearer ' + userContainer.tokken},
      })
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => console.log(error));
  }, [userContainer]);

  return (
    <View>
      {/* <Header
        centerComponent={{
          text: 'Shop',
          style: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
        }}
        leftComponent={{icon: 'home', color: '#fff'}}
        barStyle="light-content"
        statusBarProps={{
          barStyle: 'light-content',
          translucent: true,
          backgroundColor: 'transparent',
        }}
        containerStyle={{
          backgroundColor: '#0f20d9',
          justifyContent: 'space-around',
        }}
      /> */}
      {data ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <ListItem 
              bottomDivider
              title={item.name}
              subtitle={`stock: ${item.stock}, prix: ${item.price} CHF`}
              leftAvatar={{source: {uri:'http://10.229.33.55:8000/storage/pictures/'+item.picture}}}
              onPress={() => {
                navigation.navigate('Details', {id: item.id});
              }}
            />
          )}
          keyExtractor={item => String(item.id)}
        />
      ) : null}
    </View>
  );
}

export default ShopScreen;
