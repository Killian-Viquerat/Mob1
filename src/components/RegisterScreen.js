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
import * as yup from 'yup';
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

function RegisterScreen({navigation}) {
  return (
    <Formik
      initialValues={{firstname: '', lastname: '', phonenumber: ''}}
      onSubmit={values =>
        axios
          .post('/api/user/apply', values)
          .then(res => {
            console.log(res);
            navigation.navigate('Login');
          })
          .catch(error => console.log(error), console.log(values))
      }
      validationSchema={yup.object().shape({
        firstname: yup
          .string()
          .required()
          .min(3),
        lastname: yup
          .string()
          .required()
          .min(3),
        phonenumber: yup
          .string()
          .min(9)
          .required(),
      })}>
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        setFieldTouched,
        errors,
        touched,
        isValid,
      }) => (
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.text}>Prénom</Text>
            <TextInput
              style={styles.form}
              onChangeText={handleChange('firstname')}
              onBlur={() => setFieldTouched('firstname')}
              placeholder="Enter prénom"
              value={values.firstname}
            />
            {touched.firstname && errors.firstname && (
              <Text style={{paddingLeft: 10, fontSize: 10, color: 'red'}}>{errors.firstname}</Text>
            )}
            <Text style={styles.text}>Nom</Text>
            <TextInput
              style={styles.form}
              onChangeText={handleChange('lastname')}
              onBlur={() => setFieldTouched('lastname')}
              placeholder="Enter nom"
              value={values.lastname}
            />
            {touched.lastname && errors.lastname && (
              <Text style={{paddingLeft: 10, fontSize: 10, color: 'red'}}>{errors.lastname}</Text>
            )}
            <Text style={styles.text}>Numéro de téléphone</Text>
            <TextInput
              style={styles.form}
              onChangeText={handleChange('phonenumber')}
              onBlur={() => setFieldTouched('phonenumber')}
              placeholder="Enter num"
              value={values.phonenumber}
            />
            {touched.phonenumber && errors.phonenumber && (
              <Text style={{paddingLeft: 10, fontSize: 10, color: 'red'}}>{errors.phonenumber}</Text>
            )}
            <View style={styles.bouton}>
              <Button
                onPress={handleSubmit}
                title="Create"
                disabled={!isValid}
                color="#0f20d9"
              />
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}
export default RegisterScreen;
