import React, {useEffect,useState} from 'react';
import {View, Text, StyleSheet,FlatList, Dimensions, Image,Button, TextInput, TouchableOpacity} from 'react-native';
import {BasketContainer,UserContainer} from '../containers/index.js';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import {apiUrl} from '../../app.json';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
  picker: {
    backgroundColor: 'lightgrey',
    height: 30, 
    width: "90%",
    marginTop:10,
    marginRight:"5%",
    marginLeft:"5%",
  },
  Card: {
    marginLeft: 'auto',
    marginRight:'auto',
    width: "100%",
    height: 100,
    backgroundColor: 'white',
    borderBottomColor: "lightgrey",
    borderBottomWidth: 1,
  },
  topCard:{
    display: 'flex',
    flexDirection: "row",
    justifyContent:'flex-start',
    height: 100,
    padding: 5,
    paddingTop:25,
  },
  ImageCard: {
    width: 50,
    height: 50,
  },
  TitleCard: {
    marginTop: 5,
    marginLeft: 5,
    fontSize: 20,
  },
  informationCard:{
    position:'absolute',
    top: 55,
    left: 62,
    display: 'flex',
    flexDirection: "row",
  },
  button:{
    position:"absolute",
    width:40,
    top:"35%",
    left: "88%",
  },
  input:{
    position:"absolute",
    backgroundColor:"white",
    borderBottomColor:"black",
    borderBottomWidth:1,
    width:50,
    height:40,
    top:30,
    left:210,
    textAlign:"center"
  },
  price:{
    color:"black",
    height:30,
    borderBottomColor:"lightgrey",
    borderBottomWidth:1,
    backgroundColor:"lightgrey",
    paddingTop:3
  },
  validation: {
    backgroundColor:"lightgreen",
    padding: 5,
    width:"90%",
    alignItems: "center",
    marginRight:"5%",
    marginLeft:"5%",
    marginTop: 5,
  }
});

function BasketDetails({navigation}) {
  const basketContainer = BasketContainer.useContainer();
  const userContainer = UserContainer.useContainer();
  const [productList, setProductList] = useState([]);
  const [price, setPrice] = useState(0);
  const [validate, setValidate] = useState(false);

  useEffect(() => {
    getProductList();
    calculatePrice();
    validateBasket();
  },[basketContainer.basket]);

  async function getProductList(){
    var res = await axios.get('/api/products', {
        headers: {Authorization: 'Bearer ' + userContainer.tokken},
      })
      var products = res.data.data
    let newProductList = products.filter(product => {
      return !basketContainer.basket.find(({ id }) => product.id == id)
    })
    setProductList(newProductList)
  }

  function calculatePrice()
  {
    var newPrice = 0;
    basketContainer.basket.forEach(product =>{
      newPrice+=(product.quantity * product.price)
    })
    setPrice(newPrice.toFixed(2));
  }
  function validateBasket()
  {
    setValidate(false)
    if(basketContainer.basket.length){
      setValidate(true)
    }
    basketContainer.basket.forEach(product=>{
       if(product.quantity <= 0){
        setValidate(false)
       }
    })
  }
  return (
    <View style={styles.container}>
      <View style={styles.price}>
        <Text style={{textAlign:"center",fontSize:18, color:"green"}}>{`${price} CHF`}</Text>
      </View>
      <FlatList
        data={basketContainer.basket}
        style={{
          height: (Dimensions.get('window').height *0.64),
        }}
        renderItem={({item}) => (
        <View style={styles.Card}>
            <View style={styles.topCard}>
              <Image
                style={styles.ImageCard}
                source={{
                  uri: apiUrl+'/storage/pictures/'+item.picture,
                }}
              />
              <Text style={styles.TitleCard}>{item.name}</Text>
            </View>
            <View style={styles.informationCard}>
              <Text>{`${item.price} CHF`} </Text>
              <Text>{item.unit}</Text>
            </View>
            <TextInput
              style={styles.input}
              placeholderTextColor="rgb(180, 180, 180)"
              keyboardType="numeric"
              value={item.quantity.toString()}
              onChangeText={text => basketContainer.changeQuantityProduct(text,item)}
            />
            <View style={styles.button}>
              <Button
                onPress={() => basketContainer.deleteProductBasket(item)}
                title="X"
                color="darkred"
              />
            </View>
        </View>
        )}
        keyExtractor={item => String(item.id)}
      />
      <View style={{borderTopColor:"gray", borderTopWidth:1}}>
      {productList.length ? (  
        <Picker
          selectedValue={"-1"}
          style={styles.picker}
          onValueChange={(itemValue, itemIndex) => {
              basketContainer.addProduct(productList[itemValue]);
            } 
          }
        >
          <Picker.Item label="Séléctionner un produit" value="-1" />
          {
            productList.map((product, i) => {
              return (
                <Picker.Item key={i} label={product.name} value={i} />
              );
            })
          }
        </Picker>
        ) : null}
      <TouchableOpacity
        style={styles.validation}
        onPress={() => navigation.navigate('Résumé')}
        disabled={!validate}
      >
        <Text style={{color:"black"}}>Valider le panier</Text>
      </TouchableOpacity>
      </View>
    </View>
  );
}
export default BasketDetails;
