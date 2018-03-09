import React from 'react';
import { Text, View } from 'react-native';
import { TabNavigator, TabBarTop } from 'react-navigation';

class HomeScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'yellow'
        }}
      >
        <Text>Home!</Text>
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'red'
        }}
      >
        <Text>Settings!</Text>
      </View>
    );
  }
}

// https://reactnavigation.org/docs/tab-based-navigation.html
export default TabNavigator(
  {
    Home: { screen: HomeScreen, path: 'test' },
    Settings: { screen: SettingsScreen }
  },
  {
    tabBarOptions: {
      activeTintColor: 'tomato',
      inactiveTintColor: 'gray'
    },
    tabBarComponent: TabBarTop,
    tabBarPosition: 'top',
    animationEnabled: false,
    swipeEnabled: true
  }
);
