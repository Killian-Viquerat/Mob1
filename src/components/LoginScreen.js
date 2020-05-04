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

function LoginScreen() {
  return (
    <Formik
      initialValues={{name: '', email: '', password: ''}}
      onSubmit={values => console.log(values)}>
      {({handleChange, handleBlur, handleSubmit, values}) => (
        <SafeAreaView style={styles.container}>
          <View>
            <Text style={styles.text}>Name</Text>
            <TextInput
              style={styles.form}
              onChangeText={handleChange('name')}
              onBlur={handleBlur('name')}
              placeholder="Enter name"
              value={values.name}
            />
            <Text style={styles.text}>Email</Text>
            <TextInput
              style={styles.form}
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              placeholder="Enter email"
              value={values.email}
            />
            <Text style={styles.text}>Password</Text>
            <TextInput
              style={styles.form}
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              placeholder="Enter password"
              secureTextEntry
              value={values.password}
            />
            <View style={styles.bouton}>
              <Button onPress={handleSubmit} title="Submit" />
            </View>
          </View>
        </SafeAreaView>
      )}
    </Formik>
  );
}

export default LoginScreen;
