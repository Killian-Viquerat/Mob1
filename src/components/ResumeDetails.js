import React, {useEffect,useState} from 'react';
import {View, Text, StyleSheet,FlatList, Dimensions, Image,Button, TextInput, TouchableOpacity} from 'react-native';
import {BasketContainer,UserContainer} from '../containers/index.js';
import axios from 'axios';
import {apiUrl} from '../../app.json';

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
  },
});

function ResumeDetails({navigation}) {
  const basketContainer = BasketContainer.useContainer();
  const userContainer = UserContainer.useContainer();
  useEffect(() => {

  },[]);
  return (
    <View style={styles.container}>
      
    </View>
  );
}
export default ResumeDetails;
