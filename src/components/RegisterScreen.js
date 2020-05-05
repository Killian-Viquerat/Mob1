import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
} from 'react-native';
import axios from 'axios';
import {Formik} from 'formik';

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

function RegisterScreen() {
  return (
    <Formik
      initialValues={{firstname: '', lastname: '', phonenumber: ''}}
      onSubmit={values =>
        axios
          .post('http://192.168.1.44:8000/api/user/apply', values)
          .then(res => {
            console.log(res);
            console.log(res.data);
          })
          .catch(error => console.log(error), console.log(values))
      }>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.text}>Prénom</Text>
            <TextInput
              style={styles.form}
              onChangeText={handleChange('firstname')}
              onBlur={handleBlur('firstname')}
              placeholder="Enter prénom"
              value={values.firstname}
            />
            <Text style={styles.text}>Nom</Text>
            <TextInput
              style={styles.form}
              onChangeText={handleChange('lastname')}
              onBlur={handleBlur('lastname')}
              placeholder="Enter nom"
              value={values.lastname}
            />
            <Text style={styles.text}>Numéro de téléphone</Text>
            <TextInput
              style={styles.form}
              onChangeText={handleChange('phonenumber')}
              onBlur={handleBlur('phonenumber')}
              placeholder="Enter num"
              value={values.phonenumber}
            />
            <View style={styles.bouton}>
              <Button onPress={handleSubmit} title="Create" />
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}
export default RegisterScreen;
