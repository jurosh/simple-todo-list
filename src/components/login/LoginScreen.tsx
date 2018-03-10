import * as React from 'react';
import {
  View,
  TextInput,
  Text,
  Button,
  Image,
  ScrollView,
  StyleSheet
} from 'react-native';
import profileImage from './images/todos.png';

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
      <ScrollView
        style={styles.scroll}
        overScrollMode="always"
        keyboardDismissMode="on-drag"
      >
        <View style={styles.wrap}>
          <Image source={profileImage} />
          <View style={styles.content}>
            <Text style={styles.label}>Username</Text>
            <TextInput
              style={styles.input}
              onChangeText={text => this.setState({ name: text })}
              value={name}
            />

            <Text style={styles.label}>Password</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
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
  }
});
