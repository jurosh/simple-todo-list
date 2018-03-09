import * as React from 'react';
import {
  Image,
  Button,
  StyleSheet,
  View,
  ScrollView,
  Text
} from 'react-native';
import { DrawerNavigator, DrawerItems } from 'react-navigation';
import { LoginScreen } from './LoginScreen';
import profileImage from '../../images/profile-small.png';

// const profileSrc = '../../images/profile-small.png';

class MyHomeScreen extends React.Component<{ navigation: any }> {
  static navigationOptions = {
    drawerLabel: 'Home',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={profileImage}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.navigate('Notifications')}
        title="Go to notifications"
      />
    );
  }
}

class MyNotificationsScreen extends React.Component<{ navigation: any }> {
  static navigationOptions = {
    drawerLabel: 'Notifications',
    drawerIcon: ({ tintColor }) => (
      <Image
        source={profileImage}
        style={[styles.icon, { tintColor: tintColor }]}
      />
    )
  };

  render() {
    return (
      <Button
        onPress={() => this.props.navigation.goBack()}
        title="Go back home"
      />
    );
  }
}

const Header = props => (
  <ScrollView>
    <Text>Profile</Text>
    <DrawerItems {...props} />
  </ScrollView>
);

const styles = StyleSheet.create({
  icon: {
    width: 150,
    height: 150
  }
});

export const Router = DrawerNavigator(
  {
    Login: {
      screen: LoginScreen
    },
    Home: {
      screen: MyHomeScreen
    },
    Notifications: {
      screen: MyNotificationsScreen
    }
  },
  {
    contentComponent: Header
  }
);
