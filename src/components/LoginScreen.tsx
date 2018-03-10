import * as React from 'react';
import { View, TextInput, Text, Button, Image, StyleSheet } from 'react-native';
import profileImage from '../../images/todos.png';

export class LoginScreen extends React.Component<{}, { name: string; password: string }> {
  static navigationOptions = {
    drawerLabel: 'Login'
  };

  state = {
    name: '',
    password: ''
  };

  render() {
    const { name, password } = this.state;
    return (
      <View style={styles.wrap}>
        <Image source={profileImage} />
        <View style={styles.content}>
          <Text>Username</Text>
          <TextInput onChangeText={text => this.setState({ name: text })} value={name} />

          <Text>Password</Text>
          <TextInput
            onChangeText={text => this.setState({ password: text })}
            value={password}
          />

          <View style={styles.buttonWrap}>
            <Button
              title="Login"
              onPress={() => {
                console.log(this.state);
              }}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  wrap: {
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#FFFFE0',
    height: '100%'
  },
  content: {
    padding: 30,
    width: '80%'
  },
  buttonWrap: {
    marginTop: 40
  }
});
