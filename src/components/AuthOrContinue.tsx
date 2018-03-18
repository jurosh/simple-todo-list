import * as React from 'react';
import LoginScreen from './login/LoginScreen';
import Router from './Router';
import { initializeAndWaitForAuth } from '../api';

export default class LoginOrContinue extends React.Component {
  state = {
    initialized: false,
    logged: false
  };

  onLogin = () => {
    this.setState({ logged: true });
  };

  onLogout = () => {
    this.setState({ logged: false });
  };

  onReady = () => {
    this.setState({ initialized: true });
  };

  componentDidMount() {
    initializeAndWaitForAuth(this.onLogin, this.onLogout, this.onReady);
  }

  render() {
    if (!this.state.initialized) {
      return null;
    }
    return this.state.logged ? <Router /> : <LoginScreen />;
  }
}
