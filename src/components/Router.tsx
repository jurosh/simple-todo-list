import * as React from 'react';
import { Image, Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import {
  DrawerNavigator,
  DrawerItems,
  addNavigationHelpers,
  NavigationInjectedProps
} from 'react-navigation';
import LoginScreen from './login/LoginScreen';
import ListsScreen from './lists/ListsScreen';
import ListScreen from './list/ListScreen';
import profileImage from './images/profile-small.png';
import { logout, getUserEmail } from '../api';

class MyNotificationsScreen extends React.Component<{ navigation: any }> {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image source={profileImage} style={[styles.icon, { tintColor: tintColor }]} />
    )
  };

  render() {
    return <Button onPress={() => this.props.navigation.goBack()} title="Go back home" />;
  }
}

const Header = props => (
  <ScrollView>
    <Text style={{ marginTop: 25 }}>Profile {getUserEmail()}</Text>
    <DrawerItems {...props} />
    <Button title="Log out" onPress={logout} />
  </ScrollView>
);

const styles = StyleSheet.create({
  icon: {
    width: 150,
    height: 150
  }
});

const Router = DrawerNavigator(
  {
    Lists: {
      screen: ListsScreen
    },
    List: {
      screen: ListScreen
    }
  },
  {
    contentComponent: Header
  }
);

export default Router;
