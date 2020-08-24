import React, {useState, useEffect} from 'react';
import {Text, View} from 'react-native';
import {Card, Button, Icon} from 'react-native-elements';
import {UserContainer} from '../containers/index.js';
import axios from 'axios';

function ProductDetails({route}) {
  const {id} = route.params;
  const [data, setData] = useState(null);
  const userContainer = UserContainer.useContainer();
  useEffect(() => {
    axios
      .get('http://192.168.1.44:8000/api/products/' + id, {
        headers: {Authorization: 'Bearer ' + userContainer.tokken},
      })
      .then(response => {
        setData(response.data.data);
      })
      .catch(error => console.log(error));
  }, [userContainer, id]);
  return (
    <View>
      {data ? (
        <Card title={data.name} image={{uri:'http://192.168.1.44:8000/storage/pictures/'+data.picture}}>
          <Text style={{marginBottom: 10}}>{data.details}</Text>
          <Text style={{marginBottom: 10}}>{`stock: ${data.stock}, prix: ${data.price} CHF`}</Text>
          <Button
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title="Ajouter au panier"
          />
        </Card>
      ) : null}
    </View>
  );
}
export default ProductDetails;
