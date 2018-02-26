import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

const style = { flex: 1, justifyContent: 'center', alignItems: 'center' };

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={style}>
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={style}>
        <Text>Settings!</Text>
      </View>
    );
  }
}

// https://reactnavigation.org/docs/tab-based-navigation.html
export default TabNavigator({
  Home: { screen: HomeScreen },
  Settings: { screen: SettingsScreen }
});
