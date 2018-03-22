import * as React from 'react';
import { Text, Button, ActivityIndicator, View, StyleSheet } from 'react-native';
import LoginLayout from './LoginLayout';
import { sendVerificationEmail, logout, refreshRegisteredUser } from '../../api';

interface IState {
  resended: boolean;
  checking: boolean;
  sending: boolean;
}

class NonVerifiedUser extends React.Component<{}, IState> {
  state: IState = {
    resended: false,
    checking: false,
    sending: false
  };

  checkAgain = () => {
    this.setState({ checking: true });
    refreshRegisteredUser().then(() => {
      this.setState({ checking: false });
    });
  };

  resendEmail = () => {
    this.setState({ sending: true });
    sendVerificationEmail()
      .then(() => this.setState({ resended: true, sending: false }))
      .catch(() => this.setState({ sending: false }));
  };

  render() {
    const { checking, sending, resended } = this.state;
    return (
      <LoginLayout>
        <Text style={styles.firstLine}>User is not verified yet.</Text>
        <Text>Please check you email inbox for instructions.</Text>
        <View style={styles.check}>
          {checking ? (
            <ActivityIndicator size="large" color="#9c4dcc" />
          ) : (
            <React.Fragment>
              <Button title="Check Again" onPress={this.checkAgain} color="#6a1b9a" />
              <Button title="Logout" onPress={logout} color="gray" />
            </React.Fragment>
          )}
        </View>
        {!resended && (
          <React.Fragment>
            <Text style={styles.or}>OR</Text>
            {sending ? (
              <ActivityIndicator size="large" color="#9c4dcc" />
            ) : (
              <Button
                title="Resend verification email"
                onPress={this.resendEmail}
                color="#9c4dcc"
              />
            )}
          </React.Fragment>
        )}
      </LoginLayout>
    );
  }
}

const styles = StyleSheet.create({
  firstLine: {
    marginTop: 40,
    marginBottom: 10,
    fontWeight: 'bold'
  },
  check: {
    marginTop: 30,
    marginBottom: 20,
    textAlign: 'center',
    display: 'flex',
    flexDirection: 'row'
  },
  or: {
    margin: 10
  }
});

export default NonVerifiedUser;
