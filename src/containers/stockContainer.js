import {useState} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import axios from 'axios';
export function useStockContainer(){
    let [stock, setStock] = useState([]);

    function addProduct(product,quantity) {
      if(!stock.find(({id}) => id == product.id))
      {
        var newStock =[...stock, product]
        setStock(newStock)
      }
    }

    function deleteStock(){
        setStock([])
    }
    
    return {stock, setStock, addProduct, deleteStock};
}
