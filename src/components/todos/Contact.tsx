import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Contact = ({ name }) => (
  <View style={styles.contact}>
    <MaterialIcons name="person" size={40} />
    <Text style={styles.name}>{name}</Text>
  </View>
);

const styles = StyleSheet.create({
  contact: {
    display: 'flex',
    flexDirection: 'row'
  },
  name: {
    marginTop: 7,
    marginLeft: 10,
    fontSize: 20
  }
});

export default Contact;
