import React, {useState, useEffect, Fragment} from 'react';
import {Text, View} from 'react-native';
import {Card, Button, Icon, Header} from 'react-native-elements';
import {UserContainer} from '../containers/index.js';
import axios from 'axios';

function ProductDetails({route}) {
  const {id} = route.params;
  const [data, setData] = useState(null);
  const userContainer = UserContainer.useContainer();
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
      <Header
        centerComponent={{
          text: 'Détails du produit',
          style: {color: '#fff', fontSize: 16, fontWeight: 'bold'},
        }}
        leftComponent={{icon: 'arrow-left', color: '#fff'}}
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
      />
      {data ? (
      <React.Fragment>
        <Card title={data.name} image={{uri:'http://10.229.33.55:8000/storage/pictures/'+data.picture}}>
          <Text style={{marginBottom: 10}}>{data.details}</Text>
          <Text style={{marginBottom: 10}}>{`stock: ${data.stock}, prix: ${data.price} CHF`}</Text>
          <Button
            buttonStyle={{borderRadius: 0, marginLeft: 0, marginRight: 0, marginBottom: 0}}
            title="Ajouter au panier"
          />
        </Card>
        {data.suppliers.length ? (
          <Card title="Fournisseurs">
            {
              data.suppliers.map((supplier, i) => {
                return (
                  <View key={i}>
                    <Text>{`Nom: ${supplier.company_name}`}</Text>
                    <Text>{`Ville: ${supplier.city}`}</Text>
                  </View>
                );
              })
            }
          </Card>
        ) : null}
      </React.Fragment>
      ) : null}
    </View>
  );
}
export default ProductDetails;
