import * as React from 'react';
import {
  View,
  TextInput,
  Text,
  KeyboardAvoidingView,
  Button,
  ActivityIndicator,
  Image,
  ScrollView,
  StyleSheet,
  Alert
} from 'react-native';
import { login, register } from '../../api';
import profileImage from './images/todos.png';

interface IState {
  email: string;
  password: string;
  loading: boolean;
}

class LoginScreen extends React.Component<{}, IState> {
  state = {
    email: '',
    password: '',
    loading: false
  };

  loaderPromise = (promise: Promise<any>) => {
    this.setState({ loading: true });
    promise.then(() => this.setState({ loading: false })).catch(error => {
      this.setState({ loading: false });
      Alert.alert(error.toString());
    });
  };

  login = () => this.loaderPromise(login(this.state.email, this.state.password));

  register = () => this.loaderPromise(register(this.state.email, this.state.password));

  render() {
    const { email, password, loading } = this.state;
    return (
      <ScrollView style={styles.scroll} overScrollMode="always">
        <KeyboardAvoidingView behavior="padding">
          <View style={styles.topLine} />
          <View style={styles.wrap}>
            <Image source={profileImage} />
            <View style={styles.content}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                onChangeText={text => this.setState({ email: text })}
                value={email}
              />

              <Text style={styles.label}>Password</Text>
              <TextInput
                style={styles.input}
                secureTextEntry
                onChangeText={text => this.setState({ password: text })}
                value={password}
              />

              <View style={styles.buttonWrap}>
                {loading ? (
                  <ActivityIndicator size="large" />
                ) : (
                  <React.Fragment>
                    <Button title="Login" onPress={this.login} color="#6a1b9a" />
                    <View style={styles.registerWrap}>
                      <Text>OR</Text>
                      <Button color="#9c4dcc" title="Register" onPress={this.register} />
                    </View>
                  </React.Fragment>
                )}
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFFFE0'
  },
  topLine: {
    backgroundColor: '#c9bc1f',
    height: 20
  },
  wrap: {
    alignItems: 'center'
  },
  content: {
    padding: 30,
    width: '80%'
  },
  label: {
    marginTop: 10
  },
  input: {
    padding: 10
  },
  buttonWrap: {
    marginTop: 40
  },
  registerWrap: {
    alignItems: 'center',
    margin: 20
  },
  register: {
    color: 'black'
  }
});

export default LoginScreen;
