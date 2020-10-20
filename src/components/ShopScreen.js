import React, {useState, useEffect} from 'react';
import {View, FlatList, RefreshControl, Text, Dimensions } from 'react-native';
import {ListItem} from 'react-native-elements';
import {UserContainer} from '../containers/index.js';
import axios from 'axios';
import {apiUrl} from '../../app.json';

function ShopScreen({navigation}) {
  const [data, setData] = useState([]);
  const userContainer = UserContainer.useContainer();
  const [refreshing, setRefreshing] = React.useState(true);

  useEffect(() => {
    onRefresh()
  }, [userContainer]);

  async function onRefresh(){
    setRefreshing(true)
    try{
      var res = await axios.get('/api/products', {
        headers: {Authorization: 'Bearer ' + userContainer.tokken},
      })
      setData(res.data.data);
    }
    catch{
      setData([])
    }
    finally{
      setRefreshing(false)
    }
  }

  return (
    <View>
      <FlatList
        data={data}
        ListEmptyComponent={
          <View style={{
              flex: 1,
              height: Dimensions.get('window').height,
          }}>
              <Text style={{color:"#0f20d9",textAlign:"center",fontWeight:"bold",marginTop:"50%"}}>Veuillez tirer vers le bas pour raffraîchir la page</Text>                            
          </View>
        }
        renderItem={({item}) => (
          <ListItem 
            bottomDivider
            title={item.name}
            subtitle={`stock: ${item.stock}, prix: ${item.price} CHF, Mis à jour: ${new Date(item.updated_at).toLocaleDateString()}`}
            leftAvatar={{source: {uri:apiUrl+'/storage/pictures/'+item.picture}}}
            onPress={() => {
              navigation.navigate('Details', {id: item.id});
            }}
          />
        )}
        keyExtractor={item => String(item.id)}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </View>
  );
}

export default ShopScreen;
