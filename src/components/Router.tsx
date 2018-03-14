import * as React from 'react';
import { Image, Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import {
  DrawerNavigator,
  DrawerItems,
  addNavigationHelpers,
  NavigationInjectedProps
} from 'react-navigation';
import ListsScreen from './lists/ListsScreen';
import TodosScreen from './todos/TodosScreen';
import AboutScreen from './about/AboutScreen';
import profileImage from './images/profile.png';
import hamburgerImage from './images/hamburger.png';
import { logout, getUserEmail } from '../api';
import ContactsPickerScreen from './contacts/ContactsPickerScreen';

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
    },
    About: {
      screen: AboutScreen
    },
    ContactsPicker: {
      screen: ContactsPickerScreen
    }
  },
  {
    contentComponent: Header
  }
);

export default Router;
