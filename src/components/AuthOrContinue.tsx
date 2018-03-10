import * as React from 'react';
import { Image, Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import { DrawerNavigator, DrawerItems, addNavigationHelpers } from 'react-navigation';
import LoginScreen from './login/LoginScreen';
import Router from './Router';
import profileImage from './images/profile-small.png';
import { initializeAndWaitForAuth } from '../api';

export default class LoginOrContinue extends React.Component {
  state = {
    logged: false
  };

  onLogin = () => {
    this.setState({ logged: true });
  };

  onLogout = () => {
    this.setState({ logged: false });
  };

  componentDidMount() {
    initializeAndWaitForAuth(this.onLogin, this.onLogout);
  }
  render() {
    return this.state.logged ? <Router /> : <LoginScreen />;
  }
}
