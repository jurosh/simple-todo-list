import * as React from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
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
}

class LoginScreen extends React.Component<{}, IState> {
  state = {
    email: '',
    password: ''
  };

  login = () => {
    const { email, password } = this.state;
    login(email, password).catch(error => {
      Alert.alert(error.toString());
    });
  };

  register = () => {
    const { email, password } = this.state;
    register(email, password)
      .then(() => {
        console.log('[LoginScreen] Success - user registration');
      })
      .catch(error => {
        Alert.alert(error.toString());
      });
  };

  render() {
    const { email, password } = this.state;
    return (
      <ScrollView
        style={styles.scroll}
        overScrollMode="always"
        keyboardDismissMode="on-drag"
      >
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
              <Button title="Login" onPress={this.login} />
              <View style={styles.registerWrap}>
                <Text>OR</Text>
                <Button color="#82B1FF" title="Register" onPress={this.register} />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  scroll: {
    marginTop: 20,
    backgroundColor: '#FFFFE0'
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
    marginTop: 40,
    marginBottom: 200
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
