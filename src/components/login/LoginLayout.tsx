import * as React from 'react';
import {
  View,
  KeyboardAvoidingView,
  StatusBar,
  ScrollView,
  StyleSheet
} from 'react-native';

const LoginLayout = ({ children }) => (
  <ScrollView
    style={styles.scroll}
    overScrollMode="always"
    keyboardShouldPersistTaps="always"
  >
    <KeyboardAvoidingView behavior="padding">
      <View style={styles.topLine} />
      <View style={styles.wrap}>{children}</View>
    </KeyboardAvoidingView>
  </ScrollView>
);

const styles = StyleSheet.create({
  scroll: {
    backgroundColor: '#FFFFE0'
  },
  topLine: {
    backgroundColor: '#c9bc1f',
    height: StatusBar.currentHeight
  },
  wrap: {
    alignItems: 'center'
  }
});

export default LoginLayout;
