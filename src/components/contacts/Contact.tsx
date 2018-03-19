import * as React from 'react';
import { StyleSheet, View, TouchableNativeFeedback, Text } from 'react-native';

const Contact = ({ name, onSelect }) => (
  <TouchableNativeFeedback
    background={TouchableNativeFeedback.Ripple('gray')}
    onPress={() => onSelect(name)}
  >
    <View style={styles.contact}>
      <Text>{name}</Text>
    </View>
  </TouchableNativeFeedback>
);

const styles = StyleSheet.create({
  contact: {
    marginBottom: 1,
    backgroundColor: 'white',
    borderRadius: 1,
    paddingHorizontal: 10,
    paddingVertical: 20,
    display: 'flex',
    flexDirection: 'row'
  }
});

export default Contact;
