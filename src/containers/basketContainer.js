import {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
export function useBasketContainer(){
    let [basket, setBasket] = useState([]);

    function addProduct(product) {
      if(!basket.find(({id}) => id == product.id))
      {
        product.quantity=1;
        var newBasket =[...basket, product]
        setBasket(newBasket)
        storeBasket(newBasket)
      }
    }

    function changeQuantityProduct(number,product){
      if(number < 0){
        number=1;
      }
      var index = basket.findIndex(({id}) => id == product.id)
      let tmpbasket = [...basket];
      let tmpproduct = {...tmpbasket[index]};
      tmpproduct.quantity = number;
      tmpbasket[index] = tmpproduct;
      setBasket(tmpbasket);
      storeBasket(tmpbasket)
    }

    function deleteBasket(){
      setBasket([])
      storeBasket([])
    }

    function deleteProductBasket(product){
      var newBasket=basket.filter(({id}) => id != product.id)
      setBasket(newBasket)
      storeBasket(newBasket)
    } 

    async function storeBasket(storebasket){
      AsyncStorage.setItem('basket', JSON.stringify(storebasket));
    }

    async function restoreBasket(){
      var value = await AsyncStorage.getItem('basket');
      if(!value){
        value=[]
      }
      setBasket(JSON.parse(value))
    }
    
    return {basket, setBasket, addProduct, deleteBasket,deleteProductBasket,changeQuantityProduct,restoreBasket};
}
