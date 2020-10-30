import React, {useState, useEffect, Fragment} from 'react';
import {Text, View, ScrollView,TouchableOpacity } from 'react-native';
import {Card, Button, Icon, Header} from 'react-native-elements';
import {UserContainer} from '../containers/index.js';
import {BasketContainer} from '../containers/index.js';
import Ionicons from 'react-native-vector-icons/FontAwesome5';
import axios from 'axios';
import {apiUrl} from '../../app.json';

function ProductDetails({route}) {
  const {id} = route.params;
  const [data, setData] = useState(null);
  const userContainer = UserContainer.useContainer();
  const basketContainer = BasketContainer.useContainer();
  useEffect(() => {
    axios
      .get('/api/products/' + id, {
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
      <ScrollView>
        <Card title={data.name} image={{uri:apiUrl+'/storage/pictures/'+data.picture}}>
          <Text style={{marginBottom: 10}}>{data.details}</Text>
          <Text style={{marginBottom: 10}}>{`stock: ${data.stock}, prix: ${data.price} CHF`}</Text>
          <TouchableOpacity
          style={{backgroundColor:"#0f20d9",width:"15%",marginLeft:"80%",borderRadius:20,alignItems: "center"}}
          onPress={() => basketContainer.addProduct(data)}
          >
            <Ionicons name="cart-plus" color="white" size={24} />
          </TouchableOpacity>
        </Card>
        {data.suppliers.length ? (
          <Card title="Fournisseurs">
            {
              data.suppliers.map((supplier, i) => {
                return (
                  <View key={i} style={{borderBottomColor:"gray",borderBottomWidth:1,padding:5}}>
                    <Text>{`Nom: ${supplier.company_name}`}</Text>
                    <Text>{`Ville: ${supplier.city}`}</Text>
                  </View>
                );
              })
            }
          </Card>
        ) : null}
      </ScrollView>
      ) : null}
    </View>
  );
}
export default ProductDetails;
