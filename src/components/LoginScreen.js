import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Button,
  TextInput,
  View,
  Text,
} from 'react-native';
import * as yup from 'yup';
import {Formik} from 'formik';
import AsyncStorage from '@react-native-community/async-storage';
import {UserContainer} from '../containers/index.js';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  form: {
    borderWidth: 1,
    backgroundColor: 'lightgrey',
    marginRight: 10,
    marginLeft: 10,
  },
  text: {
    paddingLeft: 10,
    marginTop: 10,
    marginBottom: 10,
    color : 'black'
  },
  bouton: {
    marginTop: 10,
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
});

function LoginScreen({navigation}) {
  const userContainer = UserContainer.useContainer();
  return (
      <Formik
        initialValues={{token: 'j8komIAl4lU3I3ERwZ17IeK6nxixfpfbcyfZlVTCL0SToXqK7Zg5vHJZAmhp'}}
        onSubmit={values => userContainer.login(values)}
        validationSchema={yup.object().shape({
          token: yup
            .string()
            .min(60)
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
              <Text style={styles.text}>Token</Text>
              <TextInput
                style={styles.form}
                onChangeText={handleChange('token')}
                onBlur={() => setFieldTouched('token')}
                placeholder="Enter token"
                secureTextEntry
                value={values.token}
              />
              {touched.token && errors.token && (
                <Text style={{paddingLeft: 10, fontSize: 10, color: 'red'}}>{errors.token}</Text>
              )}
              <View style={styles.bouton}>
                <Button
                  onPress={handleSubmit}
                  title="Login"
                  disabled={!isValid}
                  color="#0f20d9"
                />
              </View>
              <View style={styles.bouton}>
                <Button
                  title="Not an account yet? create one..."
                  onPress={() => navigation.navigate('Register')}
                  color="#0f20d9"
                />
              </View>
            </View>
          </SafeAreaView>
        )}
      </Formik>
  )
}

export default LoginScreen;
