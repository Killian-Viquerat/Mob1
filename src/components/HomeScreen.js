import React from 'react';
import {View, Text} from 'react-native';
import {Header} from 'react-native-elements';

function HomeScreen() {
  return (
    <View>
      <Header
        centerComponent={{text: 'Home', style: {color: '#fff', fontSize:16, fontWeight:'bold'}}}
        leftComponent={{icon: 'home', color: '#fff'}}
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
    </View>
  );
}
export default HomeScreen;
