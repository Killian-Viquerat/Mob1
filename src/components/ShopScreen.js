import React, {useState, useEffect} from 'react';
import {View, FlatList} from 'react-native';
import {Header, ListItem} from 'react-native-elements';
import {UserContainer} from '../containers/index.js';
import axios from 'axios';

function ShopScreen({navigation}) {
  const [data, setData] = useState(null);
  const userContainer = UserContainer.useContainer();
  useEffect(() => {
    axios
      .get('http://192.168.1.44:8000/api/products', {
        headers: {Authorization: 'Bearer ' + userContainer.tokken},
      })
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => console.log(error));
  }, [userContainer]);

  return (
    <View>
      {data ? (
        <FlatList
          data={data}
          renderItem={({item}) => (
            <ListItem
              title={item.name}
              subtitle={`stock: ${item.stock}, prix: ${item.price} CHF`}
              leftAvatar={{source: {uri:'http://192.168.1.44:8000/storage/pictures/'+item.picture}}}
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
