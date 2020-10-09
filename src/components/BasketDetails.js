import React from 'react';
import {View, Text, StyleSheet,FlatList} from 'react-native';
import {ListItem, Avatar} from 'react-native-elements';
import {BasketContainer} from '../containers/index.js';
import {Picker} from '@react-native-community/picker';

const styles = StyleSheet.create({
  picker: {
    backgroundColor: 'lightgrey',
    height: "10%", 
    width: "100%",
  }
});

const DATA = [
  {
    id: '1',
    name: 'carrot',
    number: '3',
    url:""
  },
  {
    id: '2',
    name:'tomate',
    number: '1',
    url:""
  },
  {
    id: '3',
    name:'abricot',
    number: '2',
    url:""
  }
]

function BasketDetails() {
  const basketContainer = BasketContainer.useContainer();
  state = {
    language: 'java',
  };
  return (
    <View>
      <FlatList
          data={DATA}
          renderItem={({item}) => {
            <ListItem 
              bottomDivider
              title={item.name}
              subtitle={`Nombre: ${item.number}`}
              leftAvatar={{source: {uri:'http://10.229.33.55:8000/storage/pictures/'+item.url}}}
            />
          }}
          keyExtractor={item => String(item.id)}
        />
      <Picker
        selectedValue={this.state.language}
        style={styles.picker}
        onValueChange={(itemValue, itemIndex) =>
          this.setState({language: itemValue})
        }>
        <Picker.Item label="Java" value="java" />
        <Picker.Item label="JavaScript" value="js" />
      </Picker>
    </View>
  );
}
export default BasketDetails;
