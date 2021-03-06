import React, {useEffect,useState} from 'react';
import {View, Text, StyleSheet,FlatList, Dimensions, Image,Button, TextInput, TouchableOpacity} from 'react-native';
import {BasketContainer,UserContainer} from '../containers/index.js';
import axios from 'axios';
import {apiUrl} from '../../app.json';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
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
    width:100,
    height:40,
    top:40,
    left:250,
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
  entrepriseTitle:{
    backgroundColor:"lightgray",
    borderBottomColor:"black",
    borderBottomWidth: 1,
    paddingTop:5,
    paddingBottom:10,
  },
  payer: {
    backgroundColor:"lightgreen",
    padding: 5,
    width:"100%",
    alignItems: "center",
  }
});

function ResumeDetails({route}) {
  const {price} = route.params;
  const basketContainer = BasketContainer.useContainer();
  const userContainer = UserContainer.useContainer();
  useEffect(() => {

  },[]);
  return (
    <View style={styles.container}>
    <View style={styles.entrepriseTitle}>
        <Text style={{textAlign:"center",fontSize:25, color:"black"}}>Vedjiz Entreprise</Text>
        <Text style={{textAlign:"center",fontSize:15, color:"grey"}}>Information receipt</Text>
    </View>
      <FlatList
        data={basketContainer.basket}
        style={{
          height: (Dimensions.get('window').height *0.56),
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
            <View style={styles.input}>
              <Text>{`Quantité: ${item.quantity}`} </Text>
            </View>
        </View>
        )}
        keyExtractor={item => String(item.id)}
      />
      <View style={styles.price}>
        <Text style={{textAlign:"center",fontSize:18, color:"green"}}>{`${price} CHF`}</Text>
      </View>
      <TouchableOpacity
        style={styles.payer}
        onPress={() => console.log("cc")/*navigation.navigate('Résumé',{price: price})*/}
      >
        <Text style={{color:"black"}}>Payer</Text>
      </TouchableOpacity>
    </View>
    
  );
}
export default ResumeDetails;
