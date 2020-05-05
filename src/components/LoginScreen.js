import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
} from 'react-native';
import {Formik} from 'formik';
import axios from 'axios';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    borderWidth: 1,
    borderBottomColor: 'grey',
    backgroundColor: 'lightgrey',
    marginRight: 10,
    marginLeft: 10,
  },
  text: {
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
  },
  bouton: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

function LoginScreen({navigation}) {
  return (
    <Formik
      initialValues={{token: 'aeh4tliZpArVXkfRbyyHEcUU6bN2DNoJwkRShYKn0rhkKm5XMsmGHVddRRs2'}}
      onSubmit={values =>
        axios
          .get('http://192.168.1.44:8000/api/me', {
            headers: {Authorization: 'Bearer ' + values.token},
          })
          .then(res => {
            console.log(res.data);
            storeData = async () => {
              try {
                await AsyncStorage.setItem('@token', values.token);
              } catch (e) {
                // saving error
              }
            };
          })
          .catch(error => console.log(error), console.log(values))
      }>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.text}>Token</Text>
            <TextInput
              style={styles.form}
              onChangeText={handleChange('token')}
              onBlur={handleBlur('token')}
              placeholder="Enter token"
              secureTextEntry
              value={values.token}
            />
            <View style={styles.bouton}>
              <Button onPress={handleSubmit} title="Login" />
            </View>
            <View style={styles.bouton}>
              <Button
                title="Not a account yet? create one..."
                onPress={() => navigation.navigate('Register')}
              />
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}

export default LoginScreen;
