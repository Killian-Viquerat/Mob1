import React, {useEffect,useState} from 'react';
import {View, Text, StyleSheet,FlatList, Dimensions, Image,Button, TextInput, TouchableOpacity} from 'react-native';
import {BasketContainer,UserContainer} from '../containers/index.js';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import {apiUrl} from '../../app.json';

const styles = StyleSheet.create({

    container:{
        backgroundColor:"lightgrey"
    },
    titleView:{
        height:"40%"
    },
    title:{
        textAlign:"center",
        fontSize:40,
        borderBottomColor:"white",
        color:"white",
        borderBottomWidth:2,
        marginRight:"10%",
        marginLeft:"10%",
        paddingTop:"10%",
    },
    ImageProduct:{
        borderColor:"black",
        borderWidth:3,
        height:200,
        width:"80%",
        marginLeft:"10%",

    },
    boutonView:{
        marginTop:10,
        display:"flex",
        flexDirection: "row",
        marginRight:"20%",
        marginLeft:"20%",
    },
    bouton:{
        height:25,
        width:30,
        backgroundColor:"white",
        borderColor:"black",
        borderWidth:1,
        textAlign:"center",
        marginRight:15,
        marginLeft:15,
        alignItems: "center",
    },
    bottomView:{
        marginTop:10,
        display:"flex",
        flexDirection: "row",
        marginRight:"20%",
        marginLeft:"20%",
    },
    input:{
        backgroundColor:"white",
        borderColor:"black",
        borderWidth:1,
        width:50,
        height:10,
        textAlign:"center",
    }
  });

function StockDetails() {
    var item = "asparagus.png";
    var product = "asperges";
    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Validation du stock</Text>
            </View>
            <View>
                <Image
                    style={styles.ImageProduct}
                    source={{
                      uri: apiUrl+'/storage/pictures/'+item,
                    }}
                />
            </View>
            <View style={styles.boutonView}>
                <TouchableOpacity
                    style={styles.bouton}
                    onPress={() => console.log("cc")}
                >
                    <Text style={{color:"black"}}>{'<'}</Text>
                </TouchableOpacity>
                <Text style={{color:"black"}}>{product}</Text>
                <TouchableOpacity
                    style={styles.bouton}
                    onPress={() => console.log("cc")}
                >
                    <Text style={{color:"black"}}>{'>'}</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.bottomView}>
                <Text>Stock:</Text>
                <TextInput
                style={styles.input}
                placeholderTextColor="rgb(180, 180, 180)"
                keyboardType="numeric"
                value={1}
                onChangeText={number => basketContainer.changeQuantityProduct(number,item)}
                />
                <Text></Text>
                <TouchableOpacity
                    style={styles.bouton}
                    onPress={() => console.log("cc")}
                >
                    <Text style={{color:"black"}}>Ok</Text>
                </TouchableOpacity>
            </View>
        </View>
      );
}

export default StockDetails;