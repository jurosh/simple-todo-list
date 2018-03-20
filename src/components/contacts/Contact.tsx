import * as React from 'react';
import { StyleSheet, View, Text } from 'react-native';
import TouchableFeedback from '../basic/TouchableFeedback';

const Contact = ({ name, onSelect }) => (
  <TouchableFeedback backgroundRippleColor="gray" onPress={() => onSelect(name)}>
    <View style={styles.contact}>
      <Text>{name}</Text>
    </View>
  </TouchableFeedback>
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
