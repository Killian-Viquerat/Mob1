import React, {useEffect,useState} from 'react';
import {View, Alert,Text, StyleSheet,FlatList, Dimensions, Image,Button, TextInput, TouchableOpacity} from 'react-native';
import {StockContainer,UserContainer} from '../containers/index.js';
import {Picker} from '@react-native-community/picker';
import axios from 'axios';
import {apiUrl} from '../../app.json';

const styles = StyleSheet.create({

    container:{
        backgroundColor:"lightgrey"
    },
    titleView:{
        height:"30%"
    },
    title:{
        textAlign:"center",
        fontSize:40,
        borderBottomColor:"white",
        color:"white",
        borderBottomWidth:2,
        marginRight:"10%",
        marginLeft:"10%",
        paddingTop:"5%",
    },
    ImageProduct:{
        borderColor:"black",
        borderWidth:3,
        height:180,
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
        height:40,
        marginLeft:10,
        marginRight:10,
        textAlign:"center",
        color:"black"
    },
    resumetext:{    
        alignItems: "center",
        textAlign:"center",
    },
    boutonresume:{
        height:25,
        width:100,
        backgroundColor:"white",
        borderColor:"black",
        borderWidth:1,
        alignItems: "center",
        marginRight:10,
    },
    boutonview:{
        display:"flex",
        flexDirection: "row",
        marginLeft:"20%",
        marginRight:"20%",
    }
  });

function StockDetails({navigation}) {
    const stockContainer = StockContainer.useContainer();
    const userContainer = UserContainer.useContainer();
    const [productList, setProductList] = useState([]);
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        getProductList();
    },[stockContainer.stock]);
    
    async function getProductList(){
        var res = await axios.get('/api/products', {
            headers: {Authorization: 'Bearer ' + userContainer.tokken},
          })
          var products = res.data.data
        let newProductList = products.filter(product => {
          return !stockContainer.stock.find(({ id }) => product.id == id)
        })
        setProductList(newProductList)
    }

    function nextProduct(){
        if(productList.length > 0 && current != productList.length-1){
            index = current
            index += 1
            setCurrent(index)
        }else if(current == productList.length-1){
            setCurrent(0)
        }
    }

    function prevProduct(){
        if(productList.length > 0 && current != 0){
            index = current
            index -= 1
            setCurrent(index)
        }else if(current == 0){
            setCurrent(productList.length-1)
        }
    }

    function changeStockProduct(number){
        var index = current
        let tmpproductList = productList
        let tmpproduct = productList[current]
        tmpproduct.stock = number;
        tmpproductList[index] = tmpproduct;
        console.log(tmpproductList)
        setProductList(tmpproductList);
    }

    function confirmProduct(){
        stockContainer.addProduct(productList[current])
        if(current>=productList.length-1){
            setCurrent(0);
        }
    }

    function deleteStock(){
        stockContainer.deleteStock()
        setCurrent(0);
    }

    function sendStock(){
        var newStock = []
        stockContainer.stock.forEach(function(element){
            newStock.push({"id":element.id,"quantity":element.stock})
        });
        var data = {"quantities":newStock};
        axios
          .post('/api/products/stock', data,{
            headers: {Authorization: 'Bearer ' + userContainer.tokken},
          })
          .then(res => {
            Alert.alert('Les quantités ont été enregistrées')
          })
          .catch(error => Alert.alert('Une erreur s\'est produite'))
    }
    return (
        <View style={styles.container}>
            <View style={styles.titleView}>
                <Text style={styles.title}>Validation du stock</Text>
            </View>
            {productList[current] ? (  
            <View>
                <View>
                    <Image
                        style={styles.ImageProduct}
                        source={{
                          uri: apiUrl+'/storage/pictures/'+productList[current].picture,
                        }}
                    />
                </View>
                <View style={styles.boutonView}>
                    <TouchableOpacity
                        style={styles.bouton}
                        onPress={() => prevProduct()}
                    >
                        <Text style={{color:"black"}}>{'<'}</Text>
                    </TouchableOpacity>
                    <Text style={{color:"black"}}>{productList[current].name}</Text>
                    <TouchableOpacity
                        style={styles.bouton}
                        onPress={() => nextProduct()}
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
                    value={productList[current].stock.toString()}
                    onChangeText={number => changeStockProduct(number)}
                    />
                    <Text>{productList[current].unit}</Text>
                    <TouchableOpacity
                        style={styles.bouton}
                        onPress={() => confirmProduct()}
                    >
                        <Text style={{color:"black"}}>Ok</Text>
                    </TouchableOpacity>
                </View>
            </View>
            ) : null }
            {productList.length <= 0 && stockContainer.stock.length >0 ? (
                <View style={styles.resume}>
                    <View style={styles.boutonview}>
                        <TouchableOpacity
                            style={styles.boutonresume}
                            onPress={() => deleteStock()}
                        >
                            <Text style={{color:"black"}}>Recommencer</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.boutonresume}
                            onPress={() => sendStock()}
                        >
                            <Text style={{color:"black"}}>Enregistrer</Text>
                        </TouchableOpacity>
                    </View>
                    <FlatList
                        data={stockContainer.stock}
                        style={{
                          height: (Dimensions.get('window').height *0.56),
                        }}
                        renderItem={({item}) => (
                            <View style={styles.resumetext}>
                                <Text>{item.name}:{item.stock}{item.unit}</Text>
                            </View>
                        )}
                        keyExtractor={item => String(item.id)}
                     />
                </View>
            ) : null}
        </View>
      );
}

export default StockDetails;