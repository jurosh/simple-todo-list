import * as React from 'react';
import { Image, Button, StyleSheet, View, ScrollView, Text } from 'react-native';

export default class ListsScreen extends React.Component<{ navigation: any }> {
  render() {
    return (
      <View style={{ paddingHorizontal: 10, paddingVertical: 20 }}>
        <Text>ITEM</Text>
        <Text>ITEM</Text>
        <Text>ITEM</Text>
        <Text>ITEM</Text>
        <Button title="ADD NEW" onPress={() => {}} />
      </View>
    );
  }
}
