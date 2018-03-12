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
import TodosScreen from './todos/TodosScreen';
import profileImage from './images/profile.png';
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
    <View style={styles.profile}>
      <Image style={styles.profileImg} source={profileImage} />
      <Text style={styles.profileText}>{getUserEmail()}</Text>
      <Button title="Log out" onPress={logout} />
    </View>
    <DrawerItems {...props} />
  </ScrollView>
);

const styles = StyleSheet.create({
  profile: {
    marginVertical: 25,
    alignItems: 'center'
  },
  profileImg: {
    width: 200,
    height: 200
  },
  profileText: {
    marginBottom: 15,
    fontSize: 20
  },
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
    Todos: {
      screen: TodosScreen
    }
  },
  {
    contentComponent: Header
  }
);

export default Router;
