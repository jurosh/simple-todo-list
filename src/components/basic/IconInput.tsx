import React from 'react';
import { MaterialIcons, Entypo } from '@expo/vector-icons';
import { View, TextInput, StyleSheet } from 'react-native';

interface IProps {
  text: string;
  iconType: 'material' | 'entypo';
  icon: string;
  onChange: (text: string) => void;
}

// TODO: internal text performance
const IconInput = ({ text, iconType, icon, onChange }: IProps) => (
  <View style={styles.wrap}>
    {iconType === 'entypo' ? (
      <Entypo style={styles.icon} size={30} name={icon} />
    ) : (
      <MaterialIcons style={styles.icon} size={30} name={icon} />
    )}

    <TextInput style={styles.search} value={text} onChangeText={onChange} />
  </View>
);

const styles = StyleSheet.create({
  wrap: {
    position: 'relative',
    marginVertical: 10
  },
  icon: {
    top: 5,
    position: 'absolute'
  },
  search: {
    fontSize: 22,
    paddingLeft: 35,
    padding: 10
  }
});

export default IconInput;
