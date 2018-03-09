import * as React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import TabNavigator from './TabNavigator';

export default class App extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        <TabNavigator />
        <Text style={styles.welcome}>TODOs!</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  }
});
